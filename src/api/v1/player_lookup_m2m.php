<?php
// Server-to-server ONLY — never called from the SPA/browser, and CORS is
// deliberately not opened up for it. Used by the Auth0 Post-Login Action to
// read the DB's player row so it can attach current profile/role data onto
// the access token as custom claims. Gated on the Sage secret alone, since a
// Post-Login Action runs before any user access token exists — that's fine
// here because Sage lives in Auth0's Action secrets vault, never shipped to
// a browser (unlike the old design this replaced). Do NOT loosen this to
// accept requests from the frontend, and do NOT add this same Sage-only
// bypass to player.php's user-facing endpoint — that one is deliberately
// locked to "only your own row, only with a verified user token."
require_once "/home2/xikihgmy/includes/bucket.php";

$headers = apache_request_headers();
$sageHead = $headers['Sage'] ?? null;
if (!isset($sageHead) || !Bucket::sageDance($sageHead)) {
    http_response_code(401);
    echo json_encode(["result" => "failure", "message" => "invalid or missing Sage header"]);
    exit(1);
}

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(["result" => "failure", "message" => "method not allowed"]);
    exit(1);
}

// `sub` (Auth0's user_id) is the durable identity key — unlike email, it
// can't change out from under the link. `email` is optional and only used
// as a one-time fallback for rows that predate auth0_sub being populated
// (or a token whose sub was never linked yet); when that fallback finds a
// row, it backfills auth0_sub so every login after this one uses sub alone.
$sub = $_GET['sub'] ?? null;
$email = $_GET['email'] ?? null;
if (!$sub) {
    http_response_code(400);
    echo json_encode(["result" => "failure", "message" => "sub is required"]);
    exit(1);
}

$conn = Bucket::dbConn("web", "kothis");
header("Content-Type: application/json");

function fetch_player_row(mysqli $conn, string $column, string $value): ?array
{
    $stmt = $conn->prepare("SELECT username, first_name, last_name, email, role, preferences FROM player WHERE {$column} = ?");
    $stmt->bind_param('s', $value);
    $stmt->execute();
    $stmt->bind_result($username, $first_name, $last_name, $respEmail, $role, $preferences);
    $found = $stmt->fetch();
    $stmt->close(); // must close before $conn is reused for another prepare()

    if (!$found) {
        return null;
    }
    return [
        "username" => $username,
        "first_name" => $first_name,
        "last_name" => $last_name,
        "email" => $respEmail,
        "role" => $role,
        "preferences" => $preferences,
    ];
}

$player = fetch_player_row($conn, 'auth0_sub', $sub);

if ($player === null && $email) {
    $player = fetch_player_row($conn, 'email', $email);
    if ($player !== null) {
        $backfill = $conn->prepare("UPDATE player SET auth0_sub = ? WHERE username = ?");
        $backfill->bind_param('ss', $sub, $player['username']);
        $backfill->execute();
        $backfill->close();
    }
}

if ($player !== null) {
    http_response_code(200);
    echo json_encode(["result" => "success", "message" => $player]);
} else {
    http_response_code(404);
    echo json_encode(["result" => "failure", "message" => "no player found for that sub/email"]);
}
