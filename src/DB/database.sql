USE MASTER
go

IF EXISTS(SELECT 1 FROM SYSDATABASES WHERE NAME = 'anyges')
	DROP DATABASE anyges
go

CREATE DATABASE anyges;
go

USE anyges;
go

-- DROP DATABASE anyges

SET DATEFORMAT DMY;
go

-- Funcionario

CREATE TABLE tblFuncionario (
	ID_funcionario numeric(6) not null PRIMARY KEY identity(1,1),
	codigo_func varchar(15),
	senha_func varchar(15),
	cargo_func varchar(50)
);
CREATE INDEX xFuncionario ON tblFuncionario(ID_funcionario);
go

-- Associacao

CREATE TABLE tblAssociacao (
	ID_associacao numeric(6) not null PRIMARY KEY identity(1,1),
	nome_assoc varchar(75) not null,
	CNPJ_assoc varbinary(max) not null,
	contrato_assoc varbinary(max) not null,
	certidao_assoc varbinary(max) not null,
	inscricao_assoc varbinary(max) not null,
	alvara_assoc varbinary(max) not null,
	regularidade_assoc varbinary(max) not null,
	registro_assoc varbinary(max) not null,
	codigo_assoc varchar(15),
	senha_assoc varchar(15),
	email_assoc varchar(75),
	aprovada_assoc char(1) not null
);
CREATE INDEX xAssociacao ON tblAssociacao(ID_associacao);
go

-- Cupom

CREATE TABLE tblCupom (
	ID_cupom numeric(6) not null PRIMARY KEY identity(1,1),
	ID_associacao numeric(6) FOREIGN KEY REFERENCES tblAssociacao(ID_associacao) not null,
	nome_cupom varchar(25) not null,
	disponivel char(1) not null,
	valor numeric (8) not null,
	tipo varchar (25) not null,
	imagem varchar (50) not null,
	descricao_cupom varchar(75) not null,
	desconto numeric(2) not null,
	aprovado char(1) not null
);
CREATE INDEX xCupom ON tblCupom(ID_cupom);
go

-- Local Deposito

CREATE TABLE tblLocalDeposito (
	ID_local_deposito numeric(6) not null PRIMARY KEY identity(1,1),
	nome_depo varchar(75) not null,
	CNPJ_depo varbinary(max) not null,
	licenca_depo varbinary(max) not null,
	alvara_depo varbinary(max) not null,
	certificacao_depo varbinary(max) not null,
	comprovante_depo varbinary(max) not null,
	codigo_depo varchar(15),
	senha_depo varchar(15),
	email_depo varchar(75),
	aprovado_depo char(1) not null
);
CREATE INDEX xLocalDeposito ON tblLocalDeposito(ID_local_deposito);
go

-- Usu�rio

CREATE TABLE tblUsuario (
	ID_usuario numeric(6) not null PRIMARY KEY identity(1,1),
	nome_usuario varchar(50) not null,
	sobrenome_usuario varchar(50) not null,
	cpf varchar(14) not null,
	telefone_usuario varchar(18) not null,
	email_usuario varchar(100) not null,
	senha_usuario varchar(15) not null,
	dt_nascimento date not null
);
CREATE INDEX xUsuario ON tblUsuario(ID_usuario);
go

-- Feedback

CREATE TABLE tblFeedback (
	ID_feedback numeric(6) not null PRIMARY KEY identity(1,1),
	assunto varchar(50) not null,
	nome varchar(75),
	email varchar(100) not null,
	cpf varchar(14) not null,
	telefone varchar(18) not null,
	anexo varbinary(max),
	descricao_feedback varchar(350) not null
);
CREATE INDEX xFeedback ON tblFeedback(ID_feedback);
go

-- Doacao

CREATE TABLE tblDoacao (
	ID_doacao numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) not null,
	ID_local_deposito numeric(6) FOREIGN KEY REFERENCES tblLocalDeposito(ID_local_deposito) not null,
	dt_doacao datetime not null,
	pontuacao numeric(8) not null,
	peso numeric(6) not null,
	descricao_doacao varchar(75)
);
CREATE INDEX xDoacao ON tblDoacao(ID_doacao);
go

-- Pedido

CREATE TABLE tblPedido (
	ID_pedido numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) not null,
	dt_pedido datetime not null
);
CREATE INDEX xPedido ON tblPedido(ID_pedido);
go

-- Resgate

CREATE TABLE tblResgate (
	ID_resgate numeric(6) not null PRIMARY KEY identity(1,1),
	ID_cupom numeric(6) FOREIGN KEY REFERENCES tblCupom(ID_cupom) not null,
	ID_pedido numeric(6) FOREIGN KEY REFERENCES tblPedido(ID_pedido) not null,
	qtde_resgate int not null,
	codigo_resgate numeric(8) not null
);
CREATE INDEX xResgate ON tblResgate(ID_resgate);
go

