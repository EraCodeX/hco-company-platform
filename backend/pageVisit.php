<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

session_start();

require_once 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Create the unique visitors table if it doesn't exist.
$table_create_query = "CREATE TABLE IF NOT EXISTS unique_visitors (
    id INT AUTO_INCREMENT PRIMARY KEY,
    ip_address VARCHAR(50) NOT NULL,
    last_visit DATETIME NOT NULL,
    UNIQUE (ip_address)
)";
if (!$conn->query($table_create_query)) {
    die(json_encode(['success' => false, 'message' => 'Error creating table: ' . $conn->error]));
}

// Get the visitor's IP address
function getUserIP()
{
    if (!empty($_SERVER['HTTP_CLIENT_IP'])) {
        return $_SERVER['HTTP_CLIENT_IP'];
    } elseif (!empty($_SERVER['HTTP_X_FORWARDED_FOR'])) {
        return $_SERVER['HTTP_X_FORWARDED_FOR'];
    } else {
        return $_SERVER['REMOTE_ADDR'];
    }
}
$ip_address = getUserIP();
$current_time = date('Y-m-d H:i:s');

$check_query = "SELECT * FROM unique_visitors WHERE ip_address = '$ip_address'";
$result = $conn->query($check_query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $last_visit = strtotime($row['last_visit']);
    $time_diff = time() - $last_visit;
    if ($time_diff > 86400) {
        $update_query = "UPDATE unique_visitors SET last_visit = '$current_time' WHERE ip_address = '$ip_address'";
        $conn->query($update_query);
    }
} else {
    $insert_query = "INSERT INTO unique_visitors (ip_address, last_visit) VALUES ('$ip_address', '$current_time')";
    $conn->query($insert_query);
}

$count_query = "SELECT COUNT(*) AS total_visitors FROM unique_visitors";
$count_result = $conn->query($count_query);

if ($count_result->num_rows > 0) {
    $row = $count_result->fetch_assoc();
    echo json_encode(['success' => true, 'visitors' => $row['total_visitors']]);
} else {
    echo json_encode(['success' => false, 'message' => 'No data found']);
}

$conn->close();
