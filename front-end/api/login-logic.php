<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
if (session_status() == PHP_SESSION_NONE  || session_id() == '') {
    session_start();
};
include("../environment.php");
$url = $_ENV["ROADSHOW_API"].'user/auth/login';

$data_array =  json_encode([
      "username" => $_POST["username"],
      "password" => $_POST["password"]
]);

$handler = curl_init($url);
$options = [CURLOPT_POSTFIELDS => $data_array,CURLOPT_HTTPHEADER => [
        'Content-Type: application/json',
        'Content-Length: ' . strlen($data_array)
    ], CURLOPT_POST => true];
curl_setopt_array($handler, $options);
curl_setopt($handler, CURLOPT_HEADER, 1);
curl_setopt($handler, CURLOPT_RETURNTRANSFER, 1);
$ret = curl_exec($handler);
$responseCode = curl_getinfo($handler, CURLINFO_HTTP_CODE);


$header_len = curl_getinfo($handler, CURLINFO_HEADER_SIZE);
$header = substr($ret, 0, $header_len);
$body = substr($ret, $header_len);

curl_close($handler);

if(strpos($header, 'Unauthorized') !== false || strpos($header, '302 Found') !== false){
  header("Location: ../login.php?err=NotFound");
  exit;
}


preg_match('/roadshow_sid=(.*?);/', $header, $matches);
$sid = $matches[1];
header("Set-Cookie: roadshow_sid=".$sid."; Path=/; HttpOnly");
$user = json_decode($body);
$_SESSION['Username'] = $user->user->firstName;
$_SESSION['UserId'] = $user->user->_id;
$_SESSION['isAdmin'] = $user->user->isAdmin;
header("Location: ../index.php");
?>
