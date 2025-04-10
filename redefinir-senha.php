<?php

date_default_timezone_set('America/Sao_Paulo');

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


//echo $resultado."<br>";


if (empty($user)) {
    die ("token não encontrado");
}

if (strtotime($user[0]) <= time()) {
    die("token expirado");
} else {
    //die ("token é válido e não está expirado");
}
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinir senha</title>
</head>
<body>
    <form method="post" style="width: fit-content; margin: auto; margin-top: 20%;">
        <h1>Redefina sua senha</h1>
        <p>Senhas fortes incluem números, letras e sinais de pontuação.</p>
        <label>Digite sua nova senha</label>
        <br/>
        <input type="password" maxlength="15" name="senha" placeholder="máx de 15 caracteres" />
        <br/><br/>
        <label>Confirme sua nova senha</label>
        <br/>
        <input type="password" maxlength="15" name="confirmaSenha"/>
        <br/><br/>
        <input type="submit" value="Refinir senha">
    </form>

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