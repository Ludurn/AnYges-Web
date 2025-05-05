<?php

    $funcao = $_POST['funcao'];


    function editarPerfil() {
            require("conectarBD.php");
            require 'Verificacao.php';
            $vf = new Verificacao();

            $pdo=conectar();

            try {
                session_start();
                $usuario = $_SESSION['usuario'];

                $nome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['nome']);
                $sobrenome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['sobrenome']);
                $cpf = preg_replace('/[^0-9]/', '', $_POST['cpf']);
                $email = filter_input(INPUT_POST,'email', FILTER_SANITIZE_EMAIL);
                $dt = preg_replace('/[^0-9\-]/', '', $_POST['dt']);
                $tel = preg_replace('/[^0-9()\- ]/', '', $_POST['tel']);

                if (!$vf->verificar_cpf($cpf)) {
                    die(json_encode("cpf error"));
                }
        
                if (!$vf->verificar_idade($dt)) {
                    die(json_encode("age error"));
                }
    
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

    function excluirPerfil() {
        require("conectarBD.php");
        $pdo=conectar();

        try {
            session_start();
            $usuario = $_SESSION['usuario'];

            $sql = "DELETE FROM tblUsuario WHERE email_usuario = :usuario;";
            $ponteiro = $pdo->prepare($sql);
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
        excluirPerfil();
    }


?>