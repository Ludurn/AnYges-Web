<?php

require("conectarBD.php");
require 'Verificacao.php';
$vf = new Verificacao();

$pdo = conectar();

$tabela = "tblFeedback";

try{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['nome']);
        $telefone = preg_replace('/[^0-9()\- ]/', '', $_POST['telefone']);
        $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf']);
        $email = filter_input(INPUT_POST,'email', FILTER_SANITIZE_EMAIL);
        $assunto = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['assunto']);
        $mensagem= filter_input(INPUT_POST,'descricao_feedback', FILTER_SANITIZE_SPECIAL_CHARS); 
        $anexo = htmlspecialchars(trim($_POST['anexo']));

        if (empty($nome) || empty($telefone) || empty($cpf) || empty($email) || empty($assunto) || empty($mensagem)) {
            die (json_encode("Preencher campos obrigatórios", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        }

        if (!$vf->verificar_cpf($cpf)) {
            die(json_encode("cpf error"));
        }
        
            if ($anexo == "") {
                $sql = "INSERT INTO ". $tabela . "(assunto, nome, email, cpf, telefone, anexo, descricao_feedback) VALUES(:assuntoF, :nomeF, :emailF, :cpfF, :telF, :anexoF, :mensagemF);";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro-> bindParam(":anexoF", $anexo, PDO::PARAM_LOB, 0, PDO::SQLSRV_ENCODING_BINARY);
            } else {
                $sql = "INSERT INTO ". $tabela . "(assunto, nome, email, cpf, telefone, anexo, descricao_feedback) VALUES(:assuntoF, :nomeF, :emailF, :cpfF, :telF, :anexoF, :mensagemF);";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro-> bindValue(":anexoF", $anexo);
            }
        
        $ponteiro-> bindValue(":nomeF", $nome);
        $ponteiro-> bindValue(":cpfF", $cpf);
        $ponteiro-> bindValue(":telF", $telefone);
        $ponteiro-> bindValue(":emailF", $email);
        //$ponteiro-> bindValue(":anexoF", $anexo);
        $ponteiro-> bindValue(":assuntoF", $assunto);
        $ponteiro-> bindValue(":mensagemF", $mensagem);

        $ponteiro->execute();
        
        die(json_encode("Formulário enviado"));

    
    } else {
        echo "Método de requisição inválido.";
        die(json_encode("Envio repetido"));
    }
}
catch(Exception $erro){
    echo "ATENÇÃO, erro ao enviar o formulário: ". $erro->getMessage();
}
?>