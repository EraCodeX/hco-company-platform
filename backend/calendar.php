<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

require_once 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$tableCreationQuery = "
    CREATE TABLE IF NOT EXISTS events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        start DATETIME NOT NULL,
        end DATETIME NOT NULL,
        description TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
";

if ($conn->query($tableCreationQuery) === false) {
    echo json_encode(['message' => 'Error creating table: ' . $conn->error]);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $sql = "SELECT * FROM events ORDER BY start ASC";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $events = [];

        while ($row = $result->fetch_assoc()) {
            $events[] = [
                'id' => $row['id'],
                'title' => $row['title'],
                'start' => $row['start'],
                'end' => $row['end'],
                'description' => $row['description']
            ];
        }

        // JSON
        echo json_encode($events);
    } else {
        echo json_encode([]);
    }
}

// POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);

    $title = $conn->real_escape_string($inputData['title']);
    $start = $conn->real_escape_string($inputData['start']);
    $end = $conn->real_escape_string($inputData['end']);
    $description = $conn->real_escape_string($inputData['description']);

    $sql = "INSERT INTO events (title, start, end, description) VALUES ('$title', '$start', '$end', '$description')";

    if ($conn->query($sql) === true) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'message' => $conn->error]);
    }
}

$conn->close();
