<?php
include 'db.php';
include 'logger.php';
$logHandler->setTag('add_user');

$_POST = json_decode(file_get_contents('php://input'), true);
$statement = $conn->prepare('INSERT INTO users (username, first_name, last_name, email) VALUES (?, ?, ?, ?)');
$statement->bind_param("ssss", $_POST['username'], $_POST['first_name'], $_POST['last_name'], $_POST['email']);
$statement->execute();

$log->info("Adding user " . $_POST['username'] . ": " . $_POST['first_name'] . " " . $_POST['last_name'] . " (" . $_POST['email'] . ")");

$result = ['success' => ($statement->affected_rows > 0), 'username' => $_POST['username']];
echo json_encode($result);
