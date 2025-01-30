<?php
    try {
        $localServer = "DESKTOP-71GG4G8";
        $dbName = "imgTest";
        $userName = "sa";
        $userPsswrd = "ludurn";
        $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
        return $pdo;
    } catch (Exception $error) {
        echo "Erro na conexão com o BD ". $error->getMessage();
        die;
    }
?>