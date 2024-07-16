<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];

    switch ($action) {
        case 'add':
            $name = $_POST['name'];
            $contactNumber = $_POST['contact_number'];
            $email = $_POST['email'];
            $credibility = $_POST['credibility_status'] === 'Trusted' ? 1 : 0;

            $sql = "INSERT INTO CUSTOMERS (name, contact_number, email, credibility_status) VALUES ('$name', '$contactNumber', '$email', '$credibility')";
            if ($conn->query($sql) === TRUE) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            break;

        case 'edit':
            $id = $_POST['customer_id'];
            $name = $_POST['name'];
            $contactNumber = $_POST['contact_number'];
            $email = $_POST['email'];
            $credibility = $_POST['credibility_status'] === 'Trusted' ? 1 : 0;

            $sql = "UPDATE CUSTOMERS SET name='$name', contact_number='$contactNumber', email='$email', credibility_status='$credibility' WHERE id='$id'";
            if ($conn->query($sql) === TRUE) {
                echo "Record updated successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            break;

        case 'delete':
            $id = $_POST['customer_id'];
            $sql = "DELETE FROM CUSTOMERS WHERE id='$id'";
            if ($conn->query($sql) === TRUE) {
                echo "Record deleted successfully";
            } else {
                echo "Error: " . $sql . "<br>" . $conn->error;
            }
            break;

        case 'read':
            $result = $conn->query("SELECT * FROM CUSTOMERS");
            $customers = array();
            while ($row = $result->fetch_assoc()) {
                $row['credibility_status'] = $row['credibility_status'] == 1 ? 'Trusted' : 'Not Trusted';
                $customers[] = $row;
            }
            echo json_encode($customers);
            break;
    }
}

$conn->close();
?>
