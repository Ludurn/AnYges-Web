<?php
    function conectar() {
        try {
            $localServer = "LAB02T-06\SQLEXPRESS";
            $dbName = "anyges";
            $userName = "sa";
            $userPsswrd = "etesp";
            $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
            return $pdo;
        } catch (Exception $error) {
            echo "Erro na conexão com o BD ". $error->getMessage();
            die;
        }
    }
?>