<?php

    require("conectarBD.php");

    
    $pdo=conectar();
    $tabela = "tblUsuario";
    try{
		session_start();

    	$email = $_POST["usuario_email"];
        $senha = $_POST["usuario_senha"];
    	$sql = "SELECT * FROM ".$tabela." WHERE email_usuario = :email AND senha_usuario = :senha ;";
    	$ponteiro = $pdo->prepare($sql);
    	$ponteiro->bindValue(":email", $email);
    	$ponteiro->bindValue(":senha", $senha);
    	$ponteiro->execute();
    	$resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultado)>0){
			$_SESSION['usuario'] = $email;
    		$retorno = "prosseguir";
           die(json_encode($retorno));
    	}
    	else{
			$retorno = "Nenhum usuário encontrado!";
		    die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    	};
    }	
    catch(Exception $erro){
        $retorno = [
    		 "nome" =>  $erro->getmessage(),
             "email" => ""
    		       ];
    		   die(json_encode($retorno, 
    		      JSON_UNESCAPED_UNICODE |
    			  JSON_UNESCAPED_SLASHES));		 
    };
?>	
