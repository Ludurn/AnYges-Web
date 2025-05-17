<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Central de Atendimento</title>
    <link rel="icon" type="image/x-icon" href="src/imgs/icons/logo-ico.ico">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
    <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->   
    <link rel="stylesheet" href="./src/style/css/estiloCentral.css">
    <link rel="stylesheet" href="./src/style/css/estiloHeader.css">
    <link href="https://unpkg.com/ionicons@4.5.10-0/dist/css/ionicons.min.css" rel="stylesheet">
    <script type="text/javascript" src="./src/JS/jquery-3.7.1.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.js"></script>
    <script type="text/javascript" src="./src/JS/funcoes.js"></script>
    <script type="text/javascript" src="./src/JS/session.js"></script>
    <script type="text/javascript" src="./src/JS/pesquisa.js"></script>
    <script type="text/javascript" src="./src/JS/resgate.js"></script>
    <script type="text/javascript" src="./src/JS/contato.js"></script>
    <!-- <script type="text/javascript" src="./src/JS/carrinho.js"></script> -->
    <script>
        function toggleAnswer(id) {
            var answer = document.getElementById(id);
            $("#"+id).fadeToggle();
        }
    </script>
</head>
<body onclick="menuFadeOut();" onload="exibirPontos();">
    <header>
        <div id="logo-box">
            <a href="home.html"><img src="./src/imgs/logoTitle.png" alt="logo" style="width: 100%;" id="logo-login"></a>
        </div>
        <div id="search-box">
            <input type="text" placeholder="O que você está buscando?" id="inputSearch" class="inputSearchClass" onkeydown="redirecionarPesquisa();">
            <button id="lupa" class="lupaClass"  onclick="redirecionarPesquisa('sim');"></button>
        </div>
        <nav>
            <div class="menuDrop">
                <button id="btnMenu" onclick="menuFadeIn();">Menu</button>              
                <div id="menuDropBG">
                    <a href="./home.html">
                        <ion-icon name="home"></ion-icon> Home</a>
                    <a onclick="acessarPerfil()" style="cursor: pointer;">        
                        <ion-icon name="person"></ion-icon> Perfil</a>
                    <a id="carrinhoMobile" href="./carrinho.html">
                        <img id ="iconeCarrinho" src="./src/imgs/icons/carrinho_icon.png" alt="Ícone de um pequeno carrinho de compras"> Carrinho </a>
                    <a href="#">
                        <ion-icon name="hand"></ion-icon> Acessibilidade</a>
                                </div>
                                </div>
                                <a id="btnLogin" href="./index.html"><button class="botaoNav login">Login</button></a>
                                <a id="btnCadastro" href="./cadastro.html" target="_self" rel="external"><button class="botaoNav registrar">Cadastrar</button></a>
                                <!-- A chamada "ativarCarinho()" vem do arquivo "carrinho.js" -->
                                <button id="btnCarrinho" class="botaoNav carrinho"><a href="./carrinho.html">Carrinho<img id ="imagemCarrinho" src="./src/imgs/icons/carrinho_icon.png" alt="Ícone de um pequeno carrinho de compras"></a></button>
                            </nav>     
                        </header>
                        <div id="search-box-mobile">
                            <input type="text" placeholder="O que você está buscando?" id="inputSearchMobile" class="inputSearchClass" onkeydown="redirecionarPesquisaMobile();">
                            <button id="lupa" class="lupaClass" onclick="redirecionarPesquisaMobile('sim');"></button>
                        </div>
                        <center><h1 id="colorir1" class="color1">Central de Ajuda</h1>
                        <h3 id="colorir2">Bem-vindo à nossa Central de Ajuda.</h3>
                        <h3 id="colorir3">Aqui você encontra respostas para perguntas comuns e orientações sobre como utilizar nossos serviços.</h3></center>
                        <main id="janela" class="form-container0">
                            <form action="" method="post" enctype="multipart/form-data" class="form-container" id="form-container">
                            <input type="hidden" name="MAX_FILE_SIZE" value="9000000">
                            <h2 id="colorir4">Contato</h2>
                                <div class="form-group" id="form-group1">
                                    <label for="nomeContato">Nome</label>
                                    <input type="text" id="nomeform" name="nomeContato" class="camposForm"
                                    placeholder="Ex.: João da Silva" maxlength="30">
                                </div>
                                <div class="form-group" id="form-group2">
                                    <label for="telefoneform">Telefone</label>
                                    <input type="tel" id="telefoneform" name="telefone" class="camposForm" onblur="corrigirTellMask();"
                                    placeholder="Ex.: 11 98765-4321" maxlength="13">
                                </div>
                                <div class="form-group" id="form-group3">
                                    <label for="CPFform">CPF (Cadastro de Pessoa Física)</label>
                                    <input type="text" id="CPFform" name="cpf" class="camposForm"
                                    placeholder="Ex.: 123.456.789-12" maxlength="14">
                                </div>
                                <div class="form-group" id="form-group4">
                                    <label for="emailform">E-mail</label>
                                    <input type="email" id="emailform" name="email" class="camposForm"
                                    placeholder="Ex.: joao@gmail.com" maxlength="35">
                                </div>
                                <div class="form-group" id="form-group5">
                                    <label for="assuntoform">Assunto</label>
                                    <select id="assuntoform" name="assunto" class="camposForm">
                                        <option value="">Selecione o assunto</option>
                                        <option value="Ajuda">Ajuda</option>
                                        <option value="Duvidas">Duvidas</option>
                                        <option value="Reclamação">Reclamações</option>
                                        <option value="Outro">Outro</option>
                                    </select>
                                </div>
                                <div class="form-group" id="form-group6">
                                    <label for="mensagemform">Mensagem</label>
                                    <textarea id="mensagemform" name="descricao_feedback"
                                    placeholder="Insira aqui sua mensagem a ser avaliada." cols=30 rows="20"></textarea>
                                    </textarea>
                                </div>
                                <div class="form-group" id="form-group7">
                                    <label for="envioanexo">Envio de Arquivo</label>
                                    <input type="file" accept=".jpg, .png, .jpeg, .webp" id="envioanexo" name="anexo" accept="*/*">
                                </div>
                                <div id="btnEnviar" class="form-group">
                                    <input type="submit"  value="Enviar"/>
                                </div>
                            </form>
                        </div>

                        <div class="helpcontainer" id="helpcontainer">                    
                            <div class="faq-section" id="faq-section">
                                <h2 id="colorir5">Perguntas Frequentes</h2>
                    
                                <div class="faq-item" >
                                    <p class="faq-question" id="question1" onclick="toggleAnswer('answer1')">Como faço para criar uma conta?</p>
                                    <p class="faq-answer" id="answer1">Para criar uma conta, clique em "Cadastrar" no topo da página, preencha as informações solicitadas e siga as instruções para ativar sua conta.</p>
                                </div>
                    
                                <div class="faq-item">
                                    <p class="faq-question" id="question2" onclick="toggleAnswer('answer2')">Esqueci minha senha. O que devo fazer?</p>
                                    <p class="faq-answer" id="answer2">Clique em "Esqueceu a senha?" na tela de login e siga as instruções para redefinir sua senha.</p>
                                </div>
                    
                                <div class="faq-item">
                                    <p class="faq-question" id="question3" onclick="toggleAnswer('answer3')">Como entro em contato com o suporte?</p>
                                    <p class="faq-answer" id="answer3">Você pode entrar em contato com o suporte através da página de contato, preenchendo o formulário com sua mensagem e um membro de nossa equipe responderá em breve.</p>
                                </div>
                    
                                <div class="faq-item">
                                    <p class="faq-question" id="question4" onclick="toggleAnswer('answer4')">Como posso atualizar meus dados de perfil?</p>
                                    <p class="faq-answer" id="answer4">Para atualizar seus dados de perfil, faça login em sua conta, acesse o menu "Perfil" e selecione a opção "Editar".</p>
                                </div>

                                <div class="faq-item">
                                    <p class="faq-question" id="question5" onclick="toggleAnswer('answer5')">Como funciona o sistema de pontuação?</p>
                                    <p class="faq-answer" id="answer5">A pontuação no Anyges é responsável por permitir o resgate de cupons. Assim, para pontuar é necessário doar resíduos farmacológicos
                                        (embalagens de medicamentos e/ou medicamentos fora do prazo de validade) em um centro de tratamento parceiro ao Anyges, que gerará um QR code baseado
                                        na pesagem da doação, no qual ao ser escaneado por um smartphone, fornecerá pontos à conta vinculada no app.
                                    </p>
                                </div>

                                <div class="faq-item">
                                    <p class="faq-question" id="question6" onclick="toggleAnswer('answer6')">Como realizo o resgate de cupons?</p>
                                    <p class="faq-answer" id="answer6">Para realizar o resgate de cupons, primeiramente, é necessário que sua pontuação seja superior ou igual ao valor do cupom; logo, 
                                        ao atender a esse requisito, pressione o botão com o valor do cupom e o adicione no carrinho. Com o item armazenado no carrinho, abra o menu de "Carrinho"
                                        e finalize o pedido.</p>
                                </div>
                                
                            </div>
                        </main>
    
    <script src="https://unpkg.com/ionicons@4.5.10-0/dist/ionicons.js"></script>
    <script type="text/javascript" src="./src/JS/carrinho.js"></script>
