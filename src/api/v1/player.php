<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers:Content-type,Sage');
header('Access-Control-Allow-Methods:POST,GET,OPTIONS');
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    die();
}
require_once "/home2/xikihgmy/includes/bucket.php";
require_once __DIR__ . "/auth.php";
$headers = apache_request_headers();
$dropError = <<<HTML
        <html>
            <div style="display:flex; flex-direction: column; padding-horizontal:auto; align-items:center;">
                <div class="tenor-gif-embed" data-postid="9628120" data-share-method="host" data-aspect-ratio="1.55" data-width="25%"><a href="https://tenor.com/view/jurassic-park-ah-you-didnt-say-the-magic-word-say-please-gif-9628120">Jurassic Park Ah GIF</a>from <a href="https://tenor.com/search/jurassic+park-gifs">Jurassic Park GIFs</a></div> <script type="text/javascript" async src="https://tenor.com/embed.js"></script>
                <h1>Oops! Looks like you F****d that right up!</h1>
                <h2>Your request header was missing some stuff!</h2>
            </div>
        </html>
    HTML;
$sageHead = $headers["Sage"];
if (!isset($sageHead)) {
    http_response_code(401);
    echo "sage is not present";
    exit(1);
}
if (!Bucket::sageDance($sageHead)) {
    http_response_code(401);
    echo "sage is incorrect";
    exit(1);
}

// connect to the DB dbConn($user, $db)
$conn = Bucket::dbConn("web","kothis");

