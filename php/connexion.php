<?php
session_start();
require "PDOF.php";
$obj = new stdClass();
$obj->success = false;
$obj->message = 'Nom d\'utilisateur ou mot de passe incorrect';

// PHP a rempli $_POST[username] et $_POST[password]
$username=$_POST["username"];
$password=$_POST["password"];
$sql ="SELECT * FROM user WHERE name = '$username'";
$result = $bdd->prepare();
$result->execute();
foreach ($result as $r){
    if ($password == $r["password"]) {
        $_SESSION["username"]=$username;
    }
}
//$found = true; // simule user/pass trouvés en base
//if ($found) {
//    $obj->success = true;
//    $_SESSION['user'] = 123;
//}
header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($obj);