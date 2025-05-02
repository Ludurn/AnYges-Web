<?php
    
    session_start();
    $_SESSION['usuario'] = "";
    if (isset($_COOKIE['carrinho'])) {
        setcookie("carrinho", "", strtotime("-1 week"), '/');
    }
    session_destroy();
    $retorno = "desconectado";
    die(json_encode($retorno));

?>