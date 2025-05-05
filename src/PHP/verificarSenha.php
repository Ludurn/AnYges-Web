<?php

    require("conectarBD.php");
    require 'Verificacao.php';
    $vf = new Verificacao();

    $pdo=conectar();

    try {

        session_start();
        $usuario = $_SESSION['usuario'];

        $senhaUser = $_POST['senhaUser'];

        $vf->verificar_senha($senhaUser);

        $sql = "SELECT senha_usuario FROM tblUsuario WHERE email_usuario = :usuario";
        $ponteiro = $pdo->prepare($sql);
        $ponteiro->bindValue(":usuario", $usuario);
        $ponteiro->execute();
        $resultado = $ponteiro->fetchAll(PDO::FETCH_COLUMN);

        if (count($resultado)>0) {
            $senha_bd = $resultado[0];
            if (password_verify($senhaUser, $senha_bd)) {
                $retorno = "prosseguir";
                die(json_encode($retorno));
            } else {
                interromper();
            }
        }
        else{
            interromper();
        };
    } catch (Exception $error) {
        $retorno = $error->getmessage();
        die(json_encode($retorno));
    }

    function interromper() {
        die(json_encode("interromper", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }

?>