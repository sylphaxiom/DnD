<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers:Content-type,Sage');
header('Access-Control-Allow-Methods:PUT,OPTIONS');
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

// connect to the DB
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
        break;     

    case 'PUT':
        /* Set vars from input stream */
        $errCode = $input['errCode'];
        $errDesc = $input['errDesc'];
        $errTrack = $input['errTrack'];
        $errConn = $input['errConn'];
        $errLang = $input['errLang'];
        $errClient = $input['errClient'];
        $headers = array(
            'From' => 'Kothis Error Page <the_internets>',
            'Reply-To' => 'noreply@yourmom.com',
            'X-Mailer' => 'PHP/'.phpversion(),
            'Content-type' => 'text/plain',
            'MIME-Version' => '1.0',
            'Access-Control-Allow-Origin'=>'https://kothis.sylphaxiom.com*',
        );
        $message = <<<ERR
                        Looks like an error was found on the website. Here is the data that was recieved:

                        Error Code: $errCode
                        Error Description: $errDesc

                        Extra Shit:
                        >   Tracking: $errTrack
                        >   Connection: $errConn
                        >   Language: $errLang
                        >   Client: $errClient
                    ERR;

        $eSend = mail('webmaster@sylphaxiom.com',"Someone just reported an error from the Kothis error page",$message,$headers);
        if(!$eSend){
            http_response_code(400);
            echo json_encode(["result"=>"failure", "message"=>"Something went wrong and the email wasn't sent"]);
        } else {
            http_response_code(200);
            echo json_encode(["result"=>"success", "message"=>"Email sent to webmaster@sylphaxiom.com"]);
        }
        break;
        
    case 'DELETE':
        // DELETE info like DROP and removal requests
        break;

    default:
        // Throw an error probably
}
?>