<?php
require_once 'db.php';

$productCode = $_POST['productCode'];

$deleteQuery = "DELETE FROM products WHERE productCode = '$productCode'";
$conn->query($deleteQuery);

$conn->close();
?>