<?php

    session_start();
    
    if (isset($_SESSION['usuario'])) {
        $retorno = "conectado";
        die(json_encode($retorno));
    } else {
        $retorno = "desconectado";
        die(json_encode($retorno));
    }

    
?>