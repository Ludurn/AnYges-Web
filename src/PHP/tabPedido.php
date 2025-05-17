<?php


    require("conectarBD.php");

    $pdo=conectar();

    try{
		session_start();

    	$email = $_SESSION['usuario'];
    	$sql = "SELECT ID_pedido, CONVERT(varchar, dt_pedido, 103) AS 'dt_pedido', (SELECT SUM(valor) FROM tblCupom WHERE ID_cupom IN (SELECT ID_cupom FROM tblResgate WHERE ID_pedido = p.ID_pedido)) AS 'valor_pedido' FROM tblPedido p WHERE ID_usuario IN (SELECT ID_usuario FROM tblUsuario WHERE email_usuario = :email)";
    	$ponteiro = $pdo->prepare($sql);
    	$ponteiro->bindValue(":email", $email);
    	$ponteiro->execute();
    	$resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

        if (count($resultado)>0){
            die(json_encode($resultado, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    	}
    	else{
			$retorno = "Sem registro";
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