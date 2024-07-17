<?php
require_once 'db.php';

$product = json_decode($_POST['product'], true);

$productCode = $product['productCode'];
$woodType = $product['woodType'];
$size = $product['size'];
$unit = $product['unit'];
$quantity = $product['quantity'];
$location = $product['location'];
$price = $product['price'];

$insertQuery = "INSERT INTO products (productCode, woodType, size, unit, quantity, location, price) VALUES ('$productCode', '$woodType', '$size', '$unit', '$quantity', '$location', '$price')";
$conn->query($insertQuery);

$conn->close();
?>