<?php
session_start();

header('Content-Type: application/json');

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "lumber_company";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get the email and password from the POST request
$email = isset($_POST['email']) ? $_POST['email'] : '';
$password = isset($_POST['password']) ? $_POST['password'] : '';

if (empty($email) || empty($password)) {
    echo json_encode(['success' => false, 'message' => 'Please fill in both email and password.']);
    exit();
}

// Fetch the user record by email
$stmt = $conn->prepare("SELECT id, email, password, permission FROM EMPLOYEE WHERE email = ?");
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    // Verify the password
    if (password_verify($password, $user['password'])) {
        // Check if the user is an admin
        $isAdmin = ($user['permission'] === 'Admin');

        // Set session variables
        $_SESSION['loggedin'] = true;
        $_SESSION['userId'] = $user['id'];
        $_SESSION['email'] = $user['email'];
        $_SESSION['isAdmin'] = $isAdmin;

        echo json_encode(['success' => true, 'isAdmin' => $isAdmin]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email or password. Please try again.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid email or password. Please try again.']);
}

$stmt->close();
$conn->close();
