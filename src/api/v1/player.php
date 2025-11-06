<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers:Content-type,Sage');
header('Access-Control-Allow-Methods:POST,OPTIONS');
if($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("HTTP/1.1 200 OK");
    die();
}
require_once "/home2/xikihgmy/includes/bucket.php";
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

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch($method) {
    case 'GET':
        // GET info like SELECT statements or queries go here

        break;
    
    case 'POST':
        // POST info like updates and creations (requiring navigation and feedback)

        /* Grab resource selection */
        $username = $input['username'];
        $first_name = $input['fname'];
        $last_name = $input['lname'];
        $email = $input['email'];
        $role = $input['role'];

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
        }elseif(!isset($role)) {
            http_response_code(400);
            echo json_encode([
                "result"=>"failure",
                "message"=>"role is required"
            ]);
            exit(1);
        }
            try {
                $stmt = $conn->prepare("INSERT INTO player
                                        (username,first_name,last_name,email,role)
                                        VALUES(?,?,?,?,?)");
                $stmt->bind_param('sssss',$username,$first_name,$last_name,$email,$role);
                $stmt->execute();
                $query = $conn->prepare("SELECT first_name,last_name 
                                        FROM player 
                                        WHERE username = ? OR email = ?");
                $query->bind_param('ss', $username, $email);
                $query->execute();
                $query->bind_result($resp_fname,$resp_lname);
                $result = $query->fetch();
            } catch (mysqli_sql_exception $e) {
                http_response_code(400);
                echo json_encode([
                    "result"=>"failure",
                    "message"=>"a SQL error occurred",
                    "error"=>$e
                ]);
            }
            /* if successful, return user */
            if($result){
                http_response_code(200);
                echo json_encode([
                    "result"=>"found",
                    "message"=>"username found",
                    "user"=>$resp_fname.';'.$resp_lname
                ]);
            } else {
                http_response_code(404);
                echo json_encode([
                    "result"=>"failure", 
                    "message"=>"Something went wrong and a result wasn\'t found"
                ]);
            }
        break;     

    case 'PUT':
        // PUT info like email drop or info storage that doesn't require feedback
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