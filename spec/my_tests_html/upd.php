<?php
header('Content-Type: image/png');
header('Content-Length: ' . filesize("php://input"));

$im = file_get_contents("php://input");

header('Content-Length: ' . strlen($im));
echo $im;
exit;