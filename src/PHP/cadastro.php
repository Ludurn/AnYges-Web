<?php    
    function conectar() {
        try {
            $localServer = "ULTRON";
            $dbName = "Anyges";
            $userName = "sa";
            $userPsswrd = "Eldritch1890";
            $pdo = new PDO("sqlsrv:server=$localServer; database=$dbName;", $userName, $userPsswrd);
            return $pdo;
        } catch (Exception $error) {
            echo "Erro na conexão com o BD ". $error->getMessage();
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

    	$sql = "INSERT INTO " . $tabela . "(nome_usuario, sobrenome_usuario, cpf, telefone_usuario, email_usuario, senha_usuario) VALUES (:nome, :sobrenome, :cpf, :telefone, :email, :senha);";

    	$ponteiro = $pdo->prepare($sql);
    
        $ponteiro-> bindValue(":nome", $novonome);
        $ponteiro-> bindValue(":sobrenome", $novosobrenome);
        $ponteiro-> bindValue(":cpf", $novocpf);
        $ponteiro-> bindValue(":telefone", $novotelefone);
        $ponteiro-> bindValue(":email", $novoemail);
        $ponteiro-> bindValue(":senha", $novasenha);

    	$ponteiro->execute();

    	die(json_encode("Sucesso ao realizar o cadastro!", JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));
    }
    catch (Exception $erro){
    	echo "ATENÇÃO, erro na inclusão no cadastro: " . $erro->getMessage();
    };
?>