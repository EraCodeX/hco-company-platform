<?php

header("Access-Control-Allow-Origin: http://localhost:3000");
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

require_once 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Create table
$sql = "CREATE TABLE IF NOT EXISTS rating (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    rating INT NOT NULL,
    comment TEXT,
    imageUrl VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);";

if (!$conn->query($sql)) {
    die(json_encode(['error' => 'Table creation failed: ' . $conn->error]));
}

// Handle POST request
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"), true);

    $userEmail = $data['email'] ?? '';
    $rating = $data['rating'] ?? 0;
    $comment = $data['comment'] ?? '';
    $imageUrl = $data['imageUrl'] ?? '';

    if (empty($userEmail) || empty($rating)) {
        echo json_encode(['status' => 'error', 'message' => 'Email and rating are required!']);
        $conn->close();
        exit;
    }

    $stmt = $conn->prepare("SELECT * FROM rating WHERE email = ?");
    $stmt->bind_param("s", $userEmail);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        echo json_encode(['status' => 'error', 'message' => 'You have already rated!']);
    } else {
        $stmt = $conn->prepare("INSERT INTO rating (email, rating, comment, imageUrl) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("siss", $userEmail, $rating, $comment, $imageUrl);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Thank you for your rating!']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'There was an error saving your rating.']);
        }
    }

    $stmt->close();
    $conn->close();
    exit;
}

// Handle GET request
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM rating ORDER BY created_at DESC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $ratings = [];
        while ($row = $result->fetch_assoc()) {
            $ratings[] = $row;
        }
        echo json_encode(['ratings' => $ratings]);
    } else {
        echo json_encode(['ratings' => []]);
    }

    $conn->close();
    exit;
}
