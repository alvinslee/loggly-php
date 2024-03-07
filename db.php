<?php
include_once 'constants.php';
include_once 'logger.php';
$logHandler->setTag('database');

try {
  $conn = new mysqli(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
} catch (Exception $e) {
  $error = "Connection failed: " . $e->getMessage();
  $log->error($error);
  die($error);
}
