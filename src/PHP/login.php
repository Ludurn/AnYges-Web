<?php
    function conectar() {
    
    	$local_server = "";
    	$usuario_server = "";
    	$senha_server = "";
    	$banco_de_dados = "";
    
    	try{
    		$pdo= new PDO("sqlsrv:server=$local_server;database=$banco_de_dados",$usuario_server,$senha_server);
    		return $pdo;
    	}
    	catch(Exception $erro){
    		   echo "ATENÇÃO - ERRO NA CONEXÃO: " . $erro->getMessage();
    		   die;
    	}
    };
    $pdo=conectar();
    $tabela = "tblUsuario";
    try{
    	$email = $_POST["usuario_email"];
        $senha = $_POST["usuario_senha"];
    	$sql = "SELECT * FROM ".$tabela." WHERE email_usuario = :email AND senha_usuario = :senha ;";
    	// $sql = "SELECT * FROM ".$tabela." WHERE senha_usuario = ':senha' ;";
    	$ponteiro = $pdo->prepare($sql);
    	$ponteiro->bindValue(":email", $email);
    	$ponteiro->bindValue(":senha", $senha);
    	$ponteiro->execute();
    	$resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultado)>0){
           foreach($resultado as $indice => $conteudo){
    	     $retorno = ["nome" => $conteudo['nome_usuario'],
               "sobrenome" => $conteudo['sobrenome_usuario'],
               "cpf" => $conteudo['cpf'],
               "telefone" => $conteudo['telefone_usuario'],
               "rua" => $conteudo['rua_usuario'],
               "numero" => $conteudo['numero_usuario'],
               "bairro" => $conteudo['bairro_usuario'],
               "cidade" => $conteudo['cidade_usuario'],
               "estado" => $conteudo['estado_usuario']
           ];
           }
           die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
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
