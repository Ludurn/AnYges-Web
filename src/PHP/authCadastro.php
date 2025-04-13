<?php

require 'Email.php';
$email = new Email();


$token = bin2hex(random_bytes(16));
$token_hash = hash("sha256", $token);

$exec2 = $pdo->prepare("UPDATE tblUsuario SET token_ativacao = :token_hash WHERE email_usuario = :userEmail;");
$exec2->bindValue(":token_hash", $token_hash);
$exec2->bindValue(":userEmail", $novoemail);
$exec2->execute();

$exec3 = $pdo->prepare("SELECT nome_usuario FROM tblUsuario WHERE email_usuario = :userEmail;");
$exec3->bindValue(":userEmail", $novoemail);
$exec3->execute();
$nomeUser = $exec3->fetchAll(PDO::FETCH_COLUMN);
        

$assuntoEmail = "Confirme sua conta";

$corpoEmail = <<<END

    <div style='display: flex; flex-direction: column; text-align: justify; width: fit-content; margin: auto;'>
    
    <div style='text-align: center;'>
    <h1>Confirme sua conta, $nomeUser[0].</h1>
    </div>

    <p>Você está quase lá. Confirme sua conta abaixo para remover quaisquer restrições sobre sua conta Anyges.
    <br/> <br/>
    <div style='margin: auto; text-align: center;'>
    <div style='background-color: #228B22; color: white; text-decoration: none; border-radius: 1rem; padding: 3%; width: 25%; margin: auto;'>
    <a href="http://localhost/confirmar-conta.php?token=$token" style='color: white; text-decoration: none;'><strong>CONFIRMAR CONTA</strong></a>
    </div>
    <br/> <br/>
    <a href="http://localhost/confirmar-conta.php?token=$token">http://localhost/confirmar-conta.php?token=$token</a>
    </div>
    <p>Uma vez que sua conta tenha sido verificada, nós não solicitaremos novamente.</p>
    <br/> <br/>
    <p>Equipe do Anyges</p>
    </div>

END;

$corpoAltEmail = <<<END
    'Acesse http://localhost/confirmar-conta.php?token=$token para confirmar sua conta.';
END;

$email->enviarEmail($novoemail, $assuntoEmail, $corpoEmail, $corpoAltEmail);

?>