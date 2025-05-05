<?php

    require("conectarBD.php");
	require 'Verificacao.php';
    $vf = new Verificacao();

    
    $pdo=conectar();
    $tabela = "tblUsuario";

	$email = filter_input(INPUT_POST,'usuario_email', FILTER_SANITIZE_EMAIL);

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

			$vf->verificar_senha($senha);

			$sql = "SELECT senha_usuario FROM ".$tabela." WHERE email_usuario = :email;";
			$ponteiro = $pdo->prepare($sql);
			$ponteiro->bindValue(":email", $email);
			$ponteiro->execute();
			$resultado = $ponteiro->fetchAll(PDO::FETCH_COLUMN);
	
			if (count($resultado)>0){
				$senha_bd = $resultado[0];
				if (password_verify($senha, $senha_bd)) {
					$_SESSION['usuario'] = $email;
					$retorno = "prosseguir";
				   die(json_encode($retorno));
				} else {
					interromper();
				}
			}
			else{
				interromper();
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
		interromper();
	}

	function interromper() {
		die(json_encode("interromper", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
	}

?>	
