<?php

$usernameDb="root";
$passwordDb="";
$dbName="alexisvatin_bdjs";
try
{
    $bdd = new PDO('mysql:host=localhost;dbname='.$dbName, $usernameDb, $passwordDb);
    $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
}
catch(Exception $e)
{
    die('Erreur : '.$e->getMessage());
}
