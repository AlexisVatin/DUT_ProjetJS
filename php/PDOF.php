<?php

$usernameDb="202266_alexis";
$passwordDb="755fkws3v";

try
{
    $bdd = new PDO('mysql:host=mysql-alexisvatin.alwaysdata.net;dbname=alexisvatin_bdjs', $usernameDb, $passwordDb);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(Exception $e)
{
    die('Erreur : '.$e->getMessage());
}
