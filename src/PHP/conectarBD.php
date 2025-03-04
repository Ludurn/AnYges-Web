<?php
    function conectar() {
        try {
            $localServer = "RAFAMMGAMER";
            $dbName = "anyges";
            $userName = "sa";
            $userPsswrd = "12345";
            $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
            return $pdo;
            die;
        } catch (Exception $error) {
            echo "Erro na conexão com o BD ". $error->getMessage();
            die;
        }
    }
?>