<?php

    require("conectarBD.php");
    require 'Verificacao.php';
    $vf = new Verificacao();

    $pdo = conectar();

    $tabela = "tblUsuario";

    // Inclusão de dados

    try{

        
        $novonome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['nome_user']); // PERMITE OS DIVERSOS ALFABETOS E APOSTROFO
    	$novosobrenome = preg_replace('/[^\p{L}\s\-\']/u', '', $_POST['sobrenome_user']);
    	$novocpf = preg_replace('/[^0-9]/', '', $_POST['cpf_user']);
        $novonascimento = preg_replace('/[^0-9\-]/', '', $_POST['nascimento_user']);
    	$novotelefone = preg_replace('/[^0-9()\- ]/', '', $_POST['telefone_user']);
        $novoemail = filter_input(INPUT_POST,'email_user', FILTER_SANITIZE_EMAIL);
        $novasenha = $_POST['senha_user'];

        if (!$vf->verificar_cpf($novocpf)) {
            die(json_encode("cpf error"));
        }

        $vf->verificar_senha($novasenha);

        if (!$vf->verificar_idade($novonascimento)) {
            die(json_encode("age error"));
        }

        if (!$vf->verificar_email($pdo, $novoemail)) {
            die(json_encode("email error"));
        }

        $senha_hash = password_hash($novasenha, PASSWORD_DEFAULT);


        $sql = "INSERT INTO " . $tabela . "(nome_usuario, sobrenome_usuario, cpf, dt_nascimento, telefone_usuario, email_usuario, senha_usuario) VALUES (:nome, :sobrenome, :cpf, :nascimento, :telefone, :email, :senha);";

        $ponteiro = $pdo->prepare($sql);
    
        $ponteiro-> bindValue(":nome", $novonome);
        $ponteiro-> bindValue(":sobrenome", $novosobrenome);
        $ponteiro-> bindValue(":cpf", $novocpf);
        $ponteiro-> bindValue(":nascimento", $novonascimento);
        $ponteiro-> bindValue(":telefone", $novotelefone);
        $ponteiro-> bindValue(":email", $novoemail);
        $ponteiro-> bindValue(":senha", $senha_hash);

        $ponteiro->execute();

        require 'authCadastro.php';

        die(json_encode("Sucesso", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }
    catch (Exception $erro){
    	echo "ATENÇÃO, erro na inclusão no cadastro: " . $erro->getMessage();
    };
?>