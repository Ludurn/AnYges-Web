<?php


class MensagemErro {

    function exibirMensagemErro($mensagem, $ambiente) {
        if ($ambiente == "restrito") {
            die (<<<END
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="icon" type="image/x-icon" href="../imgs/icons/logo-ico.ico">
                <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
                <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->   
                <link rel="stylesheet" href="../style/css/estiloRecuperacao.css">
                <title>Redefinir senha</title>
            </head>
            <body>
                <div id="containerRecupSenha">
                    <div id="titleRecupSenha">
                        <h2>ERRO</h2>
                    </div>
                    <form method="post" id="formRecupSenha">
                        <div id="picture-box">
                            <div  id="picture-obj">
                                <img src="../imgs/icons/error.png" alt="redefinir senha" style="width: 100%;">
                            </div>
                        </div>
                        <p>$mensagem</p>
                        <br/>
                    </form>
                </div>
            </body>
            </html>
        END);
        } else {
            die (<<<END
            <!DOCTYPE html>
            <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <link rel="icon" type="image/x-icon" href="src/imgs/icons/logo-ico.ico">
                <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->
                <link rel="preconnect" href="https://fonts.googleapis.com">
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                <link href="https://fonts.googleapis.com/css2?family=Inria+Sans&display=swap" rel="stylesheet">
                <!-- LINK PARA ACESSAR A FONTE DA PAGINA -->   
                <link rel="stylesheet" href="./src/style/css/estiloRecuperacao.css">
                <title>Redefinir senha</title>
            </head>
            <body>
                <div id="containerRecupSenha">
                    <div id="titleRecupSenha">
                        <h2>ERRO</h2>
                    </div>
                    <form method="post" id="formRecupSenha">
                        <div id="picture-box">
                            <div  id="picture-obj">
                                <img src="./src/imgs/icons/error.png" alt="redefinir senha" style="width: 100%;">
                            </div>
                        </div>
                        <p>$mensagem</p>
                        <br/>
                    </form>
                </div>
            </body>
            </html>
        END);
        }
    }
    
}

?>