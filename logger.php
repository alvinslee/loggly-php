<?php
include_once 'constants.php';

require __DIR__.'/vendor/autoload.php';

use Monolog\Logger;
use Monolog\Handler\LogglyHandler;
use Monolog\Formatter\LogglyFormatter;

$log = new Logger('user-accounts');
$logHandler = new LogglyHandler(LOGGLY_TOKEN, Logger::INFO);
$log->pushHandler($logHandler);
