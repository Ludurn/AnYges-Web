<?php
    
    try {
            require("conectarBD.php");
    
            $pdo=conectar();

            if ($_POST['filtro'] == "medicamento") {
                $sql = "SELECT ID_cupom as 'idMedicamento' FROM tblCupom WHERE tipo = 'medicamento'";
            } else if ($_POST['filtro'] == "consulta") {
                $sql = "SELECT ID_cupom as 'idConsulta' FROM tblCupom WHERE tipo = 'consulta'";
            } else if ($_POST['filtro'] == "beleza") {
                $sql = "SELECT ID_cupom as 'idBeleza' FROM tblCupom WHERE tipo = 'beleza/higiene'";
            }

            $ponteiro = $pdo->prepare($sql);
            $ponteiro->execute();
            $resultado = $ponteiro->fetchAll(PDO::FETCH_COLUMN);
            if (count($resultado)>0){
                    for ($i=0; $i<count($resultado); $i++) {
                        $retorno[$i] = $resultado[$i];
                    }
                }
            die(json_encode($retorno, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

    } catch(Exception $erro) {
            $retorno = $erro->getmessage();
            die(json_encode($retorno));		 
    };
?>