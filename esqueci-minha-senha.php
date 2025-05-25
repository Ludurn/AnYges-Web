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
    <link rel="stylesheet" href="./src/style/css/estiloAuth.css">
    <title>Esqueci minha senha</title>
</head>
<body>
    <div id="containerRecupSenha">
        <div id="titleRecupSenha">
            <h2>REDEFINA SUA SENHA</h2>
        </div>
        <form method="post" id="formRecupSenha">
            <div id="picture-box">
                <div  id="picture-obj">
                    <img src="./src/imgs/icons/psswordReset02.png" alt="redefinir senha" style="width: 100%;">
                </div>
            </div>
            <br/>
            <p>Perdeu sua senha? Basta inserir seu endereço email. Você receberá um link para redefinir sua senha via email.</p>
            <div id="input-group">
                <label><strong>E-mail:</strong></label>
                <input type="email" placeholder="Ex: Cezarpaulo2323@gmail.com" name="email" />
            </div>
            <br/>
            <input type="submit" value="REDEFINIR SENHA" class="btn-recuperacao">
            <a href="login.html"><input type="button" value="CANCELAR" class="btn-recuperacao"></a>
        </form>
    </div>

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
                    require "src/PHP/recuperaSenha.php";
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