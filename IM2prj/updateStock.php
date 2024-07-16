<?php
require_once 'db.php';

$productCode = $_POST['productCode'];
$quantity = $_POST['quantity'];

$updateQuery = "UPDATE products SET quantity = '$quantity' WHERE productCode = '$productCode'";
$conn->query($updateQuery);

$conn->close();
?>