</body>
</html>

<?php

        
require(__DIR__."/src/PHP/conectarBD.php");
require(__DIR__."/src/PHP/Verificacao.php");
$vf = new Verificacao();

$pdo = conectar();

$tabela = "tblFeedback";

if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $nome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['nomeContato']);
    $telefone = preg_replace('/[^0-9()\- ]/', '', $_POST['telefone']);
    $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf']);
    $email = filter_input(INPUT_POST,'email', FILTER_SANITIZE_EMAIL);
    $assunto = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['assunto']);
    $mensagem= filter_input(INPUT_POST,'descricao_feedback', FILTER_SANITIZE_SPECIAL_CHARS);

    if (empty($nome) || empty($telefone) || empty($cpf) || empty($email) || empty($assunto) || empty($mensagem)) {
        echo "<script>alert('Todos os campos devem ser preenchidos para realizar o envio.');</script>";
    } else if (!$vf->verificar_cpf($cpf)) {
        echo "<script>alert('O CPF deve conter, estritamente, 11 caracteres.');</script>";
    } else {
        try {
                $sql = "INSERT INTO ". $tabela . "(assunto, nome, email, cpf, telefone, anexo, descricao_feedback, ativo) VALUES(:assuntoF, :nomeF, :emailF, :cpfF, :telF, :anexoF, :mensagemF, 'S');";
            
                $ponteiro = $pdo->prepare($sql);
                $ponteiro-> bindValue(":nomeF", $nome);
                $ponteiro-> bindValue(":cpfF", $cpf);
                $ponteiro-> bindValue(":telF", $telefone);
                $ponteiro-> bindValue(":emailF", $email);
                $ponteiro-> bindValue(":assuntoF", $assunto);
                $ponteiro-> bindValue(":mensagemF", $mensagem);

                if (isset($_FILES["anexo"])) {

                    $nome_arquivo = $_FILES["anexo"]["name"];
                    $tipo_arquivo = $_FILES["anexo"]["type"];
                    $tamanho_arquivo = $_FILES["anexo"]["size"];
                    $temp_arquivo = $_FILES["anexo"]["tmp_name"];

                    if ($tipo_arquivo =='image/png' ||
                    $tipo_arquivo =='image/jpeg'||
                    $tipo_arquivo =='image/webp')
                    {
                        $tamanho_max = 5 * 1024 * 1024;
                        if ($tamanho_arquivo < $tamanho_max) {
                            $stream = fopen($_FILES["anexo"]["tmp_name"], 'rb');
                        } else {
                            echo "<script>alert('O tamanho máximo de arquivo suportado é 5MB');</script>";
                        }
                    }
                }

                $ponteiro->bindParam(":anexoF", $stream, PDO::PARAM_LOB, 0, PDO::SQLSRV_ENCODING_BINARY);
                $ponteiro->execute();
                fclose($stream);
                
                echo "<script>alert('Formulario enviado');</script>";
                echo "<script>location.replace('./home.html');</script>";
        } catch(Exception $erro) {
            echo "ATENÇÃO, erro ao enviar o formulário: ". $erro->getMessage();
        }
    } 
}

?>