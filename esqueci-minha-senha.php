<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Esqueci minha senha</title>
</head>
<body>
    <form method="post" style="width: fit-content; margin: auto; margin-top: 20%;">
        <h1>Redefina sua senha</h1>
        <p>Perdeu sua senha? Basta inserir seu endereço email. Você receberá um link para redefinir sua senha via email.</p>
        <label>Email<span style='color: red;'>*</span></label>
        <br/>
        <input type="email" name="email" />
        <br/><br/> 
        <input type="submit" value="Refinir senha">
        <a href="index.html"><input type="button" value="Cancelar"></a>
    </form>
    <?php
        if ($_POST) {

            $email = filter_input(INPUT_POST,'email', FILTER_SANITIZE_EMAIL);

            if (filter_var($email, FILTER_VALIDATE_EMAIL)) {

                require "src/PHP/conectarBD.php";

                $pdo = conectar();
    
                $tabela = "tblUsuario";
    
                $userEmail = $email;
    
                $sql = "SELECT email_usuario FROM ".$tabela." WHERE email_usuario = :email;";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro->bindValue(":email", $userEmail);
                $ponteiro->execute();
                $resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);
    
                if (count($resultado)>0){
                    echo "<script>alert('Mensagem enviada, por favor verifique sua caixa de entrada.')</script>";
                    require "src/PHP/enviarRecupSenha.php";
                }
                else{
                    echo "<script>alert('Mensagem enviada, por favor verifique sua caixa de entrada.')</script>";
                };
            } else {
                echo "<script>alert('Preencha o campo com um email válido.')</script>";
            }
        }
    ?>
</body>
</html>