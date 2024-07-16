<?php
// Connect to database
require_once 'db.php';

// Retrieve data from database
$salesData = array();
$inventoryData = array();
$productionData = array();

// Check if tables exist
if ($conn->query("SHOW TABLES LIKE 'ales_data_logs'")->num_rows > 0) {
    $sql = "SELECT * FROM sales_data_logs";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $salesData[] = array(
                'time' => $row['time'],
                'employeeId' => $row['employee_id'],
                'employeeName' => $row['employee_name'],
                'task' => $row['task']
            );
        }
    }
}

if ($conn->query("SHOW TABLES LIKE 'inventory_data_logs'")->num_rows > 0) {
    $sql = "SELECT * FROM inventory_data_logs";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $inventoryData[] = array(
                'time' => $row['time'],
                'employeeId' => $row['employee_id'],
                'employeeName' => $row['employee_name'],
                'task' => $row['task']
            );
        }
    }
}

if ($conn->query("SHOW TABLES LIKE 'production_data_logs'")->num_rows > 0) {
    $sql = "SELECT * FROM production_data_logs";
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $productionData[] = array(
                'time' => $row['time'],
                'employeeId' => $row['employee_id'],
                'employeeName' => $row['employee_name'],
                'task' => $row['task']
            );
        }
    }
}

// Close connection
$conn->close();

// Output data in JSON format
echo json_encode(array(
    'ales' => $salesData,
    'inventory' => $inventoryData,
    'production' => $productionData
));
?>