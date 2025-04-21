<?php


        session_start();

        if (isset($_SESSION['usuario'])) {

                require("Pontuacao.php");
                $pnt = new Pontuacao();

                require("conectarBD.php");

                $pdo=conectar();
        
                $usuario = $_SESSION['usuario'];

                $pontuacao = $pnt->getPontuacao($pdo, $usuario);

                die(json_encode($pontuacao, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        } else {
                die(json_encode(0, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
        }

?>