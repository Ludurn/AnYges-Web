<?php
    try {
        $localServer = "ULTRON";
        $dbName = "Anyges";
        $userName = "sa";
        $userPsswrd = "Eldritch1890";
        $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
    } catch (Exception $error) {
        echo "Erro na conexão com o BD ". $error->getMessage();
    }
?>