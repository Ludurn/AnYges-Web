<?php

    session_start();

    $funcao = $_POST['funcao'];
    
    if (isset($_SESSION['usuario'])) {
        $retorno['status'] = "conectado";
        $retorno['funcao'] = $funcao;
        die(json_encode($retorno));
    } else {
        $retorno = "desconectado";
        die(json_encode($retorno));
    }

    
?>