// TODO(jacob): require_auth0_token() currently enforces (401s on a bad/missing
// token) — flip it back to log-only in auth.php if you want to soft-launch
// this first. $claims is the caller's verified identity; every case below
// should check it (require_permission(...) for "can this token holder do X
// at all", plus an explicit match against $claims['email']/['sub'] for "is
// this THEIR row" — Auth0 permissions alone don't know about your player
// table) instead of trusting whatever username/email the client sent — that's
// the IDOR the plan doc flags: today ANY caller can read/write ANY player row.
$claims = require_auth0_token();

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch($method) {
    case 'GET':
        // Self-only, no exception: the target is always the caller's own
        // verified identity. Client-supplied username/email query params
        // are ignored entirely — there's no code path left that can look up
        // (or list) anyone else's record.
        $callerEmail = $claims['email'] ?? null;
        $stmt = $conn->prepare("SELECT * FROM player WHERE email = ?");
        $stmt->bind_param('s', $callerEmail);
        try {
            $stmt->execute();
            $stmt->bind_result($uname,$fname,$lname,$email,$role,$prefs,$is_verified);
        } catch (mysqli_sql_exception $e) {
            http_response_code(500);
            echo json_encode([
                "result"=>"failure",
                "message"=>"A SQL error occurred: ".$e,
            ]);
        }
        while ($stmt->fetch()) {
            $outArr[] = [
                'username' => $uname, 
                'first_name' => $fname, 
                'last_name' => $lname, 
                'email' => $email, 
                'role' => $role, 
                'preferences' => $prefs
            ];
        }
        if(isset($outArr)){
            http_response_code(200);
            echo json_encode([
                "result"=>"success",
                "message" => $outArr,
            ]);
        } else {
            http_response_code(200);
            echo json_encode([
                "result"=>"success",
                "message"=>"no player record matching the authenticated user (".$callerEmail.") was found",
            ]);
        }
        break;
    
    case 'POST':
        // POST info like updates and creations (requiring navigation and feedback)

        /* Grab resource selection */
        $username = $input['username'] ?? '';
        $first_name = $input['fname'] ?? '';
        $last_name = $input['lname'] ?? '';
        $email = $input['email'] ?? '';

        /* check for username & pull user if found.*/
        if(!isset($username)) {
            http_response_code(400);
            echo json_encode([
                "result"=>"failure",
                "message"=>"username is required"
            ]);
            exit(1);
        } elseif (isset($email)){
            /* query for input username */
            $query = $conn->prepare("SELECT first_name,last_name 
                                    FROM player 
                                    WHERE username = ? OR email = ?");
            $query->bind_param('ss', $username, $email);
            try {
                $query->execute();
                $query->bind_result($resp_fname,$resp_lname);
                $result = $query->fetch();
            } catch (mysqli_sql_exception $e) {
                http_response_code(400);
                echo json_encode([
                    "result"=>"failure",
                    "message"=>"a SQL error occurred",
                    "error"=>var_dump($e)
                ]);
            } finally {
                /* if successful, return user */
                if($result){
                    http_response_code(200);
                    echo json_encode([
                        "result"=>"found",
                        "message"=>"username found",
                        "user"=>$resp_fname.';'.$resp_lname
                    ]);
                    exit(0);
                } // else no email or username match
            }
        }
        if(!isset($first_name)) {
            http_response_code(400);
            echo json_encode([
                "result"=>"failure",
                "message"=>"first name is required"
            ]);
            exit(1);
        }elseif(!isset($last_name)) {
            http_response_code(400);
            echo json_encode([
                "result"=>"failure",
                "message"=>"last name is required"
            ]);
            exit(1);
        }
        $submitted = false;
        try {
            $stmt = $conn->prepare("INSERT INTO player
                                    (username,first_name,last_name,email)
                                    VALUES(?,?,?,?)");
            $stmt->bind_param('ssss',$username,$first_name,$last_name,$email);
            $submitted = $stmt->execute();
        } catch (mysqli_sql_exception $e) {
            http_response_code(400);
            echo json_encode([
                "result"=>"failure",
                "message"=>"a SQL error occurred",
                "error"=>$e
            ]);
        } finally {
            $query = $conn->prepare("SELECT first_name,last_name 
                                    FROM player 
                                    WHERE username = ? OR email = ?");
            $query->bind_param('ss', $username, $email);
            $query->execute();
            $query->bind_result($resp_fname,$resp_lname);
            $result = $query->fetch();
        }
            /* if successful, return user */
            if($result && $submitted){
                http_response_code(200);
                echo json_encode([
                    "result"=>"added",
                    "message"=>"user successfully added.",
                    "user"=>$resp_fname.';'.$resp_lname
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "result"=>"failure", 
                    "message"=>"Something went wrong and a result wasn\'t found",
                    "error"=>"Submitted: ".$submitted."Result: ".$result 
                ]);
            }
        break;     

    case 'PUT':
        // PUT info like email drop or info storage that doesn't require feedback
        break;

    case 'PATCH':
        $first_name = $input['fname'] ?? '';
        $last_name = $input['lname'] ?? '';
        $email = $input['email'] ?? '';
        $image = $_FILES['profile_image'] ?? '';

        // Self-only, no exception: the row being edited is always resolved
        // from the caller's own verified identity — the client no longer
        // supplies (or can override) which username gets updated.
        $callerEmail = $claims['email'] ?? null;
        $ownUsernameStmt = $conn->prepare("SELECT username FROM player WHERE email = ?");
        $ownUsernameStmt->bind_param('s', $callerEmail);
        $ownUsernameStmt->execute();
        $ownUsernameStmt->bind_result($username);
        if (!$ownUsernameStmt->fetch()) {
            http_response_code(404);
            echo json_encode([
                "result"=>"failure",
                "message"=>"no player record matching the authenticated user was found"
            ]);
            exit(1);
        }

        if (isset($first_name)){
            $query = $conn->prepare("UPDATE player 
                                    SET first_name = ? 
                                    WHERE username = ?");
            $query->bind_param('ss', $first_name, $username);
            $query->execute();
        }

        if (isset($last_name)){
            $query = $conn->prepare("UPDATE player 
                                    SET last_name = ? 
                                    WHERE username = ?");
            $query->bind_param('ss', $last_name, $username);
            $query->execute();
        }

        if (isset($email)){
            $search = $conn->prepare("SELECT email 
                                    FROM player 
                                    WHERE email = ?");
            $search->bind_param('s', $email);
            $search->execute();
            $search->bind_result($resp_email);
            $result = $search->fetch();

            if ($result && $resp_email == $email) {
                http_response_code(400);
                echo json_encode([
                    "result"=>"failure",
                    "message"=>"email is already in use, try another one."
                ]);
                exit(1);
            } else {
                $query = $conn->prepare("UPDATE player 
                                        SET email = ? 
                                        WHERE username = ?");
                $query->bind_param('ss', $email, $username);
                $query->execute();
            }
        }

        if (isset($image)){
            // Here I need to place the image into the directory and return the path
            // Then update Prefs with the new path ref.

            $imageName = $image['name'];
            $imageTmpName = $image['tmp_name'];
            $imageSize = $image['size'];
            $imageError = $image['error'];
            // default dir ~/web_images/intake/
        }
        break;
        
    case 'DELETE':
        // DELETE info like DROP and removal requests
        break;

    default:
        // Throw an error probably
        http_response_code(400);
        echo json_encode([
            "result"=>"error",
            "message" =>"method or request was invalid, please check documentation and try again or contact the webmaster."
        ]);
}
?>