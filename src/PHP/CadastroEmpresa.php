<?php


class CadastroEmpresa {

    private $nomeArquivos = [];
    private $transmissao = [];

    function setArquivos($arrayArquivos) {
        $this->nomeArquivos = $arrayArquivos;
    }

    function getArquivos() {
        return $this->nomeArquivos;
    }

    function processarArquivos() {
        $arquivos = $this->getArquivos();

        for ($i=0; $i<count($arquivos); $i++) {
            $nome_indice = $arquivos[$i];

            if (isset($_FILES[$nome_indice])) {
                
                $nome_arquivo = $_FILES[$nome_indice]["name"];
                $tipo_arquivo = $_FILES[$nome_indice]["type"];
                $tamanho_arquivo = $_FILES[$nome_indice]["size"];
                $temp_arquivo = $_FILES[$nome_indice]["tmp_name"];

                if ($tipo_arquivo =='image/png' ||
                $tipo_arquivo =='image/jpeg'||
                $tipo_arquivo =='image/webp' ||
                $tipo_arquivo == 'application/pdf')
                {
                    $tamanho_max = 5 * 1024 * 1024;
                    if ($tamanho_arquivo < $tamanho_max) {
                        $this->transmissao[$i] = fopen($_FILES[$nome_indice]["tmp_name"], 'rb');
                    } else {
                        echo "<script>alert('O tamanho máximo de arquivo suportado é 5MB');</script>";
                        die();
                    }
                } else {
                    echo "<script>alert('Os tipos de arquivos suportados são: png, jpeg, webp e pdf.');</script>";
                    die();
                }
            } else {
                echo "<script>alert('Para enviar o formulário é necessário preencher todos os campos.');</script>";
                die();
            }
        }
    }

    function getStream() {
        return $this->transmissao;
    }

    function bindStream($ponteiro) {
        $stream = $this->getStream();

        for ($count=0; $count < count($stream); $count++) {
            $ponteiro->bindParam(":anexo_".$count, $stream[$count], PDO::PARAM_LOB, 0, PDO::SQLSRV_ENCODING_BINARY);
        }
    }

    function closeStream() {
        $stream = $this->getStream();

        for ($loop=0; $loop < count($stream); $loop++) {
            fclose($stream[$loop]);
        }
    }
}

?>