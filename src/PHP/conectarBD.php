<?php
    function conectar() {
        try {
            $localServer = "ULTRON";
            $dbName = "anyges";
            $userName = "sa";
            $userPsswrd = "Eldritch1890";
            $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
            return $pdo;
            die;
        } catch (Exception $error) {
            echo "Erro na conexão com o BD ". $error->getMessage();
            die;
        }
    }
?>