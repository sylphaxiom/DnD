<?php

require_once "/home2/xikihgmy/includes/bucket.php";
require_once __DIR__ . "/vendor/autoload.php";

use Auth0\SDK\Auth0;
use Auth0\SDK\Configuration\SdkConfiguration;
use Auth0\SDK\Token;
use Auth0\SDK\Exception\InvalidTokenException;

const AUTH0_DOMAIN = "auth.kothis.sylphaxiom.com"; // must match VITE_AUTH0_DOMAIN
const AUTH0_API_AUDIENCE = "https://kothis.sylphaxiom.com/api/v1/"; // must match entry.client.tsx's Auth0Provider audience
const AUTH0_CLAIM_NAMESPACE = "https://kothis.sylphaxiom.com"; // must match the namespace used in the Post-Login Action's setCustomClaim() calls

/**
 * Access tokens don't carry plain profile claims like `email` by default —
 * only custom (namespaced) claims an Action explicitly adds. This reads the
 * `email` claim the Post-Login Action attaches (sourced from the `player`
 * DB table, not from Auth0's own copy of the user's email — the DB is the
 * source of truth here).
 */
function claim_email(array $claims): ?string
{
    return $claims[AUTH0_CLAIM_NAMESPACE . '/email'] ?? null;
}

/**
 * `sub` is a standard OIDC claim present on every access token automatically
 * — no Action/custom-claim setup needed, unlike claim_email() above. It's
 * also durable: unlike email, a user can't change it. Use this (matched
 * against a player.auth0_sub column) for identity linking instead of email
 * wherever possible — email should only be used for display/uniqueness
 * checks, not as the join key back to a player row.
 */
function claim_sub(array $claims): ?string
{
    return $claims['sub'] ?? null;
}

$auth0 = new Auth0([
    'strategy' => SdkConfiguration::STRATEGY_API,
    'domain' => AUTH0_DOMAIN,
    'audience' => [AUTH0_API_AUDIENCE],
]);

/**
 * Verifies the Authorization: Bearer <token> header using Auth0's own PHP
 * SDK (auth0/auth0-php) — no hand-rolled crypto, no manual JWKS handling;
 * the SDK fetches/caches Auth0's signing keys and checks signature, exp,
 * iss, and aud itself. Returns the decoded claims array on success, or null
 * on any failure.
 */
function verify_auth0_token(): ?array
{
    global $auth0;

    $headers = apache_request_headers();
    $authHeader = $headers['Authorization'] ?? null;
    if ($authHeader === null || !str_starts_with($authHeader, 'Bearer ')) {
        return null;
    }
    $jwt = substr($authHeader, 7);

    try {
        $token = $auth0->decode(
            $jwt, null, null, null, null, null, null,
            Token::TYPE_TOKEN, // this is an API access token, not an ID token
        );
        return $token->toArray();
    } catch (InvalidTokenException $exception) {
        error_log("verify_auth0_token: " . $exception->getMessage());
        return null;
    }
}

/**
 * Verifies the token, or exits with 401 on failure. Call at the top of any
 * endpoint that needs a real, verified end-user identity.
 *
 * TODO(jacob): per the rollout plan, start this in LOG-ONLY mode — comment
 * out the http_response_code/exit below and just fall through with empty
 * claims — until you've watched it run clean against real traffic. Then
 * uncomment to actually start enforcing.
 */
function require_auth0_token(): array
{
    $claims = verify_auth0_token();
    if ($claims === null) {
        http_response_code(401);
        echo json_encode(["result" => "failure", "message" => "invalid or missing token"]);
        exit(1);
    }
    return $claims;
}

/**
 * Checks the verified token's `permissions` claim against $requiredPermission.
 * This claim only appears once RBAC + "Add Permissions in the Access Token"
 * are enabled on this API in the Auth0 Dashboard, and permissions are
 * assigned to roles/users there — no DB lookup here, Auth0 is the source of
 * truth for "what can this token holder do" now.
 *
 * TODO(jacob), Auth0 Dashboard setup required before this does anything
 * useful:
 *   1. API settings → enable "RBAC" and "Add Permissions in the Access Token".
 *   2. Define permissions matching your player/dm/homebrewer/admin tiers —
 *      e.g. read:own-player, read:any-player, write:own-player,
 *      write:any-player, manage:homebrew, approve:homebrew, admin:all —
 *      whatever granularity you actually want; SecureForms.tsx's four tiers
 *      are a reasonable starting shape but you don't have to mirror them 1:1.
 *   3. Create Roles bundling those permissions, assign Roles to Users.
 *
 * NOTE: this answers "is this token holder generally allowed to do X" — it
 * does NOT answer "is this specific request touching their own data".
 * Auth0 has no concept of your `player` table, so an ownership check (does
 * the target username/email match the caller's own verified identity)
 * still has to happen in the endpoint itself for anything scoped to "your
 * own" vs "any" — see the TODOs in player.php.
 */
function require_permission(string $requiredPermission, array $claims): void
{
    $permissions = $claims['permissions'] ?? [];
    if (!in_array($requiredPermission, $permissions, true)) {
        http_response_code(403);
        echo json_encode([
            "result" => "failure",
            "message" => "missing required permission: {$requiredPermission}",
        ]);
        exit(1);
    }
}
