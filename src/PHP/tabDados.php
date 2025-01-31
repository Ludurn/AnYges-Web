<?php


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
    };
    $pdo=conectar();
    $tabela = "tblUsuario";

    try{
		session_start();

    	$email = $_SESSION['usuario'];
    	$sql = "SELECT nome_usuario, sobrenome_usuario, cpf, dt_nascimento, telefone_usuario, email_usuario FROM ".$tabela." WHERE email_usuario = :email;";
    	$ponteiro = $pdo->prepare($sql);
    	$ponteiro->bindValue(":email", $email);
    	$ponteiro->execute();
    	$resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultado)>0){
            foreach($resultado as $indice => $conteudo){
                $retorno = [
                     "nome" => $conteudo['nome_usuario'],
                     "sobrenome" => $conteudo['sobrenome_usuario'],
                     "cpf" => $conteudo['cpf'],
                     "nascimento" => $conteudo['dt_nascimento'],
                     "tel" => $conteudo['telefone_usuario'],
                      "email" => $conteudo['email_usuario']
                    ];
                die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));                   
            }

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