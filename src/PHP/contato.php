<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = htmlspecialchars(trim($_POST['nome']));
    $email = htmlspecialchars(trim($_POST['email']));
    $assunto = htmlspecialchars(trim($_POST['assunto']));
    $mensagem = htmlspecialchars(trim($_POST['mensagem']));

    if (empty($nome) || empty($email) || empty($assunto) || empty($mensagem)) {
        echo "Todos os campos são obrigatórios.";
        exit;
    }

    $to = "seuemail@dominio.com"; // substituir pelo endereço que recebera as mensagens...
    $subject = "Nova mensagem de contato: $assunto";
    $body = "Nome: $nome\nEmail: $email\nAssunto: $assunto\nMensagem:\n$mensagem";
    $headers = "De: $email";
//envio do email...
    if (mail($to, $subject, $body, $headers)) {
        echo "Mensagem enviada com sucesso!";
    } else {
        echo "Erro ao enviar a mensagem. Tente novamente mais tarde.";
    }
} else {
    echo "Método de requisição inválido.";
}
?>