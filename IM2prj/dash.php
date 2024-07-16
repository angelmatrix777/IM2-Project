<?php
include 'db.php';

// Initialize response array
$response = [
    'stats' => [
        'to_be_packed' => 0,
        'to_be_shipped' => 0,
        'delivered' => 0
    ],
    'summaries' => [
        'quantity_in_hand' => 0,
        'to_be_received' => 0,
        'number_of_suppliers' => 0,
        'number_of_categories' => 0
    ],
    'inventory' => []
];

// Fetch stats
$sql = "SELECT COUNT(*) as count FROM ORDERS WHERE status='packing'";
$result = $conn->query($sql);
$response['stats']['to_be_packed'] = $result->fetch_assoc()['count'];

$sql = "SELECT COUNT(*) as count FROM ORDERS WHERE status='shipping'";
$result = $conn->query($sql);
$response['stats']['to_be_shipped'] = $result->fetch_assoc()['count'];

$sql = "SELECT COUNT(*) as count FROM ORDERS WHERE status='completed'";
$result = $conn->query($sql);
$response['stats']['delivered'] = $result->fetch_assoc()['count'];

// Fetch summaries
$sql = "SELECT COUNT(DISTINCT product_code) as count FROM INVENTORY";
$result = $conn->query($sql);
$response['summaries']['quantity_in_hand'] = $result->fetch_assoc()['count'];

$sql = "SELECT COUNT(*) as count FROM ORDERS WHERE status != 'completed'";
$result = $conn->query($sql);
$response['summaries']['to_be_received'] = $result->fetch_assoc()['count'];

$sql = "SELECT COUNT(DISTINCT supplier_id) as count FROM SUPPLIERS";
$result = $conn->query($sql);
$response['summaries']['number_of_suppliers'] = $result->fetch_assoc()['count'];

$sql = "SELECT COUNT(DISTINCT wood_type) as count FROM INVENTORY";
$result = $conn->query($sql);
$response['summaries']['number_of_categories'] = $result->fetch_assoc()['count'];

// Fetch inventory data
$sql = "SELECT * FROM INVENTORY";
$result = $conn->query($sql);
while ($row = $result->fetch_assoc()) {
    $response['inventory'][] = $row;
}

// Return response as JSON
header('Content-Type: application/json');
echo json_encode($response);

$conn->close();
?>
