<?php

    require("conectarBD.php");

    
    $pdo=conectar();
    $tabela = "tblUsuario";

	$email = $_POST["usuario_email"];

	$exec1 = $pdo->prepare("SELECT token_ativacao, email_usuario FROM tblUsuario WHERE email_usuario = :email;");
	$exec1->bindValue(":email", $email);
	$exec1->execute();
	$dados = $exec1->fetchAll(PDO::FETCH_ASSOC);
	if (count($dados)>0){
		foreach($dados as $indice => $conteudo){
			$usuario = [
				 "token_ativacao" => $conteudo['token_ativacao'],
				 "email_usuario" => $conteudo['email_usuario']
				];
		}
	}


	if (isset($usuario) && $usuario['token_ativacao'] === null) {
		try{
			session_start();
	
			
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
				$retorno = "interromper";
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
	} else {
		die(json_encode("interromper", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
	}

?>	
