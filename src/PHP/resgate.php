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

        $idCards = $_POST['idCards'];

        //sanitizando o array e preparando pra query
        $idCards = array_filter($idCards, 'is_numeric');
        $idCards = array_map('intval', $idCards);
        $idCardsList = implode(", ", $idCards);
        
        $exec = $pdo->prepare("SELECT SUM(valor) as 'valor pedido' FROM tblCupom WHERE ID_cupom IN ($idCardsList);");
        $exec->execute();
        $valorPedido = $exec->fetchAll(PDO::FETCH_COLUMN);
        $valorPedido = array_sum($valorPedido);
        //print($valorPedido);

        if ($pontuacao >= $valorPedido) {


            $idUser = $pnt->getIdUsuario($pdo, $usuario);
            $dtAtual = date("Y-m-d H:i:s");

            // Realiza o pedido
            $execPed = $pdo->prepare("INSERT INTO tblPedido VALUES (:idUser, CONVERT(datetime, :dtPedido, 120));");
            $execPed->bindValue(":idUser", $idUser);
            $execPed->bindValue(":dtPedido", $dtAtual);
            $execPed->execute();

            $dtExpiracao = date('d/m/Y', strtotime("+120 days"));            
            
            // Realiza o resgate de cada cupom
            foreach($idCards as $idCard) {

                // Gera o codigo do cupom
                $codReg = bin2hex(random_bytes(4));

                $execReg = $pdo->prepare("INSERT INTO tblResgate VALUES (:idCard, (SELECT ID_pedido FROM tblPedido WHERE dt_pedido = CONVERT(datetime, :dtAtual, 120)), :codReg, CONVERT(date, :dtExpiracao), 'N');");
                $execReg->bindValue(":idCard", $idCard);
                $execReg->bindValue(":codReg", $codReg);
                $execReg->bindValue(":dtAtual", $dtAtual);
                $execReg->bindValue(":dtExpiracao", $dtExpiracao);
                $execReg->execute();
            }

            die(json_encode("sucesso"));

        } else {
            die(json_encode("pontuacao insuficiente"));
        }
    } else {
        die(json_encode("desconectado"));
    }
        

?>