-- Associacao cupom

CREATE TABLE tblAssociacaoCupom (
	ID_associacao_cupom numeric(6) not null PRIMARY KEY identity(1,1),
	ID_associacao numeric (6) FOREIGN KEY REFERENCES tblAssociacao(ID_associacao) not null,
	ID_cupom numeric(6) FOREIGN KEY REFERENCES tblCupom(ID_cupom) not null,
	qtde_estoque int
);
CREATE INDEX xAssociaoCupom ON tblAssociacaoCupom(ID_associacao_cupom);
go

-- COMANDOS --

INSERT INTO tblAssociacao VALUES ('Promofarma', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'pr0m0', 'f4rm4', 'promofarma@gmail.com', 's');
INSERT INTO tblAssociacao VALUES ('Unimed', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'un1', 'm3d', 'unimed@hotmail.com', 's');
INSERT INTO tblAssociacao VALUES ('Hospital das Cl�nicas', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'h0sp1tal', 'cl1n1c4', 'hc@outlook.com', 's');
INSERT INTO tblAssociacao VALUES ('Amil', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'am1l', 'am1l', 'amil@outlook.com', 's');
INSERT INTO tblAssociacao VALUES ('S�rio Liban�s', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 's1r1o', 'l1b4n3s', 'siriolib@hotmail.com', 's');
go


SELECT ID_associacao, nome_assoc, codigo_assoc, senha_assoc, email_assoc, aprovada_assoc FROM tblAssociacao;

INSERT INTO tblCupom VALUES (1, 'Rivotril', 'S', 12000, 'medicamento', './src/imgs/cupons/rivotril.png', 'Suspens�o Oral', 25, 'S');
INSERT INTO tblCupom VALUES (2, 'Pediatra', 'S', 25000, 'consulta', './src/imgs/cupons/unimed.png', 'Ter�a-feira e Quinta-feira', 25, 'S');
INSERT INTO tblCupom VALUES (3, 'Psic�loga', 'S', 27000, 'consulta', './src/imgs/cupons/hc.png', 'Domingo � Quarta-feira', 25, 'S');
INSERT INTO tblCupom VALUES (1, 'Paracetamol 750mg', 'S', 12000, 'medicamento', './src/imgs/cupons/paracetamol.jpg', 'Comprimido Revestido', 25, 'S');
INSERT INTO tblCupom VALUES (4, 'Cl�nico Geral', 'S', 12000, 'consulta', './src/imgs/cupons/amil.jpg', 'Ter�a-feira e Sexta-feira', 25, 'S');
INSERT INTO tblCupom VALUES (5, 'Gastroenterologista', 'S', 12000, 'consulta', './src/imgs/cupons/sirio.jpg', 'Quarta-feira � Sexta-feira', 25, 'S');
INSERT INTO tblCupom VALUES (1, 'Dove 72h 150ml', 'S', 12000, 'beleza/higiene', './src/imgs/cupons/dove.webp', 'Desodorante Aerosol', 25, 'S');
INSERT INTO tblCupom VALUES (1, 'Sabonete L�quido Infantil', 'S', 12000, 'beleza/higiene', './src/imgs/cupons/sabonete.png', 'Granado Tradicional 500ml', 25, 'S');
go

INSERT INTO tblUsuario VALUES ('Daniel', 'da Cruz', '332787445987', '(11) 76327-9809', 'daniel@hotmail.com', 'dandan', '18-12-1990');
go

SELECT * FROM tblCupom;
SELECT * FROM tblUsuario;
go

SELECT MAX(ID_cupom) as 'idMax' FROM tblCupom;

SELECT ID_cupom as 'idMedicamento' FROM tblCupom WHERE tipo = 'medicamento';

SELECT nome_cupom, valor, (SELECT nome_assoc FROM tblAssociacao WHERE ID_associacao IN (SELECT ID_associacao FROM tblCupom WHERE ID_cupom=5)) as 'nome_associacao',tipo, imagem, descricao_cupom FROM tblCupom WHERE ID_cupom = 5;

UPDATE tblUsuario SET nome_usuario = 'Roberto', sobrenome_usuario = 'da Luz', cpf = '23232', email_usuario = 'daniel@hotmail.com', dt_nascimento = '1990-12-18' WHERE email_usuario = 'daniel@hotmail.com';

UPDATE tblUsuario SET nome_usuario = 'Caz�' WHERE email_usuario = 'daniel@hotmail.com';

SELECT email_usuario FROM tblUsuario WHERE email_usuario = 'daniel@hotmail.com' AND senha_usuario = 'dandan';
