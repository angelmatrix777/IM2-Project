<?php
header('Content-Type: application/json');

require_once 'db.php';

// Fetch statistics
$stats = [
    'to_be_packed' => 0,
    'to_be_shipped' => 0,
    'to_be_delivered' => 0,
];

$result = $conn->query("SELECT COUNT(*) as count FROM ORDERS WHERE status='Pending'");
if ($result->num_rows > 0) {
    $stats['to_be_packed'] = $result->fetch_assoc()['count'];
}

$result = $conn->query("SELECT COUNT(*) as count FROM ORDERS WHERE status='Shipped'");
if ($result->num_rows > 0) {
    $stats['to_be_shipped'] = $result->fetch_assoc()['count'];
}

$result = $conn->query("SELECT COUNT(*) as count FROM ORDERS WHERE status='Delivered'");
if ($result->num_rows > 0) {
    $stats['to_be_delivered'] = $result->fetch_assoc()['count'];
}

// Fetch summaries
$summaries = [
    'quantity_in_hand' => 0,
    'to_be_received' => 0,
    'number_of_suppliers' => 0,
    'number_of_categories' => 0,
];

$result = $conn->query("SELECT SUM(quantity) as quantity FROM INVENTORY");
if ($result->num_rows > 0) {
    $summaries['quantity_in_hand'] = $result->fetch_assoc()['quantity'];
}

$result = $conn->query("SELECT COUNT(DISTINCT supplier) as suppliers FROM INVENTORY");
if ($result->num_rows > 0) {
    $summaries['number_of_suppliers'] = $result->fetch_assoc()['suppliers'];
}

$result = $conn->query("SELECT COUNT(DISTINCT category) as categories FROM INVENTORY");
if ($result->num_rows > 0) {
    $summaries['number_of_categories'] = $result->fetch_assoc()['categories'];
}

// Fetch data for low stock
$low_stock = [];
$result = $conn->query("SELECT * FROM LOW_STOCK");
while ($row = $result->fetch_assoc()) {
    $low_stock[] = $row;
}

$response = [
    'stats' => $stats,
    'summaries' => $summaries,
    'low_stock' => $low_stock
];

echo json_encode($response);

$conn->close();
?>
