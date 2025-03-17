<?php

require("conectarBD.php");

$pdo = conectar();

$tabela = "tblFeedback";

try{
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $nome = htmlspecialchars(trim($_POST['nome']));
        $telefone = htmlspecialchars(trim($_POST['telefone']));
        $cpf = htmlspecialchars(trim($_POST['cpf']));
        $email = htmlspecialchars(trim($_POST['email']));
        $assunto = htmlspecialchars(trim($_POST['assunto']));
        $mensagem = htmlspecialchars(trim($_POST['descricao_feedback']));
        $anexo = htmlspecialchars(trim($_POST['anexo']));
        
            if ($anexo == "") {
                $sql = "INSERT INTO ". $tabela . "(assunto, nome, email, cpf, telefone, anexo, descricao_feedback) VALUES(:assuntoF, :nomeF, :emailF, :cpfF, :telF, :anexoF, :mensagemF);";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro-> bindParam(":anexoF", $anexo, PDO::PARAM_LOB, 0, PDO::SQLSRV_ENCODING_BINARY);
            } else {
                $sql = "INSERT INTO ". $tabela . "(assunto, nome, email, cpf, telefone, anexo, descricao_feedback) VALUES(:assuntoF, :nomeF, :emailF, :cpfF, :telF, :anexoF, :mensagemF);";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro-> bindValue(":anexoF", $anexo);
            }
        
        if (empty($nome) || empty($telefone) || empty($cpf) || empty($email) || empty($assunto) || empty($mensagem)) {
            die (json_encode("Preencher campos obrigatórios", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
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