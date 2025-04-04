<?php
    function conectar() {
        try {
            $localServer = "DESKTOP-GARBFV9";
            $dbName = "anyges";
            $userName = "sa";
            $userPsswrd = "etesp";
            $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
            return $pdo;
            die;
        } catch (Exception $error) {
            echo "Erro na conexão com o BD ". $error->getMessage();
            die;
        }
    }
?>