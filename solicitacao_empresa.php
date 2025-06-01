<?php

    if (!isset($_GET['t'])) {
        require 'src/PHP/MensagemErro.php';
		$msgErro = new MensagemErro();
		session_start();
		$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
		$msgErro->exibirMensagemErro($mensagem, "");
    }

    $tipo = $_GET['t'];

    if ($tipo == "associacao") {
        $conteudo_form = <<<END
                <input type="hidden" name="MAX_FILE_SIZE" value="5242880">
                <div class="input-group">
                    <label for="nome" class="input-group" ><strong>Nome da Associação:</strong></label>
                    <input type="text" placeholder="" class="camposForm" name="nome" required>
                </div>
                <div class="input-group">
                    <label for="email" class="input-group" ><strong>Email da Associação:</strong></label>
                    <input type="email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="cnpj" class="input-group" ><strong>CNPJ:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="cnpj" required>
                </div>
                <div class="input-group">
                    <label for="contrato" class="input-group" ><strong>Contrato Social/Estatuto:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="contrato" required>
                </div>
                <div class="input-group">
                    <label for="certidao" class="input-group" ><strong>Certidão de Regularidade:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="certidao" required>
                </div>
                <div class="input-group">
                    <label for="inscricao" class="input-group" ><strong>Certificado de Inscrição Municipal/Estadual:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="inscricao" required>
                </div>
                <div class="input-group">
                    <label for="alvara" class="input-group" ><strong>Alvará de Funcionamento:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="alvara" required>
                </div>
                <div class="input-group">
                    <label for="regularidade" class="input-group" ><strong>Comprovante de Regularidade Fiscal e Trabalhista:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="regularidade" required>
                </div>           
                <div class="input-group">
                    <label for="registro" class="input-group" ><strong>Registro da Associação em Cartório ou Junta Comercial:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="registro" required>
                </div>
        END;
    } else if ($tipo == "centro_tratamento") {
        $conteudo_form = <<<END
                <input type="hidden" name="MAX_FILE_SIZE" value="5242880">
                <div class="input-group">
                    <label for="nome" class="input-group" ><strong>Nome do Centro de Tratamento:</strong></label>
                    <input type="text" placeholder="" class="camposForm" name="nome" required>
                </div>
                <div class="input-group">
                    <label for="email" class="input-group" ><strong>Email do Centro de Tratamento:</strong></label>
                    <input type="email" name="email" required>
                </div>
                <div class="input-group">
                    <label for="cnpj" class="input-group" ><strong>CNPJ:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="cnpj" required>
                </div>
                <div class="input-group">
                    <label for="licenca" class="input-group" ><strong>Licença Sanitária:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="licenca" required>
                </div>
                <div class="input-group">
                    <label for="alvara" class="input-group" ><strong>Alvará de Funcionamento:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="alvara" required>
                </div>
                <div class="input-group">
                    <label for="certificacao" class="input-group" ><strong>Certificação Técnica:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="certificacao" required>
                </div>
                <div class="input-group">
                    <label for="comprovante" class="input-group" ><strong>Comprovante de Regularidade Fiscal e Trabalhista:</strong></label>
                    <input type="file" accept="image/jpg, image/png, image/jpeg, image/webp, application/pdf" name="comprovante" required>
                </div>           
        END;
    } else {
        require 'src/PHP/MensagemErro.php';
		$msgErro = new MensagemErro();
		session_start();
		$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
		$msgErro->exibirMensagemErro($mensagem, "");
    }


?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
   
    <title>Login</title>
    <link rel="icon" type="image/x-icon" href="src/imgs/icons/logo-ico.ico">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->      
    <link rel="stylesheet" href="./src/style/css/estiloSolicitacao.css">
    <script type="text/javascript" src="./src/JS/jquery-3.7.1.js"></script>
</head>
<body>
    <div id="logo-box">
        <figure id="logo-obj"><img src="./src/imgs/logoTitleBW2.png" alt="logo" style="width: 100%;" id="logo-title"></figure>
        <h2>Preencha este formulário para enviar sua solicitação.</h2>
    </div>
    <div id="login-container">
        <form id="login-form" action="" method="post" enctype="multipart/form-data">
            <?php
                echo $conteudo_form;
            ?>
            <input type="submit" id="btnEnviar" name="btnEnviar" value="ENVIAR"/>
        </form>
    </div>
</body>
</html>

<?php

    if ($_POST) {

        $nome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['nome']);

        if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
            echo"<script>alert('Para enviar o formulário, digite um formato de email válido.')</script>";
            die();
        }

        $email = filter_input(INPUT_POST,'email', FILTER_SANITIZE_EMAIL);

        if (empty($nome) || empty($email)) {
            echo "<script>alert('Para enviar o formulário é necessário preencher os campos de nome e email.');</script>";
            die();
        }

        require __DIR__.'/src/PHP/CadastroEmpresa.php';
        $cdEmpresa = new CadastroEmpresa();

        if ($tipo == "associacao") {
            $arquivos = ["cnpj", "contrato", "certidao", "inscricao", "alvara", "regularidade", "registro"];
            $sql = "INSERT INTO tblAssociacao VALUES (:nome, :anexo_0, :anexo_1, :anexo_2, :anexo_3, :anexo_4, :anexo_5, :anexo_6, :codLogin, :senhaLogin, :email, 'R');";
        } else if ($tipo == "centro_tratamento") {
            $arquivos = ["cnpj", "licenca", "alvara", "certificacao", "comprovante"];
            $sql = "INSERT INTO tblLocalDeposito VALUES (:nome, :anexo_0, :anexo_1, :anexo_2, :anexo_3, :anexo_4, :codLogin, :senhaLogin, :email, 'R');";
        }

        $cdEmpresa->setArquivos($arquivos);

        $cdEmpresa->processarArquivos();

        require(__DIR__."/src/PHP/conectarBD.php");

        $pdo = conectar();

        $ponteiro = $pdo->prepare($sql);
        $ponteiro->bindValue(":nome", $nome);
        $ponteiro->bindValue(":codLogin", gerarCod());
        $ponteiro->bindValue(":senhaLogin", gerarCod());
        $ponteiro->bindValue(":email", $email);

        $cdEmpresa->bindStream($ponteiro);

        $ponteiro->execute();

        $cdEmpresa->closeStream();

        echo "<script>alert('Formulário enviado com sucesso.');</script>";
        echo "<script>window.location.replace('./index.html');</script>";
    }

    function gerarCod() {
    $caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    $codigo = '';
    for ($i = 0; $i < 7; $i++) {
        $codigo .= $caracteres[random_int(0, strlen($caracteres) - 1)];
    }
    return $codigo;
    }

?>
