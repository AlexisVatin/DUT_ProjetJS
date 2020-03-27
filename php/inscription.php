<?php
session_start();

$data = new stdClass();
$data->success = false;
$data->message = "Pas de message";
require "PDOF.php";
if(isset($_SESSION['user'])){
    $data->message = "Vous êtes déja connecté";
}else{
    if(isset($_POST)){
        extract($_POST);
        $data->success = true;
        if(!isset($name) || sizeof($name)==0) $data->success = false;
        if(!isset($mail) || sizeof($mail)==0) $data->success = false;
        if(!isset($password) || sizeof($password)==0) $data->success = false;
        if($data->success == true){
            $requete_user = $bdd->prepare("INSERT INTO `user`(`name`, `mail`, `password`) VALUES (?,?,?)");
            $requete_user->execute(array($name, $mail, $password));
            $_SESSION['user'] = $name;
        }else{
            $data->message = "Une erreur est survenue";
        }

    }
}

header('Cache-Control: no-cache, must-revalidate');
header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

echo json_encode($data);