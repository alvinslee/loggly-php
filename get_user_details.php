<?php
include 'db.php';
include 'logger.php';
$logHandler->setTag('get_user_details');

$username = $_GET['username'];

if (!strlen($username)) {
  $log->warning("No username provided");
  http_response_code(400);
  return;
}

$log->info("Fetching details for user " . $username);

$sql = "SELECT first_name, last_name, email FROM users WHERE username=?";
$statement = $conn->prepare($sql);
$statement->bind_param("s", $username);
$statement->execute();
$result = $statement->get_result();
$user = $result->fetch_assoc();
if (!$user) {
  $log->warning("Could not find user " . $username);
  http_response_code(404);
  return;
}

$conn->close();
echo json_encode($user);
