<?php

            require("conectarBD.php");
            $pdo=conectar();

            try {

                session_start();
                $usuario = $_SESSION['usuario'];
                $senhaUser = $_POST['senhaUser'];
    
                $sql = "SELECT email_usuario FROM tblUsuario WHERE email_usuario = :usuario AND senha_usuario = :senhaUser";
                $ponteiro = $pdo->prepare($sql);
                $ponteiro->bindValue(":senhaUser", $senhaUser);
                $ponteiro->bindValue(":usuario", $usuario);
                $ponteiro->execute();
                $resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

                if (count($resultado)>0){
                    $retorno = "prosseguir";
                   die(json_encode($retorno));
                }
                else{
                    $retorno = "Nenhum usuário encontrado!";
                    die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
                };
            } catch (Exception $error) {
                $retorno = $error->getmessage();
                die(json_encode($retorno));
            }

?>