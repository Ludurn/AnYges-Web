<?php

    date_default_timezone_set('America/Sao_Paulo');

    session_start();

    

    if (isset($_SESSION['usuario'])){

        require("Pontuacao.php");
        $pnt = new Pontuacao();

        require("conectarBD.php");

        $pdo=conectar();
        
        $usuario = $_SESSION['usuario'];

        $pontuacao = $pnt->getPontuacao($pdo, $usuario);

        //$idCards = $_POST['idCards'];
        $idCards = [1];

        //sanitizando o array e preparando pra query
        $idCards = array_filter($idCards, 'is_numeric');
        $idCards = array_map('intval', $idCards);
        $idCardsList = implode(", ", $idCards);
        
        $exec = $pdo->prepare("SELECT SUM(valor) as 'valor pedido' FROM tblCupom WHERE ID_cupom IN ($idCardsList);");
        $exec->execute();
        $valorPedido = $exec->fetchAll(PDO::FETCH_COLUMN);
        $valorPedido = array_sum($valorPedido);
        print($valorPedido);

        if ($pontuacao >= $valorPedido) {


            $idUser = $pnt->getIdUsuario($pdo, $usuario);
            $dtAtual = date("Y-m-d H:i:s");

            $execPed = $pdo->prepare("INSERT INTO tblPedido VALUES (:idUser, CONVERT(datetime, :dtPedido, 120));");
            $execPed->bindValue(":idUser", $idUser);
            $execPed->bindValue(":dtPedido", $dtAtual);
            $execPed->execute();

            $dtExpiracao = date('d/m/Y H:i:s', time() + 60 * 30);

            //ARRUMAR
            
            foreach($idCards as $idCard) {
                $execReg = $pdo->prepare("INSERT INTO tblResgate VALUES (:idCard, (SELECT ID_pedido FROM tblPedido WHERE CONVERT(datetime, :dtAtual, 120)), 'CUCUCU', '14-12-2007';");
                $execReg->bindValue(":idCard", $idCard);
                $execReg->bindValue(":dtAtual", $dtAtual);
                //$execReg->bindValue(":dtExpiracao", $dtExpiracao);
                $execReg->execute();
            }

            
        } else {
            die("pontuacao insuficiente");
        }

    } else {
        die("desconectado");
    }
        

?>