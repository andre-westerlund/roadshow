<?php
if(isset($_COOKIE['roadshow_sid'])){
  header("Location: index.php");
  exit;
}

 $pageTitle = "Login";
 $showNavBar = false;
 include('partial/header.php')
?>
  <link rel="stylesheet" href="public/style/login-style.css">
  <div class="main">
    <img class="vlogo" id="vlogo" align="center" src="public/img/vodafone-logo.png">
    <p class="sign" align="center">Vodafone Roadshow Portal</p>
    <form class="form1" action="api/login-logic.php" method="POST">
      <input id="email" class="un" type="email" align="center" name="username" placeholder="Email Address" required>
      <input id="password" class="pass" type="password" align="center" name="password" placeholder="Password" required>
      <button id="submit" class="submit" align="center" type="submit">LOGIN</button>
      
      <?php
        if(isset($_GET['err'])){
          echo "<p class='message py-2' style='color:red;text-align:center;'>Username/Password Incorrect</p>";
          unset($_GET["err"]);
        }
      ?>
    </form>        
    </div>
     
<?php include('partial/footer.php') ?>