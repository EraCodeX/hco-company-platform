<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

require_once 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Merr email nga GET
$email = $_GET['email'] ?? '';

if (!$email && $email !== '') {
    echo json_encode(['success' => false, 'message' => 'Email is required']);
    exit;
}

if ($email === '') {
    $sql = "SELECT * FROM applications ORDER BY created_at DESC";
    $result = $conn->query($sql);
} else {
    $stmt = $conn->prepare("SELECT * FROM applications WHERE email = ? ORDER BY created_at DESC");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
}

$applications = [];
while ($row = $result->fetch_assoc()) {
    $applications[] = $row;
}

if (count($applications) > 0) {
    echo json_encode(['success' => true, 'applications' => $applications]);
} else {
    echo json_encode(['success' => true, 'applications' => []]);
}

$conn->close();
