<?php

date_default_timezone_set('America/Sao_Paulo');

require 'src/PHP/MensagemErro.php';
$msgErro = new MensagemErro();

if ($_GET) {
    $token = $_GET['token'];

    $token_hash = hash("sha256", $token);

    require "src/PHP/conectarBD.php";

    $pdo = conectar();

    $tabela = "tblUsuario";

    $sql = "SELECT dt_expiracao_token FROM ".$tabela." WHERE token_rec_senha = :token_hash;";
    $exec4 = $pdo->prepare($sql);
    $exec4->bindValue(":token_hash", $token_hash);
    $exec4->execute();
    $user = $exec4->fetchAll(PDO::FETCH_COLUMN);
}

if (empty($user)) {
    $mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
    $msgErro->exibirMensagemErro($mensagem, "");
}

if (strtotime($user[0]) <= time()) {
    $mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
    $msgErro->exibirMensagemErro($mensagem, "");
} else {
    //die ("token é válido e não está expirado");
}

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
    <link rel="stylesheet" href="./src/style/css/estiloRecuperacao.css">
    <title>Redefinir senha</title>
</head>
<body>
    <div id="containerRecupSenha">
        <div id="titleRecupSenha">
            <h2>REDEFINA SUA SENHA</h2>
        </div>
        <form method="post" id="formRecupSenha">
            <div id="picture-box">
                <div  id="picture-obj">
                    <img src="./src/imgs/icons/psswordReset01.png" alt="redefinir senha" style="width: 100%;">
                </div>
            </div>
            <p>Senhas fortes incluem números, letras e sinais de pontuação.</p>
            <div id="input-group">
                <label><strong>Digite sua nova senha:</strong></label>
                <input type="password" maxlength="15" name="senha" placeholder="máx de 15 caracteres" />
                <br/><br/>
                <label><strong>Confirme sua nova senha:</strong></label>
                <input type="password" maxlength="15" name="confirmaSenha"/>
            </div>
            <br/><br/>
            <input type="submit" value="REDEFINIR SENHA" class="btn-recuperacao">
        </form>
    </div>

    <?php

        if ($_POST) {

            $senha = $_POST['senha'];
            $confirmaSenha = $_POST['confirmaSenha'];

            if (!empty($senha) && !empty($confirmaSenha)) {
                if ($senha == $confirmaSenha) {

                    $exec5 = $pdo->prepare("UPDATE tblUsuario SET senha_usuario = :senha, token_rec_senha = null, dt_expiracao_token = null WHERE token_rec_senha = :token_hash;");
                    $exec5->bindValue(":token_hash", $token_hash);
                    $exec5->bindValue(":senha", $senha);
                    $exec5->execute();

                    header("location: index.html");
                    echo "<script>window.location.replace('index.html');</script>";
                    die();
                } else {
                    echo "<script>alert('As senhas não coincidem');</script>";
                }
            } else {
                echo "<script>alert('Preencha todos os campos');</script>";
            }
        }
    ?>

</body>
</html>