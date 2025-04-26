<?php

require 'src/PHP/MensagemErro.php';
$msgErro = new MensagemErro();

if ($_GET) {
    $token = $_GET['token'];

    $token_hash = hash("sha256", $token);

    require "src/PHP/conectarBD.php";

    $pdo = conectar();

    $tabela = "tblUsuario";

    $sql = "SELECT token_ativacao FROM ".$tabela." WHERE token_ativacao = :token_hash;";
    $exec1 = $pdo->prepare($sql);
    $exec1->bindValue(":token_hash", $token_hash);
    $exec1->execute();
    $user = $exec1->fetchAll(PDO::FETCH_COLUMN);
}


if (empty($user)) {
    $mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
    $msgErro->exibirMensagemErro($mensagem);
}
    
$exec2 = $pdo->prepare("UPDATE tblUsuario SET token_ativacao = NULL WHERE token_ativacao = :token_hash;");
$exec2->bindValue(":token_hash", $token_hash);
$exec2->execute();


?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/x-icon" href="src/imgs/icons/logo-ico.ico">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->   
    <link rel="stylesheet" href="./src/style/estiloConfirmacao.css">
    <title>Conta confirmada</title>
</head>
<body>
    <div id="containerConfirmConta">
        <div id="titleConfirmConta">
            <h2>CONTA CONFIRMADA</h2>
        </div>
        <div id="picture-box">
            <div  id="picture-obj">
                <img src="./src/imgs/icons/confirmAccount.png" alt="redefinir senha" style="width: 100%;">
            </div>
        </div>
        <div id="confirmConta-content">
            <div id="content-message">
                <p>Conta confirmada com sucesso. Pressione o botão abaixo e desfrute de nosso serviços.</p>
            </div>
            <br/>
            <a href="index.html"><input type="submit" value="ENTRAR" id="btn-confirmacao"></a>
        </div>
    </div>

</body>
</html>