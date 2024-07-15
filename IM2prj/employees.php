<?php
require_once 'db.php';

$action = isset($_GET['action']) ? $_GET['action'] : '';

switch ($action) {
    case 'getEmployees':
        getEmployees($conn);
        break;
    case 'addEmployee':
        addEmployee($conn);
        break;
    case 'editEmployee':
        editEmployee($conn);
        break;
    case 'deleteEmployee':
        deleteEmployee($conn);
        break;
    default:
        echo json_encode(["message" => "Invalid action"]);
}

$conn->close();

function getEmployees($conn) {
    $sql = "SELECT * FROM EMPLOYEE";
    $result = $conn->query($sql);

    $employees = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $employees[] = $row;
        }
    }
    echo json_encode($employees);
}

function addEmployee($conn) {
    $id = $_POST['id'];
    $last_name = $_POST['last_name'];
    $first_name = $_POST['first_name'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $department = $_POST['department'];
    $permission = $_POST['permission'];

    $sql = "INSERT INTO EMPLOYEE (id, last_name, first_name, contact_number, email, department, permission)
            VALUES ('$id', '$last_name', '$first_name', '$contact_number', '$email', '$department', '$permission')";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Employee added successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function editEmployee($conn) {
    $id = $_POST['id'];
    $last_name = $_POST['last_name'];
    $first_name = $_POST['first_name'];
    $contact_number = $_POST['contact_number'];
    $email = $_POST['email'];
    $department = $_POST['department'];
    $permission = $_POST['permission'];

    $sql = "UPDATE EMPLOYEE SET last_name='$last_name', first_name='$first_name', contact_number='$contact_number',
            email='$email', department='$department', permission='$permission' WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Employee updated successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}

function deleteEmployee($conn) {
    $id = $_POST['id'];

    $sql = "DELETE FROM EMPLOYEE WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode(["message" => "Employee deleted successfully"]);
    } else {
        echo json_encode(["error" => "Error: " . $sql . "<br>" . $conn->error]);
    }
}
?>
