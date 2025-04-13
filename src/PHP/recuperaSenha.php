<?php

date_default_timezone_set('America/Sao_Paulo');

require 'Email.php';
$email = new Email();


$token = bin2hex(random_bytes(16));
$token_hash = hash("sha256", $token);

$expiracao = date('d/m/Y H:i:s', time() + 60 * 30);

$exec2 = $pdo->prepare("UPDATE tblUsuario SET token_rec_senha = :token_hash, dt_expiracao_token = :expiracao WHERE email_usuario = :userEmail;");
$exec2->bindValue(":token_hash", $token_hash);
$exec2->bindValue(":expiracao", $expiracao);
$exec2->bindValue(":userEmail", $userEmail);
$exec2->execute();

$exec3 = $pdo->prepare("SELECT nome_usuario FROM tblUsuario WHERE email_usuario = :userEmail;");
$exec3->bindValue(":userEmail", $userEmail);
$exec3->execute();
$nomeUser = $exec3->fetchAll(PDO::FETCH_COLUMN);
        

$assuntoEmail = "Redefinir senha";

$corpoEmail = <<<END

    <div style='display: flex; flex-direction: column; text-align: justify; width: fit-content; margin: auto;'>
    
    <div style='text-align: center;'>
    <h1>Olá, $nomeUser[0]!</h1>
    </div>

    <p>Está com problemas para acessar sua conta do Anyges? A gente ajuda. Selecione o botão abaixo para redefinir sua senha.
    Este link é válido por 30 minutos.
    <br/> <br/>
    <div style='margin: auto; text-align: center;'>
    <div style='background-color: #228B22; color: white; text-decoration: none; border-radius: 1rem; padding: 3%; width: 25%; margin: auto;'>
    <a href="http://localhost/redefinir-senha.php?token=$token" style='color: white; text-decoration: none;'><strong>REDEFINIR SENHA</strong></a>
    </div>
    <br/> <br/>
    <a href="http://localhost/redefinir-senha.php?token=$token">http://localhost/redefinir-senha.php?token=$token</a>
    </div>
    <p>Ao redefinir sua senha, você também confirma o e-mail associado à sua conta.<br>
    Se não solicitou a redefinição, ignore essa mensagem.</p>
    <br/> <br/>
    <p>Equipe do Anyges</p>
    </div>

END;

$corpoAltEmail = <<<END
    'Acesse http://localhost/redefinir-senha.php?token=$token para redefinir sua senha.';
END;

$email->enviarEmail($userEmail, $assuntoEmail, $corpoEmail, $corpoAltEmail);

?>