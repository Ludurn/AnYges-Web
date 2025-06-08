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
    <title>Anyges - Redefinição de Senha</title>
    <link rel="icon" type="image/x-icon" href="src/imgs/icons/logo-ico.ico">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->   
    <link rel="stylesheet" href="./src/style/css/estiloAuth.css">
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
                <input type="password" maxlength="15" name="senha" placeholder="mínimo de 8 caracteres." />
                <br/><br/>
                <label><strong>Confirme sua nova senha:</strong></label>
                <input type="password" maxlength="15" name="confirmaSenha" placeholder="mínimo de 8 caracteres."/>
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
                if (strlen($senha) >= 8 && strlen($confirmaSenha) >= 8) {
                    if ($senha == $confirmaSenha) {
                        if (!preg_match('/[\s\'"=*;()-]/', $senha)) {
                            $senha_hash = password_hash($senha, PASSWORD_DEFAULT);
    
                            $exec5 = $pdo->prepare("UPDATE tblUsuario SET senha_usuario = :senha, token_rec_senha = null, dt_expiracao_token = null WHERE token_rec_senha = :token_hash;");
                            $exec5->bindValue(":token_hash", $token_hash);
                            $exec5->bindValue(":senha", $senha_hash);
                            $exec5->execute();
        
                            header("location: login.html");
                            echo "<script>window.location.replace('login.html');</script>";
                            die();
                        } else {
                            echo "<script>alert('A nova senha contém caracteres inválidos.');</script>";
                        }
                    } else {
                        echo "<script>alert('As senhas não coincidem');</script>";
                    }
                } else {
                    echo "<script>alert('A nova senha deve conter ao menos 8 caracteres.');</script>";
                }
            } else {
                echo "<script>alert('Preencha todos os campos');</script>";
            }
        }
    ?>

</body>
</html>