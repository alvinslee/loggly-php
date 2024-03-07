<?php

include 'db.php';
include 'logger.php';
$logHandler->setTag('get_users');

$sql = "SELECT username FROM users ORDER BY lower(username)";
$result = $conn->query($sql);

$rows = array();

while ($row = $result->fetch_assoc()) {
  $rows[] = $row;
}

$log->info("Fetched " . count($rows) . " rows");

$conn->close();
echo json_encode($rows);

