<?php    
    function conectar() {
        $local_server = '';
        $usuario_server = '';
        $senha_server = '';
        $banco_de_dados = '';

        try {
            $pdo = new PDO("sqlsrv:server=$local_server;database=$banco_de_dados", $usuario_server, $senha_server);
            return $pdo;
        } catch (Exception $er) {
            echo "ATENÇÃO - ERRO NA CONEXÃO: " . $er -> getMessage();
            die;
        }
    }

    $pdo = conectar();

    $tabela = "tblUsuario";

    // Inclusão de dados

    try{
        $novonome = $_POST["nome_user"];
    	$novosobrenome = $_POST["sobrenome_user"];
    	$novocpf = $_POST["cpf_user"];
    	$novotelefone = $_POST["telefone_user"];
        $novoemail = $_POST["email_user"];
        $novasenha = $_POST["senha_user"];
        $novoestado = $_POST["estado_user"];
        $novacidade = $_POST["cidade_user"];
        $novobairro = $_POST["bairro_user"];
        $novarua = $_POST["rua_user"];
        $novonumero = $_POST["numero_user"];

    	$sql = "INSERT INTO " . $tabela . "(nome_usuario, sobrenome_usuario, cpf, telefone_usuario, email_usuario, senha_usuario, rua_usuario, numero_usuario, bairro_usuario, cidade_usuario, estado_usuario) VALUES (:nome, :sobrenome, :cpf, :telefone, :email, :senha, :rua, :numero, :bairro, :cidade, :estado);";

    	$ponteiro = $pdo->prepare($sql);
    
        $ponteiro-> bindValue(":nome", $novonome);
        $ponteiro-> bindValue(":sobrenome", $novosobrenome);
        $ponteiro-> bindValue(":cpf", $novocpf);
        $ponteiro-> bindValue(":telefone", $novotelefone);
        $ponteiro-> bindValue(":email", $novoemail);
        $ponteiro-> bindValue(":senha", $novasenha);
        $ponteiro-> bindValue(":rua", $novarua);
        $ponteiro-> bindValue(":numero", $novonumero);
        $ponteiro-> bindValue(":bairro", $novobairro);
        $ponteiro-> bindValue(":cidade", $novacidade);
        $ponteiro-> bindValue(":estado", $novoestado);

    	$ponteiro->execute();

        /*
        header('Location: cadastroSucesso.html');
    	exit;
        */
    	die(json_encode("Sucesso ao realizar o cadastro!", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }
    catch (Exception $erro){
    	echo "ATENÇÃO, erro na inclusão no cadastro: " . $erro->getMessage();
    };
?>