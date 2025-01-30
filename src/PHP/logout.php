<?php
    
    session_start();
    session_destroy();
    $retorno = "desconectado";
    die(json_encode($retorno));

?>