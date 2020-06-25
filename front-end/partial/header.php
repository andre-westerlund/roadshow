<?php
if (session_status() == PHP_SESSION_NONE  || session_id() == '') {
    session_start();
};
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel='shortcut icon'  href='public/img/favicon.ico'>
  <title><?php echo (isset($pageTitle))? $pageTitle." - Vodafone Roadshow Admin" : "Vodafone Roadshow Admin"; ?></title>
  <link rel="stylesheet" href="public/bootstrap/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<?php include("environment.php"); ?>
</head>
<body>
<?php if($showNavBar){ 
echo '<nav class="navbar navbar-expand-lg navbar-light bg-light">';
if(!isset($_COOKIE['roadshow_sid']) && !isset($_COOKIE['PHPSESSID'])){
  header('Location: login.php');
}
if(isset($_SESSION['Username'])){
   echo "<a class='navbar-brand'>".$_SESSION['Username']."</a>";
}else{
   echo "<a class='navbar-brand'>RoadApp</a>";
}

?>
  
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="index.php">Home <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="agent.php">Agents</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="lead.php">Leads</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="village.php">Villages</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="activity.php">Activity</a>
      </li>
      <?php
        if(isset($_SESSION['isAdmin']) && $_SESSION['isAdmin'] == true){
          echo'<li class="nav-item"><a class="nav-link" href="user.php">Users</a></li>';
        }
      ?>
    </ul>
    <form action="logout.php" class="form-inline my-2 my-lg-0">
      <button id="logout" class="btn btn-outline-danger my-2 my-sm-0 danger" type="submit">Logout</button>
    </form>
  </div>
</nav>

<?php }?>