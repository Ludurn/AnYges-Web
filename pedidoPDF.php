<?php

	if (!isset($criarPDF)) {
		require 'src/PHP/MensagemErro.php';
		$msgErro = new MensagemErro();
		session_start();
		$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
		$msgErro->exibirMensagemErro($mensagem, "");
	}

	require "src/PHP/conectarBD.php";

	$pdo=conectar();

	$endereco = "http://localhost/";

	if (!$_GET || !isset($_GET['num_pedido']) || !isset($_SESSION['usuario'])) {
		$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
		$msgErro->exibirMensagemErro($mensagem, "");
	}

	$id_pedido = $_GET['num_pedido'];

	try{

		$exec0 = $pdo->prepare("SELECT ID_pedido FROM tblPedido WHERE ID_usuario IN (SELECT ID_usuario FROM tblUsuario WHERE email_usuario = :email_user);");
		$exec0->bindValue(":email_user", $_SESSION['usuario']);
		$exec0->execute();
		$infoAcess = $exec0->fetchAll(PDO::FETCH_COLUMN);

		if (count($infoAcess) > 0) {
			$verificado = false;
			for($i=0; $i<count($infoAcess); $i++) {
				if ($infoAcess[$i] == $id_pedido) {
					$verificado = true;
				}
			}
			if (!$verificado) {
				$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
				$msgErro->exibirMensagemErro($mensagem, "");
			}
		} else{
			$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
			$msgErro->exibirMensagemErro($mensagem, "");
		};
	}	
	catch(Exception $erro){
		echo "ATENÇÃO, erro na consulta: " . 
			$erro->getmessage();
	};

	echo <<<END
	<!DOCTYPE html>
		<html lang="pt-br">
		<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
			<link rel="preconnect" href="https://fonts.googleapis.com">
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
			<link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
			<!-- LINK PARA ACESSAR A FONTE DA PAGINA --> 
			<title>Pedido</title>
			<script type="text/javascript" src="./src/JS/jquery-3.7.1.js"></script>
			<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.15/jquery.mask.js"></script>
			<link rel="stylesheet" href="http://localhost/src/style/css/estiloPedido.css">
		</head>
		<body>
	END;

	try{

		$exec1 = $pdo->prepare("SELECT ID_pedido, CONVERT(varchar, dt_pedido, 103) AS 'dt_pedido' FROM tblPedido WHERE ID_pedido = :num_pedido");
		$exec1->bindValue(":num_pedido", $id_pedido);
		$exec1->execute();
		$infoPedido = $exec1->fetch();

		if (count($infoPedido) > 0) {
			$num_ped = $infoPedido[0];
			$dt_ped = $infoPedido[1];
		} else{
			throw new Exception("Nenhum resultado encontrado");
		};
	}	
	catch(Exception $erro){
		echo "ATENÇÃO, erro na consulta: " . 
			$erro->getmessage();
	};

	try{

		$exec2 = $pdo->prepare("SELECT cpf, nome_usuario, sobrenome_usuario FROM tblUsuario WHERE ID_usuario IN (SELECT ID_usuario FROM tblPedido WHERE ID_pedido = :num_pedido)");
		$exec2->bindValue(":num_pedido", $id_pedido);
		$exec2->execute();
		$infoUser = $exec2->fetch();

		if (count($infoPedido) > 0) {
			$cpf_user = $infoUser[0];
			$nome_user = $infoUser[1];
			$sobrenome_user = $infoUser[2];
		} else{
			throw new Exception("Nenhum resultado encontrado");
		};
	}	
	catch(Exception $erro){
		echo "ATENÇÃO, erro na consulta: " . 
			$erro->getmessage();
	};

	//FORMATA A VARIAVEL PARA CPF
	$cpf_user = substr($cpf_user, 0, 3) . '.' . substr($cpf_user, 3, 3) . '.' . substr($cpf_user, 6, 3) . '-' . substr($cpf_user, 9, 2);

	echo <<<END
		<div id='cabecalho'>
			<h1>Pedido Nº $num_ped de $cpf_user</h1>
			<p>Efetuado por $nome_user  $sobrenome_user </p>
		</div>
	END;


	echo <<<END
	<table>
		<tr>
			<th>IMAGEM</th>
			<th>NOME</th>
			<th>ASSOCIAÇÃO</th>
			<th>DESCONTO</th>
			<th>VALOR</th>
			<th>CÓDIGO DE RESGATE</th>
		</tr>
	END;

	try{
		$sql = "SELECT c.imagem, c.nome_cupom, a.nome_assoc AS 'nome_associacao', c.desconto, c.valor, r.codigo_resgate FROM tblCupom c INNER JOIN tblResgate r ON c.ID_cupom = r.ID_cupom INNER JOIN tblAssociacao a ON c.ID_associacao = a.ID_associacao WHERE r.ID_pedido = :num_pedido";

		$exec3 = $pdo->prepare($sql);
		$exec3->bindValue(":num_pedido", $id_pedido);
		$exec3->execute();
		$infoResgate = $exec3->fetchAll(PDO::FETCH_ASSOC);

		if (count($infoResgate) >0){
		foreach($infoResgate as $indice => $conteudo){

			echo "<tr>";
			echo "<td>". "<img src='". $endereco.substr($conteudo["imagem"], 1) ."' class='imgtbl' alt='". $conteudo["nome_cupom"] ."' />" . "</td>";
			echo "<td>". $conteudo["nome_cupom"]. "</td>";
			echo "<td>". $conteudo["nome_associacao"]. "</td>";
			echo "<td>". $conteudo["desconto"]. "%</td>";
			echo "<td>". $conteudo["valor"]. " ₯</td>";
			echo "<td>". $conteudo["codigo_resgate"]. "</td>";
			echo "</tr>";
		}
		echo "</table>";
		}
		else{
		throw new Exception("Nenhum resultado encontrado");
		};
	}	
	catch(Exception $erro){
		echo "ATENÇÃO, erro na consulta: " . 
			$erro->getmessage();
	};

	echo <<<END
		<br /> <br />
		<footer class='rodape'>
		<img src='$endereco/src/imgs/logoTitleBW.png' class='imgRodape' alt='anyges logo' />
		Pedido realizado em $dt_ped
		</footer>
	END;

	echo <<<END
		</body>
		</html>
	END;
?> 