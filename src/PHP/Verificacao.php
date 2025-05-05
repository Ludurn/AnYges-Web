<?php


class Verificacao {

    function verificar_email($pdo, $user_email) {

        $exec = $pdo->prepare("SELECT ID_usuario FROM tblUsuario WHERE email_usuario = :user_email");
        $exec-> bindValue(":user_email", $user_email);
        $exec->execute();
        $email = $exec->fetchAll(PDO::FETCH_COLUMN);

        if (count($email) > 0) {
            return false;
        }

        return true;
    }
    
    function verificar_idade($dt_user) {
        date_default_timezone_set('America/Sao_Paulo');

        $anoAtual = date("Y");
        $anoPermitido = $anoAtual - 18;
        $mesPermitido = date("m");
        $diaPermitido = date("d");

        $anoNascUser = substr($dt_user, 0, -6);
        $mesNascUser = substr($dt_user, 5, 2);
        $diaNascUser = substr($dt_user, 8, 2);

        if ($anoNascUser > $anoPermitido) {
            return false;
        } else if ($anoNascUser == $anoPermitido && $mesNascUser > $mesPermitido) {
            return false;
        } else if ($anoNascUser == $anoPermitido && $diaNascUser > $diaPermitido) {
            return false;
        }

        return true;
    }

    function verificar_senha($senha_user) {

        if (strlen($senha_user) < 8) {
            die(json_encode("password error"));
        }

        if (preg_match('/[\s\'"=*;()-]/', $senha_user)) {
            die(json_encode("password char error"));
        }

        return true;
    }

    function verificar_cpf($cpf_user) {
        if (strlen($cpf_user) !== 11) {
            return false;
        }

        return true;
    }
}

?>