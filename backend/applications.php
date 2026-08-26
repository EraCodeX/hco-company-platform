<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require_once 'config.php';
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['message' => 'Connection failed: ' . $conn->connect_error]));
}

// Fetch applications based on user email
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $userEmail = $_GET['email'] ?? '';
    if (empty($userEmail)) {
        echo json_encode(['message' => 'Email is required.']);
        exit;
    }

    $sql = "SELECT name, jobTitle, created_at FROM applications WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();
    $result = $stmt->get_result();

    $applications = [];
    while ($row = $result->fetch_assoc()) {
        $applications[] = $row;
    }

    echo json_encode($applications);
    $stmt->close();
}

// Save application
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $jobTitle = $_POST['jobTitle'] ?? '';

    if (empty($name) || empty($email) || empty($jobTitle)) {
        echo json_encode(['message' => 'Name, email, and job title are required.']);
        exit;
    }

    $sql = "INSERT INTO applications (name, email, jobTitle) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("sss", $name, $email, $jobTitle);

    if ($stmt->execute()) {
        echo json_encode(['message' => 'Application saved successfully.']);
    } else {
        echo json_encode(['message' => 'Failed to save application.']);
    }
    $stmt->close();
}

$conn->close();
