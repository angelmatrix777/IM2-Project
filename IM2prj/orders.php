<?php
require_once 'db.php';

// Retrieve orders from the database
$stmt = $conn->prepare("SELECT * FROM orders");
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $orders = array();
    while ($row = $result->fetch_assoc()) {
        $orders[] = array(
            'orderId' => $row['orders_id'],
            'customerId' => $row['customer_id'],
            'employeeId' => $row['employee_id'],
            'orderDateCreated' => $row['order_date_created'],
            'orderDateCompleted' => $row['order_date_completed'],
            'deliveryAddress' => $row['delivery_address'],
            'totalCost' => $row['total_cost'],
            'datePaid' => $row['date_paid'],
            'status' => $row['status']
        );
    }
    header('Content-Type: application/json');
    echo json_encode($orders);
} else {
    echo "No orders found";
}

$conn->close();
?>