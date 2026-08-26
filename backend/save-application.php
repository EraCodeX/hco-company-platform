<?php

header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');


require_once 'config.php';

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    die(json_encode(['success' => false, 'message' => 'Connection failed: ' . $conn->connect_error]));
}

// Krijo tabelën nëse nuk ekziston
$conn->query("
CREATE TABLE IF NOT EXISTS applications (
    id INT(11) AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    resume VARCHAR(255) NOT NULL,
    jobTitle VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'] ?? '';
    $email = $_POST['email'] ?? '';
    $jobTitle = $_POST['jobTitle'] ?? '';
    $resume = $_FILES['resume'] ?? null;

    if (empty($name) || empty($email) || empty($jobTitle) || !$resume) {
        echo json_encode(['success' => false, 'message' => 'Please fill all fields.']);
        exit;
    }
    $stmtCheck = $conn->prepare("SELECT * FROM applications WHERE email = ? AND jobTitle = ?");
    $stmtCheck->bind_param("ss", $email, $jobTitle);
    $stmtCheck->execute();
    $resultCheck = $stmtCheck->get_result();

    if ($resultCheck->num_rows > 0) {
        echo json_encode(['success' => false, 'message' => 'You have already applied for this job.']);
        exit;
    }
    $uploadDir = 'uploads/';
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0777, true);
    }

    $resumePath = $uploadDir . basename($resume['name']);
    $fullResumeURL = 'http://localhost/kompani-ndertimi/api/uploads/' . urlencode(basename($resume['name']));

    if (move_uploaded_file($resume['tmp_name'], $resumePath)) {
        $stmt = $conn->prepare("INSERT INTO applications (name, email, jobTitle, resume) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $name, $email, $jobTitle, $fullResumeURL);

        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Application submitted successfully!']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Failed to save application in database.']);
        }
        $stmt->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Failed to upload the resume.']);
    }
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
}

$conn->close();
