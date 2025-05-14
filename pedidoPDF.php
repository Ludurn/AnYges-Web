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
	<link rel="stylesheet" href="http://localhost/src/style/css/estiloPedido.css">
</head>
<body>

<h1 class="cabecalho">Pedido </h1>

<table>
	<tr>
       <th>IMAGEM</th>
	   <th>NOME</th>
	   <th>ASSOCIAÇÃO</th>
	   <th>DESCRIÇÃO</th>
	   <th>DESCONTO</th>
	   <th>VALOR</th>
	</tr>


<?php

require "src/PHP/conectarBD.php";

$pdo=conectar();
try{
    $sql = "SELECT TOP 25 c.ID_cupom, c.nome_cupom, a.nome_assoc AS 'nome_associacao', c.valor, c.tipo, c.imagem, c.descricao_cupom, c.desconto FROM tblCupom c INNER JOIN tblAssociacao a ON c.ID_associacao = a.ID_associacao WHERE c.aprovado = 'S' ORDER BY NEWID();";

    $ponteiro = $pdo->prepare($sql);
	$ponteiro->execute();
    $resultado = $ponteiro->fetchAll(PDO::FETCH_ASSOC);

	$endereco = "http://localhost/";

    if (count($resultado) >0){
       foreach($resultado as $indice => $conteudo){

	     echo "<tr>";
		 echo "<td>". "<img src='". $endereco.substr($conteudo["imagem"], 1) ."' class='imgtbl' alt='". $conteudo["nome_cupom"] ."' />" . "</td>";
         echo "<td>". $conteudo["nome_cupom"]. "</td>";
		 echo "<td>". $conteudo["nome_associacao"]. "</td>";
         echo "<td>". $conteudo["descricao_cupom"]. "</td>";
		 echo "<td>". $conteudo["desconto"]. "%</td>";
		 echo "<td>". $conteudo["valor"]. " ₯</td>";
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

date_default_timezone_set('America/Sao_Paulo');

echo "<br /> <br />";
echo "<footer class='rodape'>";
echo "<img src='http://localhost:8080/meuExemploPDF/imagem.jpg' class='imgrodape' alt='php' />";
echo " Gerado em php em " . (new DateTime())->format('d/m/Y h:i:s');
echo "</footer>";

?> 
</body>
</html>