<?php
include 'db.php';
include 'logger.php';
$logHandler->setTag('delete_user');

$_POST = json_decode(file_get_contents('php://input'), true);
$username = $_POST['username'];
if (!strlen($username)) {
  $log->warning("No username provided");
  http_response_code(400);
  return;
}

$log->info("Deleting user " . $username);
$sql = "DELETE FROM users WHERE username=?";
$statement = $conn->prepare($sql);
$statement->bind_param("s", $username);
$statement->execute();
echo json_encode(['success' => true]);
