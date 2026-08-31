<?php
// Server-to-server ONLY — used by the Auth0 PreUserRegistration Action
// (capture_signup) during account creation. Gated on Sage alone: this runs
// *before* the Auth0 account being created even exists, so there is no
// possible user token to present here, ever — this is the one case where
// Sage-only is the only workable design, not a shortcut. Never called from
// the SPA/browser, and never accepts a caller-supplied `role` other than
// the hardcoded default below.
require_once "/home2/xikihgmy/includes/bucket.php";

$headers = apache_request_headers();
$sageHead = $headers['Sage'] ?? null;
if (!isset($sageHead) || !Bucket::sageDance($sageHead)) {
    http_response_code(401);
    echo json_encode(["result" => "failure", "message" => "invalid or missing Sage header"]);
    exit(1);
}

$conn = Bucket::dbConn("web", "kothis");
header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        // Availability check for the signup form — "is this username/email
        // already taken?" Pass exactly one of username/email.
        $username = $_GET['username'] ?? null;
        $email = $_GET['email'] ?? null;
        if (!$username && !$email) {
            http_response_code(400);
            echo json_encode(["result" => "failure", "message" => "username or email is required"]);
            exit(1);
        }

        if ($username) {
            $stmt = $conn->prepare("SELECT username FROM player WHERE username = ?");
            $stmt->bind_param('s', $username);
        } else {
            $stmt = $conn->prepare("SELECT username FROM player WHERE email = ?");
            $stmt->bind_param('s', $email);
        }
        $stmt->execute();
        $stmt->store_result();

        http_response_code(200);
        echo json_encode(["result" => "success", "taken" => $stmt->num_rows > 0]);
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        $username = $input['username'] ?? '';
        $first_name = $input['fname'] ?? '';
        $last_name = $input['lname'] ?? '';
        $email = $input['email'] ?? '';
        $role = 'player'; // always — registration can never self-assign a role

        if (!$username || !$first_name || !$last_name || !$email) {
            http_response_code(400);
            echo json_encode(["result" => "failure", "message" => "username, fname, lname, and email are all required"]);
            exit(1);
        }

        $stmt = $conn->prepare("INSERT INTO player (username, first_name, last_name, email, role) VALUES (?, ?, ?, ?, ?)");
        $stmt->bind_param('sssss', $username, $first_name, $last_name, $email, $role);
        try {
            $stmt->execute();
            http_response_code(200);
            echo json_encode(["result" => "success", "message" => "player created"]);
        } catch (mysqli_sql_exception $e) {
            http_response_code(500);
            echo json_encode(["result" => "failure", "message" => "a SQL error occurred creating the player"]);
        }
        break;

    default:
        http_response_code(405);
        echo json_encode(["result" => "failure", "message" => "method not allowed"]);
}
