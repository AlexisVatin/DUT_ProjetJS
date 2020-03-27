<?php
session_start();

$data = new stdClass();
$data->success = false;
$data->message = "Pas de message";
if(isset($_SESSION['user'])){
    $data->success = true;
    $data->user = $_SESSION['user'];
    $data->message = "Vous êtes connecter";
}else{
    $data->message = "Vous n'êtes pas connecter";
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($data);