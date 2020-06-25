<?php
if (session_status() == PHP_SESSION_NONE  || session_id() == '') {
    session_start();
};
$pageTitle = "Index";
if(!isset($_COOKIE['roadshow_sid'])){
  header('Location: login.php');
}else{
  header('Location: dashboard.php');
}
?>