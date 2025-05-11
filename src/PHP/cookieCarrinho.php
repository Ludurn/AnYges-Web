<?php

    require 'MensagemErro.php';
    $msgErro = new MensagemErro();

    session_start();

    if ($_POST) {
        if (isset($_SESSION['usuario'])) {
            $dadosCarrinho = $_POST['dadosCarrinho'];
            $dadosCarrinho = implode(',', $dadosCarrinho);
            setcookie("carrinho", $dadosCarrinho, strtotime("+1 week"), '/');
            die(json_encode("sucesso"));
        } else {
            die(json_encode("usuario nao conectado"));
        }
    } else {
        $mensagem = "Desculpe, a página que você está procurando não existe ou não está disponível no momento.";
        $msgErro->exibirMensagemErro($mensagem, "restrito");
    }

?>