<?php

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


//echo $resultado."<br>";


if (empty($user)) {
    die ("token não encontrado");
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
    <title>Conta confirmada</title>
</head>
<body>
    <h1>Conta confirmada</h1>

    <p>Conta confirmada com sucesso. Agora é possivel <a href="index.html">entrar</a>.</p>

</body>
</html>