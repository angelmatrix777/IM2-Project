<?php
require_once 'db.php';

// Function to fetch customer records
function fetchCustomers($conn) {
    $sql = "SELECT * FROM CUSTOMERS";
    $result = $conn->query($sql);
    $customers = [];

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $customers[] = $row;
        }
    }

    echo json_encode([
        'status' => 'success',
        'records' => $customers
    ]);
}

// Function to add a new customer record
function addCustomer($conn) {
    $id = $_POST['customer_id'];
    $name = $_POST['customer_name'];
    $contact_number = $_POST['customer_contact_num'];
    $email = $_POST['customer_email'];
    $credibility_status = $_POST['credibility_status'];

    $sql = "INSERT INTO CUSTOMERS (id, name, contact_number, email, credibility_status)
            VALUES ('$id', '$name', '$contact_number', '$email', '$credibility_status')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

// Function to update an existing customer record
function updateCustomer($conn) {
    $id = $_POST['customer_id'];
    $name = $_POST['customer_name'];
    $contact_number = $_POST['customer_contact_num'];
    $email = $_POST['customer_email'];
    $credibility_status = $_POST['credibility_status'];

    $sql = "UPDATE CUSTOMERS
            SET name='$name', contact_number='$contact_number', email='$email', credibility_status='$credibility_status'
            WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

// Function to delete a customer record
function deleteCustomer($conn) {
    $id = $_POST['customer_id'];

    $sql = "DELETE FROM CUSTOMERS WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => $conn->error]);
    }
}

// Handle the incoming request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'fetch':
            fetchCustomers($conn);
            break;
        case 'add':
            addCustomer($conn);
            break;
        case 'update':
            updateCustomer($conn);
            break;
        case 'delete':
            deleteCustomer($conn);
            break;
        default:
            echo json_encode(['status' => 'error', 'message' => 'Invalid action']);
    }
}

$conn->close();
?>
