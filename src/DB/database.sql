USE MASTER
go

IF EXISTS(SELECT 1 FROM SYSDATABASES WHERE NAME = 'anyges')
	DROP DATABASE anyges
go

IF EXISTS(SELECT * FROM sys.objects WHERE type = 'P' AND name = 'usp_loginUsuario')
	DROP PROCEDURE usp_loginUsuario
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
	ID_associacao numeric(6) FOREIGN KEY REFERENCES tblAssociacao(ID_associacao) ON DELETE CASCADE not null,
	nome_cupom char(25) not null,
	disponivel char(1) not null,
	valor numeric (8) not null,
	tipo char (25) not null,
	imagem varchar (50) not null,
	descricao_cupom char(75) not null,
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

-- Usuário

CREATE TABLE tblUsuario (
	ID_usuario numeric(6) not null PRIMARY KEY identity(1,1),
	nome_usuario varchar(50) not null,
	sobrenome_usuario varchar(50) not null,
	cpf varchar(14) not null,
	telefone_usuario varchar(18) not null,
	email_usuario varchar(100) not null,
	senha_usuario varchar(255) not null,
	dt_nascimento date not null,
	token_rec_senha varchar(64),
	dt_expiracao_token datetime,
	token_ativacao varchar(64),
	excluido char(1) not null
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
	descricao_feedback varchar(350) not null,
	ativo char(1) not null
);
CREATE INDEX xFeedback ON tblFeedback(ID_feedback);
go

-- Doacao

CREATE TABLE tblDoacao (
	ID_doacao numeric(6) not null PRIMARY KEY identity(1,1),
	ID_funcionario numeric(6) FOREIGN KEY REFERENCES tblFuncionario(ID_funcionario) ON DELETE CASCADE not null,
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) ON DELETE CASCADE ,
	ID_local_deposito numeric(6) FOREIGN KEY REFERENCES tblLocalDeposito(ID_local_deposito) ON DELETE CASCADE not null,
	dt_doacao datetime not null,
	pontuacao numeric(8) not null,
	peso numeric(6) not null,
	descricao_doacao varchar(75),
	qr_code varchar(10) 
);
CREATE INDEX xDoacao ON tblDoacao(ID_doacao);
go

-- Pedido

CREATE TABLE tblPedido (
	ID_pedido numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) ON DELETE CASCADE not null,
	dt_pedido datetime not null
);
CREATE INDEX xPedido ON tblPedido(ID_pedido);
go

-- Resgate

CREATE TABLE tblResgate (
	ID_resgate numeric(6) not null PRIMARY KEY identity(1,1),
	ID_cupom numeric(6) FOREIGN KEY REFERENCES tblCupom(ID_cupom) ON DELETE CASCADE not null,
	ID_pedido numeric(6) FOREIGN KEY REFERENCES tblPedido(ID_pedido) ON DELETE CASCADE not null,
	codigo_resgate char(8) not null,
	dt_expiracao date not null,
	utilizado char(1)
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

INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Guilherme', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depv1la', 'gu1', 'deposito@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Zilda', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depZilda', 'gu2', 'deposito22@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Medeiros', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depMede', 'gu3', 'deposito23@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Nova Galvão', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depNova', 'gu4', 'deposito24@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Maria', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depMaria', 'gu5', 'deposito25@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Formosa', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depFormosa', 'gu6', 'deposito26@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Carrão', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depCarrao', 'gu7', 'deposito27@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Matilde', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depMatilde', 'gu8', 'deposito28@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Prudente', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depPrudente', 'gu9', 'deposito29@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Ema', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depVilaEma', 'gu10', 'deposito30@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Alpina', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depAlpina', 'gu11', 'deposito31@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Aricanduva', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depAricanduva', 'gu12', 'deposito32@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Regente Feijó', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depRegente', 'gu13', 'deposito33@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Bela Vista', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depBelaVista', 'gu14', 'deposito34@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Santa Catarina', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depSantaCat', 'gu15', 'deposito35@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila São José', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depSaoJose', 'gu16', 'deposito36@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Progresso', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depProgresso', 'gu17', 'deposito37@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Industrial', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depIndustrial', 'gu18', 'deposito38@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Rio Branco', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depRioBranco', 'gu19', 'deposito39@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila São Francisco', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depSaoFran', 'gu20', 'deposito40@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila das Mercês', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depMerces', 'gu21', 'deposito41@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Morse', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depMorse', 'gu22', 'deposito42@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Gustavo', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depGustavo', 'gu23', 'deposito43@gmail.com', 'S');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Sabará', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depSabara', 'gu24', 'deposito44@gmail.com', 'R');
INSERT INTO tblLocalDeposito VALUES ('Deposito Vila Clementino', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'depClementino', 'gu25', 'deposito45@gmail.com', 'S');
go

