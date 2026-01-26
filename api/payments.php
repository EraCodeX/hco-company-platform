<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS, POST');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');
error_reporting(E_ALL);
ini_set('display_errors', 1);
require_once 'config.php';
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$tableCreationQuery = "
CREATE TABLE IF NOT EXISTS payments (
id INT AUTO_INCREMENT PRIMARY KEY,
method VARCHAR(50) NOT NULL,
amount DECIMAL(10, 2) NOT NULL,
object_type VARCHAR(255) NOT NULL,
area DECIMAL(10, 2) NOT NULL,
payment_id VARCHAR(255) NULL,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
";
if ($conn->query($tableCreationQuery) === true) {
} else {
    echo json_encode(["status" => "error", "message" => "Error creating table: " . $conn->error]);
    exit();
}

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['method']) && isset($data['amount'])) {
    $method = $data['method'];
    $amount = $data['amount'];
    $objectType = $data['objectType'];
    $area = $data['area'];
    $paymentId = isset($data['paymentId']) ? $data['paymentId'] : null;

    // SQL query to insert payment data
    $stmt = $conn->prepare("INSERT INTO payments (method, amount, object_type, area, payment_id) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $method, $amount, $objectType, $area, $paymentId);
    if ($stmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Payment saved successfully."]);
    } else {
        echo json_encode(["status" => "error", "message" => "Failed to save payment."]);
    }

    $stmt->close();
} else {
    echo json_encode(["status" => "error", "message" => "Invalid data received."]);
}
$conn->close();
