<?php
    try {
        $localServer = "DESKTOP-GARBFV9";
        $dbName = "ImgTCC";
        $userName = "sa";
        $userPsswrd = "etesp";
        $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
    } catch (Exception $error) {
        echo "Erro na conexão com o BD ". $error->getMessage();
    }
?>