INSERT INTO tblAssociacao VALUES ('Promofarma', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'pr0m0', 'f4rm4', 'promofarma@gmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Unimed', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'un1', 'm3d', 'unimed@hotmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Hospital Presidente', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'h0sp1tal', 'cl1n1c4', 'hc@outlook.com', 'S');
INSERT INTO tblAssociacao VALUES ('Amil', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'am1l', 'am1l', 'amil@outlook.com', 'S');
INSERT INTO tblAssociacao VALUES ('Hospital Sírio-Libanês', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 's1r1o', 'l1b4n3s', 'siriolib@hotmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('Drogasil', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'dr0ga', 's1l', 'drogasil@hotmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Farmais', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'f4r', 'ma15', 'farmais@outlook.com', 'R');
INSERT INTO tblAssociacao VALUES ('Ultrafarma', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'u1tra', 'f4rm4', 'ultrafarma@gmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('Santa Casa', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 's4nt4', 'c4s4', 'santacasa@gmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Bradesco Saúde', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'br4d', 's4ud3', 'bradescosaude@hotmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Hospital Albert Einstein', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, '3inst', '3in', 'einstein@outlook.com', 'R');
INSERT INTO tblAssociacao VALUES ('Droga Raia', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'dr0g4', 'r414', 'droganaia@gmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('SulAmérica Saúde', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'sul4', 'am3r1c4', 'sulamerica@hotmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('Pague Menos', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'p4gu3', 'm3n0s', 'paguemenos@outlook.com', 'S');
INSERT INTO tblAssociacao VALUES ('Hospital Oswaldo Cruz', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, '0sw4ld0', 'cr0z', 'hocruz@gmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('NotreDame Intermédica', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'n0tr3', 'd4m3', 'notredame@hotmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Farmácia Popular', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'f4rm4c14', 'p0p', 'farmaciapop@outlook.com', 'S');
INSERT INTO tblAssociacao VALUES ('Hapvida', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'h4pv1d4', 'h4p', 'hapvida@gmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('Hospital Alemão Oswaldo Cruz', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, '4l3m40', '0sw4ld0', 'haoc@hotmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Biofarmácia', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'b10', 'f4rm4', 'biofarmacia@outlook.com', 'R');
INSERT INTO tblAssociacao VALUES ('Prevent Senior', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'pr3v3nt', 's3n10r', 'preventsenior@gmail.com', 'S');
INSERT INTO tblAssociacao VALUES ('Farmácia Econômica', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, '3c0n0m1c4', 'f4rm4', 'farmaciaeconomica@hotmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('Hospital São Paulo', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 's40', 'p4ul0', 'hospitalsaopaulo@outlook.com', 'S');
INSERT INTO tblAssociacao VALUES ('Greenfarmácia', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'gr33n', 'f4rm4', 'greenfarmacia@gmail.com', 'R');
INSERT INTO tblAssociacao VALUES ('Hospital do Coração', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'c0r4c40', 'h0sp', 'hcor@hotmail.com', 'S');
go

INSERT INTO tblCupom VALUES (1, 'Rivotril', 'S', 8000, 'medicamento', './src/imgs/cupons/rivotril.png', 'Suspensão Oral', 15, 'S');
INSERT INTO tblCupom VALUES (2, 'Pediatra', 'S', 25000, 'consulta', './src/imgs/cupons/unimed.png', 'Terça-feira e Quinta-feira', 20, 'S');
INSERT INTO tblCupom VALUES (3, 'Psicóloga', 'S', 27000, 'consulta', './src/imgs/cupons/hp.jpg', 'Domingo à Quarta-feira', 17, 'S');
INSERT INTO tblCupom VALUES (1, 'Paracetamol 750mg', 'S', 13500, 'medicamento', './src/imgs/cupons/paracetamol.jpg', 'Comprimido Revestido', 35, 'S');
INSERT INTO tblCupom VALUES (4, 'Amil One 1000', 'S', 15000, 'consulta', './src/imgs/cupons/amil.jpg', 'Uma parcela do plano', 5, 'S');
INSERT INTO tblCupom VALUES (5, 'Gastroenterologista', 'S', 11000, 'consulta', './src/imgs/cupons/sirio.jpg', 'Quarta-feira e Sexta-feira', 7, 'S');
INSERT INTO tblCupom VALUES (1, 'Dove 72h 150ml', 'S', 10500, 'beleza/higiene', './src/imgs/cupons/dove.webp', 'Desodorante Aerosol', 20, 'S');
INSERT INTO tblCupom VALUES (1, 'Sabonete Líquido Infantil', 'S', 11000, 'beleza/higiene', './src/imgs/cupons/sabonete.png', 'Granado Tradicional', 12, 'S');
INSERT INTO tblCupom VALUES (1, 'Fralda Pampers XG', 'S', 9000, 'beleza/higiene', './src/imgs/cupons/fraldaPampers.webp', 'Confort Sec', 30, 'S');
INSERT INTO tblCupom VALUES (2, 'Ginecologista', 'S', 22000, 'consulta', './src/imgs/cupons/unimed.png', 'Sexta-feira', 9, 'S');
INSERT INTO tblCupom VALUES (6, 'Dermacitá', 'S', 7000, 'beleza/higiene', './src/imgs/cupons/cremeDemacita.webp', 'Creme para pernas 300ml', 10, 'S');
INSERT INTO tblCupom VALUES (6, 'Omegafor Plus', 'S', 15000, 'medicamento', './src/imgs/cupons/omegafor.webp', 'Suplemento alimentar', 15, 'S');
INSERT INTO tblCupom VALUES (6, 'Principia GL-01', 'S', 9500, 'beleza/higiene', './src/imgs/cupons/principiaGL01.webp', 'Gel de limpeza 350ml', 7, 'S');
INSERT INTO tblCupom VALUES (7, 'Acetilcisteína 600mg', 'S', 6000, 'medicamento', './src/imgs/cupons/acetilcisteina.webp', 'Granulado Sabor Laranja', 12, 'S');
INSERT INTO tblCupom VALUES (7, 'Cimegripe', 'S', 7500, 'medicamento', './src/imgs/cupons/cimegripe.webp', 'Suspensão Oral', 6, 'S');
INSERT INTO tblCupom VALUES (7, 'Plenitud Plus G/XG', 'S', 5500, 'beleza/higiene', './src/imgs/cupons/plenitudPlus.webp', 'Roupa íntima descartável', 15, 'S');
INSERT INTO tblCupom VALUES (4, 'Amil 400', 'S', 12500, 'consulta', './src/imgs/cupons/amil.jpg', 'Uma parcela do plano', 8, 'S');
INSERT INTO tblCupom VALUES (4, 'Amil 700', 'S', 13000, 'consulta', './src/imgs/cupons/amil.jpg', 'Uma parcela do plano', 9, 'S');
INSERT INTO tblCupom VALUES (3, 'Cardiologista', 'S', 24300, 'consulta', './src/imgs/cupons/hp.jpg', 'Segunda-feira', 13, 'S');
INSERT INTO tblCupom VALUES (3, 'Ortopedista', 'S', 22500, 'consulta', './src/imgs/cupons/hp.jpg', 'Domingo e Terça-feira', 20, 'S');
INSERT INTO tblCupom VALUES (5, 'Endocrinologista', 'S', 12500, 'consulta', './src/imgs/cupons/sirio.jpg', 'Quarta-feira', 7, 'S');
INSERT INTO tblCupom VALUES (5, 'Geriatra', 'S', 10700, 'consulta', './src/imgs/cupons/sirio.jpg', 'Segunda-feira à Sábado', 7, 'S');
INSERT INTO tblCupom VALUES (7, 'Melatonina Melyx', 'S', 9200, 'medicamento', './src/imgs/cupons/melatoninaMelyx.jpg', 'Comprimido mastigável 210mcg', 23, 'S');
INSERT INTO tblCupom VALUES (7, 'Leite de Magnésia', 'S', 4500, 'medicamento', './src/imgs/cupons/leiteMagnesia.jpg', 'Phillips  120ml', 19, 'S');
INSERT INTO tblCupom VALUES (7, 'Sulfato Ferroso', 'S', 7200, 'medicamento', './src/imgs/cupons/sulfatoFerroso.jpg', 'Comprimido Sidney Oliveira', 11, 'S');
go


INSERT INTO tblAssociacaoCupom VALUES (1, 1, 5);
INSERT INTO tblAssociacaoCupom VALUES (2, 2, 3);
INSERT INTO tblAssociacaoCupom VALUES (3, 3, 2);
INSERT INTO tblAssociacaoCupom VALUES (1, 4, 7);
INSERT INTO tblAssociacaoCupom VALUES (4, 5, 3);
INSERT INTO tblAssociacaoCupom VALUES (5, 6, 1);
INSERT INTO tblAssociacaoCupom VALUES (1, 7, 32);
INSERT INTO tblAssociacaoCupom VALUES (1, 8, 3);
INSERT INTO tblAssociacaoCupom VALUES (1, 9, 2);
INSERT INTO tblAssociacaoCupom VALUES (2, 10, 14);
INSERT INTO tblAssociacaoCupom VALUES (6, 11, 22);
INSERT INTO tblAssociacaoCupom VALUES (6, 12, 19);
INSERT INTO tblAssociacaoCupom VALUES (6, 13, 88);
INSERT INTO tblAssociacaoCupom VALUES (7, 14, 10);
INSERT INTO tblAssociacaoCupom VALUES (7, 15, 3);
INSERT INTO tblAssociacaoCupom VALUES (7, 16, 5);
INSERT INTO tblAssociacaoCupom VALUES (4, 17, 8);
INSERT INTO tblAssociacaoCupom VALUES (4, 18, 65);
INSERT INTO tblAssociacaoCupom VALUES (3, 19, 22);
INSERT INTO tblAssociacaoCupom VALUES (3, 20, 21);
INSERT INTO tblAssociacaoCupom VALUES (5, 21, 33);
INSERT INTO tblAssociacaoCupom VALUES (5, 22, 14);
INSERT INTO tblAssociacaoCupom VALUES (7, 23, 18);
INSERT INTO tblAssociacaoCupom VALUES (7, 24, 6);
INSERT INTO tblAssociacaoCupom VALUES (7, 25, 9);
go


INSERT INTO tblUsuario VALUES ('Daniel', 'da Cruz', '33278744598', '(11) 76327-9809', 'daniel@hotmail.com', '$2y$10$7AuCvSI/Cg13KW1rD3CKC.dTxzg4oeLG5pevI.NBkUYNCjyi5qrOW', '18-12-1990', NULL, NULL, NULL, 'N'); --senha: danteAl1gu1er3
INSERT INTO tblUsuario VALUES ('Luis', 'Almeida', '82957725909', '(13) 26121-9333', 'luis@gmail.com', '$2y$10$P7zHZL/9cY23W12ZBsnUQuo7kZcYDy6A00SCuRcI6E5PW/OAQp09u', '28-01-2000', NULL, NULL, NULL, 'N'); --senha: 34L99Mnol00nacl
INSERT INTO tblUsuario VALUES ('Luigi', 'Pugh', '82911125231', '(23) 00112-9653', 'luigi.nascimento01@etec.sp.gov.br', '$2y$10$v3MIZtBqEOWEWwgm1cbYvO936VsmMtrHAkeAfOV6ZNRzpCLs3bH62', '30-04-1999', NULL, NULL, NULL, 'N'); --senha: etecsaopaulo
INSERT INTO tblUsuario VALUES ('Maria', 'Silva', '12345678901', '(11) 98765-4321', 'maria@gmail.com', '$2y$12$egGbJ2U09nBr31PA52GrXeJhgEjvzqxNNR/8W.BFd4dqXoRuIRigi', '15-05-1985', NULL, NULL, NULL, 'N'); --senha: Maria@123
INSERT INTO tblUsuario VALUES ('Luiza', 'Azevedo', '91654827355', '(41) 0375-1223', 'pietra04@lima.com', '$2y$12$IZV6noajUpsFqKO9o7KwbOq.LJM0xsxdSbfOf7NBu2SBx08elSuD6', '10-03-1975', NULL, NULL, NULL, 'N'); --senha: SenhaForte!123
INSERT INTO tblUsuario VALUES ('João Felipe', 'Araújo', '65197402849', '(84) 7518-0626', 'rebecada-rocha@lopes.org', '$2y$12$DadwEnBOlQ6VyrOkDfAhe.Ia/blF6zWcP/OX7X4Q.cbF7ZvvutFG.', '20-02-1994', NULL, NULL, NULL, 'N'); --senha: Brasil2022
INSERT INTO tblUsuario VALUES ('Vicente', 'Costa', '12854976002', '(99) 0523-7863', 'davi-luccaviana@yahoo.com.br', '$2y$12$3qMrtreenHuEJ.UlpD7RvOfeCwLrPjFljBfWN7tLCPKNrkRQnri3C', '25-09-2006', NULL, NULL, NULL, 'N'); --senha: qweRTY!@#
INSERT INTO tblUsuario VALUES ('Emilly', 'Nogueira', '27345908674', '(61) 0857-6110', 'melissa39@da.com', '$2y$12$ejdEvbgeP6gVswXEeTk8MOtEV5wvO3DDhZyjgAKpnoj2PVaK7Iz0y', '02-11-1996', NULL, NULL, NULL, 'N'); --senha: Maria2020
INSERT INTO tblUsuario VALUES ('Lara', 'Duarte', '20834971631', '(41) 1993-0420', 'cauada-rocha@gmail.com', '$2y$12$f9KhpHGrS/Q28paaH/DN/eZhVp2lEtpXjAZ5F.JMTfWzQOAe8KCvi', '28-12-1961', NULL, NULL, NULL, 'N'); --senha: Teste1234@
INSERT INTO tblUsuario VALUES ('Carlos Eduardo', 'Cavalcanti', '20708315925', '(61) 31322-0182', 'henrique29@gmail.com', '$2y$12$WMa0c5uJ7oL/YKItBeIJSeRY7VeyYZIfhPnhzkuAjbnFZrLvmqUpe', '22-02-1971', NULL, NULL, NULL, 'N'); --senha: Segredo$2021
INSERT INTO tblUsuario VALUES ('Ingrid', 'Santos', '48126153046', '(31) 5082-6285', 'laura35@terra.com.br', '$2y$12$A/0TgSxT9dUdAjDsKyuhJeJoBt9EFY2zGKnDbidTLD2VWyVG1IShy', '29-08-1988', NULL, NULL, NULL, 'N'); --senha: Futebol10
INSERT INTO tblUsuario VALUES ('Tatiane', 'Silveira', '46215798300', '(43) 68172-4471', 'marcela33@rodrigues.com', '$2y$12$4rsM0PqiRcf3eUr3nWRA0OYRGsfXg9GKrHcMoJ9YjX.nRAcvjKIdy', '07-06-1983', NULL, NULL, NULL, 'N'); --senha: Ver@o2023
INSERT INTO tblUsuario VALUES ('Paulo', 'Martins', '12084309150', '(21) 2090-0881', 'bianca51@hotmail.com', '$2y$12$Zhzvm2AxzEPyjlmGgfIOw.9oUs8oUn6pc7kWnVbEj.CGPXYOLmdUq', '24-09-1999', NULL, NULL, NULL, 'N'); --senha: P4ssword!
INSERT INTO tblUsuario VALUES ('Helena', 'Gonçalves', '54803796115', '(27) 8857-7113', 'analuiza21@gmail.com', '$2y$12$uVauYkK3NzRPzwJWc3hAuOdvrrm7jlR.RZpH0Wq0O7X.ToxqVt1wS', '03-01-1995', NULL, NULL, NULL, 'N'); --senha: Et3c@sp
INSERT INTO tblUsuario VALUES ('Ricardo', 'Freitas', '49062187492', '(24) 2085-1449', 'patricia15@hotmail.com', '$2y$12$av6KHwsWb3jPPbZWu.c7mO9/v14P1rYIljeZ6CD5sZbh9PWBWekH2', '19-07-1980', NULL, NULL, NULL, 'N'); --senha: Aluno2024#
INSERT INTO tblUsuario VALUES ('Aline', 'Teixeira', '52409638768', '(84) 60262-6842', 'raquel.goncalves@hotmail.com', '$2y$12$xdm30fjLF6OS1HQ63VzCKO7dWR7mhEnP1UeMAAw2j5bJ9GNDTSae.', '05-05-1987', NULL, NULL, NULL, 'N'); --senha: Job@123
INSERT INTO tblUsuario VALUES ('Guilherme', 'Pereira', '40729183620', '(17) 49901-2536', 'caio10@terra.com.br', '$2y$12$ZwGULuim7exxXy7OGskQGuZBhECNKhFlWAG8AgKc8QkzEpkBb9A5m', '13-12-1992', NULL, NULL, NULL, 'N'); --senha: Pa$$w0rd2025
INSERT INTO tblUsuario VALUES ('Fernanda', 'Barros', '30986412759', '(81) 4602-9636', 'heloise.rodrigues@terra.com.br', '$2y$12$ENltmXb3Y2L9GikTf7BNYeq1nTq1xCyK7AogOpTv5YJ9YxzqZTb.u', '17-10-1986', NULL, NULL, NULL, 'N'); --senha: Acesso!321
INSERT INTO tblUsuario VALUES ('Thiago', 'Farias', '30924675821', '(11) 3938-1412', 'lucas20@hotmail.com', '$2y$12$LHlKNuyFAyy9Z.k9cs3J2uTnPB8tx1mUpcK8XbI4F2/ugAU17nP/C', '16-11-1982', NULL, NULL, NULL, 'N'); --senha: DadoSeguro!
INSERT INTO tblUsuario VALUES ('Vanessa', 'Lima', '96328047139', '(91) 9054-1340', 'eduarda17@hotmail.com', '$2y$12$huZhkFi/s3PPLy4n74Om7.0Bkr6JP5UPHeZpmaM5bLb5ZOp2IWq6G', '01-08-1990', NULL, NULL, NULL, 'N'); --senha: Confid3ncial
INSERT INTO tblUsuario VALUES ('Bruno', 'Rezende', '20318649285', '(92) 6477-4157', 'rafael42@yahoo.com', '$2y$12$Ct06pLZObv4Tnrm0FrxZy.o9RZOrczhDpZ3OB3d2YcvqkdUTljVHG', '26-03-1984', NULL, NULL, NULL, 'N'); --senha: Admin!@#2023
INSERT INTO tblUsuario VALUES ('Juliana', 'Souza', '58319042617', '(95) 5441-8213', 'camila50@gmail.com', '$2y$12$r3I9C89WwrTHP5IJ0nKzvuH3.DVYvXB7uPbtZ.9N.K9rcFZdVUkqC', '18-06-1978', NULL, NULL, NULL, 'N'); --senha: Usu@rio123
INSERT INTO tblUsuario VALUES ('Marcelo', 'Oliveira', '14079523869', '(96) 2252-1283', 'matheus50@terra.com.br', '$2y$12$0qEk6sm9XJIXiIBcHkOa8e5wCRK4r8S35QYHjcGG0pASslrF4rqna', '09-04-1973', NULL, NULL, NULL, 'N'); --senha: SeguranÇa2024
INSERT INTO tblUsuario VALUES ('Tatiana', 'Rocha', '59172834607', '(85) 9035-8043', 'lais57@hotmail.com', '$2y$12$qyQZRYcWS8zxjYZ0XNIPveZjNDRo6Eji4MS7Fb9fvn5uDJzkx/yHq', '23-01-1968', NULL, NULL, NULL, 'N'); --senha: MyPass!2023
INSERT INTO tblUsuario VALUES ('Felipe', 'Mendes', '45730819694', '(27) 9097-5663', 'geovana50@yahoo.com.br', '$2y$12$eLHHKZzG/E5.0lO1HZauFOLsU9Bnd5eJxbTegA9eFZ3NoCN5Rm.QC', '04-07-1977', NULL, NULL, NULL, 'N'); --senha: T3steT3ste
INSERT INTO tblUsuario VALUES ('Patrícia', 'Cardoso', '70389261015', '(98) 30244-6536', 'leticia.ribeiro@hotmail.com', '$2y$12$uLpc1NvyloOXyYv5xdnFduGHj70FqC2cTR.AJhfC/.c04YI1qil2a', '12-05-1989', NULL, NULL, NULL, 'N'); --senha: Priv4do@!
go

INSERT INTO tblFuncionario VALUES ('prm1rwe', '111', 'gestor de dados');
INSERT INTO tblFuncionario VALUES ('nvweblo', '222', 'atendente centro deposito');
INSERT INTO tblFuncionario VALUES ('johndoe', '333', 'analista de sistemas');
INSERT INTO tblFuncionario VALUES ('mariasilva', '444', 'supervisor de logística');
INSERT INTO tblFuncionario VALUES ('carlosm', '555', 'auxiliar de armazém');
INSERT INTO tblFuncionario VALUES ('anapaula', '666', 'coordenadora de transporte');
INSERT INTO tblFuncionario VALUES ('robertok', '777', 'operador de empilhadeira');
INSERT INTO tblFuncionario VALUES ('fernandal', '888', 'assistente de inventário');
INSERT INTO tblFuncionario VALUES ('pedroh', '999', 'conferente de mercadorias');
INSERT INTO tblFuncionario VALUES ('lucasc', '1010', 'gerente de operações');
INSERT INTO tblFuncionario VALUES ('julianas', '1111', 'analista de qualidade');
INSERT INTO tblFuncionario VALUES ('marcosv', '1212', 'encarregado de estoque');
INSERT INTO tblFuncionario VALUES ('tatianer', '1313', 'assistente administrativo');
INSERT INTO tblFuncionario VALUES ('ricardof', '1414', 'motorista de entrega');
INSERT INTO tblFuncionario VALUES ('vanessap', '1515', 'supervisora de expedição');
INSERT INTO tblFuncionario VALUES ('gabrielg', '1616', 'auxiliar de carga/descarga');
INSERT INTO tblFuncionario VALUES ('amandat', '1717', 'controladora de acesso');
INSERT INTO tblFuncionario VALUES ('felipeb', '1818', 'técnico de manutenção');
INSERT INTO tblFuncionario VALUES ('isabelam', '1919', 'coordenadora de suprimentos');
INSERT INTO tblFuncionario VALUES ('leonardos', '2020', 'operador de logística');
INSERT INTO tblFuncionario VALUES ('biancav', '2121', 'assistente de compras');
INSERT INTO tblFuncionario VALUES ('rodrigon', '2222', 'fiscal de armazém');
INSERT INTO tblFuncionario VALUES ('patriciac', '2323', 'analista de distribuição');
INSERT INTO tblFuncionario VALUES ('rafaelm', '2424', 'auxiliar de expedição');
INSERT INTO tblFuncionario VALUES ('suelenp', '2525', 'gestora de cadeia de suprimentos');
go

INSERT INTO tblDoacao VALUES (2, 1, 1, '17-12-2024', 90000, 450, '', 'HGSF238II1');
INSERT INTO tblDoacao VALUES (2, 2, 1, '23-12-2024', 2000, 10, '', 'O99F222OP1');
INSERT INTO tblDoacao VALUES (3, 3, 2, '05-01-2025', 60000, 300, '', 'PLM456JK9');
INSERT INTO tblDoacao VALUES (1, 4, 3, '12-01-2025', 40000, 200, '', 'QWE123RT4');
INSERT INTO tblDoacao VALUES (2, 5, 1, '18-01-2025', 30000, 150, '', 'ZXC987VB6');
INSERT INTO tblDoacao VALUES (3, 6, 2, '22-01-2025', 20000, 100, '', 'KJH654GF3');
INSERT INTO tblDoacao VALUES (1, 7, 3, '29-01-2025', 70000, 350, '', 'MNB321FD8');
INSERT INTO tblDoacao VALUES (2, 8, 1, '03-02-2025', 10000, 50, '', 'SDT951LK2');
INSERT INTO tblDoacao VALUES (3, 9, 2, '09-02-2025', 50000, 250, '', 'WER741TY5');
INSERT INTO tblDoacao VALUES (1, 10, 3, '14-02-2025', 36000, 180, '', 'FGH159OP7');
INSERT INTO tblDoacao VALUES (2, 11, 1, '20-02-2025', 24000, 120, '', 'JKL357UI0');
INSERT INTO tblDoacao VALUES (3, 12, 2, '27-02-2025', 44000, 220, '', 'VBN468QW1');
INSERT INTO tblDoacao VALUES (1, 13, 3, '05-03-2025', 80000, 400, '', 'YUI852RT3');
INSERT INTO tblDoacao VALUES (2, 14, 1, '11-03-2025', 16000, 80, '', 'EDC147MK6');
INSERT INTO tblDoacao VALUES (3, 15, 2, '17-03-2025', 54000, 270, '', 'RFV258NJ9');
INSERT INTO tblDoacao VALUES (1, 16, 3, '24-03-2025', 32000, 160, '', 'TGB369KI4');
INSERT INTO tblDoacao VALUES (2, 17, 1, '30-03-2025', 64000, 320, '', 'YHN741WS8');
INSERT INTO tblDoacao VALUES (3, 18, 2, '06-04-2025', 22000, 110, '', 'UJM852ED2');
INSERT INTO tblDoacao VALUES (1, 19, 3, '12-04-2025', 76000, 380, '', 'IKO963RF5');
INSERT INTO tblDoacao VALUES (2, 20, 1, '18-04-2025', 18000, 90, '', 'PLA159ZX7');
INSERT INTO tblDoacao VALUES (3, 21, 2, '25-04-2025', 38000, 190, '', 'QSC357VB0');
INSERT INTO tblDoacao VALUES (1, 22, 3, '01-05-2025', 84000, 420, '', 'XZD468NM3');
INSERT INTO tblDoacao VALUES (2, 23, 1, '08-05-2025', 14000, 70, '', 'LKI852FG6');
INSERT INTO tblDoacao VALUES (3, 24, 2, '15-05-2025', 42000, 210, '', 'MJU741QA9');
INSERT INTO tblDoacao VALUES (1, 25, 3, '22-05-2025', 28000, 140, '', 'BHY963WS2');
go

INSERT INTO tblPedido VALUES (1, '07-03-2025 16:00:21');
INSERT INTO tblPedido VALUES (1, '11-01-2025 21:23:00');
INSERT INTO tblPedido VALUES (2, '05-02-2025 09:15:34');
INSERT INTO tblPedido VALUES (3, '18-01-2025 14:30:45');
INSERT INTO tblPedido VALUES (4, '22-03-2025 11:45:12');
INSERT INTO tblPedido VALUES (5, '30-01-2025 17:20:33');
INSERT INTO tblPedido VALUES (6, '12-02-2025 10:10:10');
INSERT INTO tblPedido VALUES (7, '08-03-2025 19:25:47');
INSERT INTO tblPedido VALUES (8, '25-01-2025 13:35:28');
INSERT INTO tblPedido VALUES (9, '14-02-2025 16:40:19');
INSERT INTO tblPedido VALUES (10, '03-03-2025 08:05:52');
INSERT INTO tblPedido VALUES (11, '19-01-2025 22:15:37');
INSERT INTO tblPedido VALUES (12, '28-02-2025 15:50:24');
INSERT INTO tblPedido VALUES (13, '09-01-2025 12:30:41');
INSERT INTO tblPedido VALUES (14, '17-03-2025 18:45:56');
INSERT INTO tblPedido VALUES (15, '24-01-2025 20:10:03');
INSERT INTO tblPedido VALUES (16, '06-02-2025 07:55:48');
INSERT INTO tblPedido VALUES (17, '21-03-2025 14:20:29');
INSERT INTO tblPedido VALUES (18, '02-02-2025 09:40:17');
INSERT INTO tblPedido VALUES (19, '15-01-2025 16:25:34');
INSERT INTO tblPedido VALUES (20, '27-03-2025 11:15:22');
INSERT INTO tblPedido VALUES (21, '10-02-2025 19:30:45');
INSERT INTO tblPedido VALUES (22, '23-01-2025 10:05:58');
INSERT INTO tblPedido VALUES (23, '04-03-2025 13:50:11');
INSERT INTO tblPedido VALUES (24, '20-02-2025 17:35:26');
go

INSERT INTO tblResgate VALUES (1, 1, '9244e59d', '07-12-2025', 'N');
INSERT INTO tblResgate VALUES (2, 1, '0a51427e', '01-03-2026', 'N');
INSERT INTO tblResgate VALUES (2, 2, '4a4d2fcb', '12-07-2025', 'N');
INSERT INTO tblResgate VALUES (3, 3, 'b3f7a82c', '15-01-2025', 'N');
INSERT INTO tblResgate VALUES (1, 4, 'c5d9e1f0', '22-02-2025', 'N');
INSERT INTO tblResgate VALUES (4, 5, 'd8e2f4a7', '05-03-2025', 'N');
INSERT INTO tblResgate VALUES (2, 6, 'e9f1g5h3', '18-04-2025', 'N');
INSERT INTO tblResgate VALUES (5, 5, 'f2g6h8j1', '29-05-2025', 'N');
INSERT INTO tblResgate VALUES (3, 6, 'g7h9j2k4', '10-06-2025', 'N');
INSERT INTO tblResgate VALUES (1, 7, 'h3k5m7n9', '24-07-2025', 'N');
INSERT INTO tblResgate VALUES (6, 8, 'j4l6p8q0', '03-08-2025', 'N');
INSERT INTO tblResgate VALUES (2, 9, 'k5m9n1o2', '14-09-2025', 'N');
INSERT INTO tblResgate VALUES (4, 10, 'l8p0q3r7', '25-10-2025', 'N');
INSERT INTO tblResgate VALUES (3, 11, 'm2n4o6p8', '07-11-2025', 'N');
INSERT INTO tblResgate VALUES (7, 10, 'n5o7q9s1', '19-12-2025', 'N');
INSERT INTO tblResgate VALUES (1, 12, 'o8p2r4t6', '30-01-2026', 'N');
INSERT INTO tblResgate VALUES (2, 12, 'p9q3s5u7', '12-02-2026', 'N');
INSERT INTO tblResgate VALUES (5, 8, 'q0r6t8v2', '23-03-2026', 'N');
INSERT INTO tblResgate VALUES (3, 9, 'r7s9u1w3', '04-04-2026', 'N');
INSERT INTO tblResgate VALUES (8, 2, 's2t4v6x8', '15-05-2026', 'N');
INSERT INTO tblResgate VALUES (4, 12, 't5u7w9y1', '26-06-2026', 'N');
INSERT INTO tblResgate VALUES (2, 14, 'u8v0x2z4', '07-07-2026', 'N');
INSERT INTO tblResgate VALUES (6, 20, 'v1w3y5a7', '18-08-2026', 'N');
INSERT INTO tblResgate VALUES (3, 21, 'w4x6z8b0', '29-09-2026', 'N');
INSERT INTO tblResgate VALUES (1, 22, 'x7y9a2c4', '10-10-2026', 'N');
INSERT INTO tblResgate VALUES (7, 13, 'y0z3b5d6', '11-11-2026', 'N');
INSERT INTO tblResgate VALUES (8, 15, 'z2a4c6e8', '12-11-2026', 'N');
INSERT INTO tblResgate VALUES (9, 16, 'a5b7d9f1', '13-11-2026', 'N');
INSERT INTO tblResgate VALUES (10, 17, 'b8c0e2g3', '14-11-2026', 'N');
INSERT INTO tblResgate VALUES (11, 18, 'c1d3f5h7', '15-11-2026', 'N');
INSERT INTO tblResgate VALUES (12, 19, 'd4e6g8i0', '16-11-2026', 'N');
INSERT INTO tblResgate VALUES (13, 23, 'e7f9h1j2', '17-11-2026', 'N');
INSERT INTO tblResgate VALUES (14, 24, 'f0g2i4k6', '18-11-2026', 'N');
INSERT INTO tblResgate VALUES (15, 25, 'g3h5j7l8', '19-11-2026', 'N');
go

INSERT INTO tblFeedback VALUES ('Ajuda', 'João Silva', 'joao.silva@email.com', '12345678901', '(11) 98765-4321', 0x4D65616E696E676C65737344617461, 'Preciso de ajuda para entender como resgatar meus cupons.', 'S');
INSERT INTO tblFeedback VALUES ('Duvida', 'Maria Oliveira', 'maria.oliveira@email.com', '23456789012', '(11) 91234-5678', NULL, 'Como posso verificar quantos pontos tenho disponíveis?', 'S');
INSERT INTO tblFeedback VALUES ('Reclamacao', 'Carlos Souza', 'carlos.souza@email.com', '34567890123', '(11) 92345-6789', 0x4D65616E696E676C65737344617461, 'O cupom que resgatei não está funcionando no estabelecimento.', 'S');
INSERT INTO tblFeedback VALUES ('Outro', 'Ana Costa', 'ana.costa@email.com', '45678901234', '(11) 93456-7890', NULL, 'Gostaria de sugerir a inclusão de mais farmácias como parceiras.', 'S');
INSERT INTO tblFeedback VALUES ('Ajuda', 'Pedro Santos', 'pedro.santos@email.com', '56789012345', '(11) 94567-8901', 0x4D65616E696E676C65737344617461, 'Não consigo fazer login na minha conta, aparece erro de senha.', 'S');
INSERT INTO tblFeedback VALUES ('Duvida', 'Juliana Lima', 'juliana.lima@email.com', '67890123456', '(11) 95678-9012', NULL, 'Os pontos expiram após algum tempo?', 'S');
INSERT INTO tblFeedback VALUES ('Reclamacao', 'Marcos Rocha', 'marcos.rocha@email.com', '78901234567', '(11) 96789-0123', 0x4D65616E696E676C65737344617461, 'Fiz uma doação há 3 dias e ainda não recebi meus pontos.', 'S');
INSERT INTO tblFeedback VALUES ('Outro', 'Fernanda Alves', 'fernanda.alves@email.com', '89012345678', '(11) 97890-1234', NULL, 'Parabéns pelo projeto, está ajudando muitas pessoas!', 'S');
INSERT INTO tblFeedback VALUES ('Ajuda', 'Ricardo Gomes', 'ricardo.gomes@email.com', '90123456789', '(11) 98901-2345', 0x4D65616E696E676C65737344617461, 'Como altero meu email cadastrado no sistema?', 'S');
INSERT INTO tblFeedback VALUES ('Duvida', 'Patricia Nunes', 'patricia.nunes@email.com', '01234567890', '(11) 99012-3456', NULL, 'Posso doar medicamentos vencidos?', 'S');
INSERT INTO tblFeedback VALUES ('Reclamacao', 'Lucas Barbosa', 'lucas.barbosa@email.com', '12345098765', '(11) 90123-4567', 0x4D65616E696E676C65737344617461, 'O site está muito lento nas horas de pico.', 'S');
INSERT INTO tblFeedback VALUES ('Outro', 'Amanda Ferreira', 'amanda.ferreira@email.com', '23456109876', '(11) 91234-5678', NULL, 'Sugiro criar um aplicativo móvel para facilitar o acesso.', 'S');
INSERT INTO tblFeedback VALUES ('Ajuda', 'Roberto Martins', 'roberto.martins@email.com', '34567210987', '(11) 92345-6789', 0x4D65616E696E676C65737344617461, 'Esqueci minha senha, como posso recuperar?', 'S');
INSERT INTO tblFeedback VALUES ('Duvida', 'Tatiane Castro', 'tatiane.castro@email.com', '45678321098', '(11) 93456-7890', NULL, 'Há limite de doações por mês?', 'S');
INSERT INTO tblFeedback VALUES ('Reclamacao', 'Eduardo Ribeiro', 'eduardo.ribeiro@email.com', '56789432109', '(11) 94567-8901', 0x4D65616E676C65737344617461, 'O local de doação mais próximo está sempre lotado.', 'S');
INSERT INTO tblFeedback VALUES ('Outro', 'Camila Dias', 'camila.dias@email.com', '67890543210', '(11) 95678-9012', NULL, 'Gostaria de trabalhar como voluntária no projeto.', 'S');
INSERT INTO tblFeedback VALUES ('Ajuda', 'Gustavo Henrique', 'gustavo.henrique@email.com', '78901654321', '(11) 96789-0123', 0x4D65616E696E676C65737344617461, 'Meu QR code de doação não está sendo lido pelo sistema.', 'S');
INSERT INTO tblFeedback VALUES ('Duvida', 'Vanessa Correia', 'vanessa.correia@email.com', '89012765432', '(11) 97890-1234', NULL, 'Posso transferir meus pontos para outra pessoa?', 'S');
INSERT INTO tblFeedback VALUES ('Reclamacao', 'Felipe Cardoso', 'felipe.cardoso@email.com', '90123876543', '(11) 98901-2345', 0x4D65616E696E676C65737344617461, 'O cupom prometia 20% de desconto mas só deu 10%.', 'S');
INSERT INTO tblFeedback VALUES ('Outro', 'Larissa Moreira', 'larissa.moreira@email.com', '01234987654', '(11) 99012-3456', NULL, 'Adorei a variedade de cupons disponíveis!', 'S');
INSERT INTO tblFeedback VALUES ('Ajuda', 'Diego Cunha', 'diego.cunha@email.com', '12345098765', '(11) 90123-4567', 0x4D65616E696E676C65737344617461, 'Como faço para atualizar meu telefone cadastrado?', 'S');
INSERT INTO tblFeedback VALUES ('Duvida', 'Beatriz Ramos', 'beatriz.ramos@email.com', '23456109876', '(11) 91234-5678', NULL, 'Os pontos são acumulativos ou têm validade?', 'S');
INSERT INTO tblFeedback VALUES ('Reclamacao', 'Rafael Teixeira', 'rafael.teixeira@email.com', '34567210987', '(11) 92345-6789', 0x4D65616E696E676C65737344617461, 'O sistema não está registrando minhas doações corretamente.', 'S');
INSERT INTO tblFeedback VALUES ('Outro', 'Isabela Santos', 'isabela.santos@email.com', '45678321098', '(11) 93456-7890', NULL, 'Sugiro incluir mais locais de doação na zona norte.', 'S');
INSERT INTO tblFeedback VALUES ('Ajuda', 'Bruno Oliveira', 'bruno.oliveira@email.com', '56789432109', '(11) 94567-8901', 0x4D65616E696E676C65737344617461, 'Não estou recebendo os emails de confirmação.', 'S');
go

-- PROCEDURES ---

GO

CREATE PROCEDURE usp_loginUsuario
    @login varchar(60)
AS
BEGIN
    DECLARE @userCount int
    
    SELECT @userCount = COUNT(*) FROM tblUsuario WHERE email_usuario = @login
    
    IF @userCount > 0
    BEGIN
        IF EXISTS (SELECT 1 FROM tblUsuario WHERE email_usuario = @login)
        BEGIN
            SELECT senha_usuario FROM tblUsuario WHERE email_usuario = @login
        END
        ELSE
        BEGIN
            SELECT 'Interromper'
        END
    END
END
GO






