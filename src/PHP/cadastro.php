<?php

    date_default_timezone_set('America/Sao_Paulo');

    function conectar() {
        try {
            $localServer = "DESKTOP-GARBFV9";
            $dbName = "anyges";
            $userName = "sa";
            $userPsswrd = "etesp";
            $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
            return $pdo;
        } catch (Exception $error) {
            echo "Erro na conexão com o BD ". $error->getMessage();
            die;
        }
    }

    $pdo = conectar();

    $tabela = "tblUsuario";

    // Inclusão de dados

    try{
        $anoAtual = date("Y");
        $anoPermitido = $anoAtual - 18;
        $mesPermitido = date("m");
        $diaPermitido = date("d");

        $novonome = $_POST["nome_user"];
    	$novosobrenome = $_POST["sobrenome_user"];
    	$novocpf = $_POST["cpf_user"];
        $novonascimento = $_POST["nascimento_user"];
    	$novotelefone = $_POST["telefone_user"];
        $novoemail = $_POST["email_user"];
        $novasenha = $_POST["senha_user"];

        $anoNascUser = substr($_POST["nascimento_user"], 0, -6);
        $mesNascUser = substr($_POST["nascimento_user"], 5, 2);
        $diaNascUser = substr($_POST["nascimento_user"], 8, 2);

        if ($anoNascUser > $anoPermitido) {
            die(json_encode("idade nao permitida"));
        } else if ($anoNascUser == $anoPermitido && $mesNascUser > $mesPermitido) {
            die(json_encode("idade nao permitida"));
        } else if ($anoNascUser == $anoPermitido && $diaNascUser > $diaPermitido) {
            die(json_encode("idade nao permitida"));
        } else {
            $sql = "INSERT INTO " . $tabela . "(nome_usuario, sobrenome_usuario, cpf, dt_nascimento, telefone_usuario, email_usuario, senha_usuario) VALUES (:nome, :sobrenome, :cpf, :nascimento, :telefone, :email, :senha);";

            $ponteiro = $pdo->prepare($sql);
        
            $ponteiro-> bindValue(":nome", $novonome);
            $ponteiro-> bindValue(":sobrenome", $novosobrenome);
            $ponteiro-> bindValue(":cpf", $novocpf);
            $ponteiro-> bindValue(":nascimento", $novonascimento);
            $ponteiro-> bindValue(":telefone", $novotelefone);
            $ponteiro-> bindValue(":email", $novoemail);
            $ponteiro-> bindValue(":senha", $novasenha);
    
            $ponteiro->execute();
    
            die(json_encode("Sucesso ao realizar o cadastro!", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        }
    }
    catch (Exception $erro){
    	echo "ATENÇÃO, erro na inclusão no cadastro: " . $erro->getMessage();
    };
?>