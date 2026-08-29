<?php
header('Access-Control-Allow-Origin:*');
header('Access-Control-Max-Age:3600');
header('Access-Control-Allow-Headers:Content-type,Sage');
header('Access-Control-Allow-Methods:POST,OPTIONS');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
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
$conn = Bucket::dbConn("web", "kothis");

header("Content-Type: application/json");

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Functions to be used to communicate and manage M2M requests from
// Kothis Backend to manage users and check validity.

function get_access_token(string $sageHead)
{
    $curl = curl_init();
    list($cid, $csec) = Bucket::getA0Client($sageHead);
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://auth.kothis.sylphaxiom.com/oauth/token",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => "{\"client_id\":\"$cid\",\"client_secret\":\"$csec\",\"audience\":\"https://auth.kothis.sylphaxiom.com/api/v2/\",\"grant_type\":\"client_credentials\"}",
        CURLOPT_HTTPHEADER => array(
            "content-type: application/json"
        ),
    ));

    $response = curl_exec($curl);
    $err = curl_error($curl);

    if ($err) {
        return "cURL Error #:" . $err;
    } else {
        return $response;
    }
}

function manage_endpoint()
{
    $curl = curl_init();
    curl_setopt_array($curl, array(
        CURLOPT_URL => "https://auth.kothis.sylphaxiom.com/api/v2/<Management API Endpoint>",
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => array(
            "authorization: Bearer <JWT>"
        ),
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);
    if ($err) {
        echo "cURL Error #:" . $err;
    } else {
        echo $response;
    }
}

switch ($method) {
    case 'GET':

        break;
    case 'POST':

        break;
}
?>