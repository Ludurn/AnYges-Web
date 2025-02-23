<?php

    $funcao = $_POST['funcao'];


    function editarPerfil() {
            require("conectarBD.php");
            $pdo=conectar();

            try {
                session_start();
                $usuario = $_SESSION['usuario'];
                $nome = $_POST['nome'];
                $sobrenome = $_POST['sobrenome'];
                $cpf = $_POST['cpf'];
                $email = $_POST['email'];
                $dt = $_POST['dt'];
                $tel = $_POST['tel'];
    
                $sql = "UPDATE tblUsuario SET nome_usuario = :nome, sobrenome_usuario = :sobrenome, cpf = :cpf, email_usuario = :email, dt_nascimento = :dt, telefone_usuario = :tel WHERE email_usuario = :usuario;";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro->bindValue(":nome", $nome);
                $ponteiro->bindValue(":sobrenome", $sobrenome);
                $ponteiro->bindValue(":cpf", $cpf);
                $ponteiro->bindValue(":email", $email);
                $ponteiro->bindValue(":dt", $dt);
                $ponteiro->bindValue(":tel", $tel);
                $ponteiro->bindValue(":usuario", $usuario);
                $ponteiro->execute();
                
                $retorno = "sucesso";
                die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

            } catch (Exception $error) {
                $retorno = $error->getmessage();
                die(json_encode($retorno));
            }
    }

    if ($funcao == "editar") {
        editarPerfil();
    } else if ($funcao == "excluir") {

    }

?>