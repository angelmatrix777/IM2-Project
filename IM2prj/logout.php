<?php
session_start();
session_destroy();
header("Location: login.php"); // Redirect to login page or home page
exit();
?>
