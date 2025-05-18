<?php
require_once(__DIR__ ."/dompdf/autoload.inc.php");
require __DIR__.'/MensagemErro.php';
$msgErro = new MensagemErro();


//Criando o namespace para evitar erros
use Dompdf\Dompdf;
use Dompdf\Options;

//Criando a instancia a partir da classe Options
$options = new Options();

//Habilitando o acesso a arquivos externos na biblioteca
$options->set('isRemoteEnabled', true);


//Criando a instancia a partir da classe DomPDF
$dompdf = new Dompdf($options);


//Cria buffer de saída
ob_start();

	session_start();

	if (!$_GET || !isset($_GET['num_pedido']) || !isset($_SESSION['usuario'])) {
		$mensagem = "Esse link está inválido ou expirado. Por favor, solicite um novo.";
		$msgErro->exibirMensagemErro($mensagem, "restrito");
	}
    $id_pedido = $_GET['num_pedido'];
    $criarPDF = true;

    require_once("../../pedidoPDF.php");


// Transfere o conteúdo do buffer para variável e elimina
// o buffer
$html = ob_get_clean();

$dompdf->loadHtml($html);

// (Opcional) Tipo do papel e orientação
$dompdf->setPaper('A4', 'portrait');

// Conversão de HTML para PDF
$dompdf->render();

// Geração do arquivo
$dompdf->stream('meuExemplo.pdf');

?>