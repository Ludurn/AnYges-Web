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

-- Associacao

CREATE TABLE tblAssociacao (
	ID_associacao numeric(6) not null PRIMARY KEY identity(1,1),
	CNPJ numeric(14) not null,
	nome_associacao varchar(25),
	senha_associacao varchar(15),
	rua_associacao varchar(25) not null,
	numero_associacao varchar(5) not null,
	bairro_associacao varchar(25) not null,
	cidade_associacao varchar(25) not null,
	estado_associacao char(2) not null
);
CREATE INDEX xAssociacao ON tblAssociacao(ID_associacao);
go

-- Cupom

CREATE TABLE tblCupom (
	ID_cupom numeric(6) not null PRIMARY KEY identity(1,1),
	nome_cupom varchar(25) not null,
	status char(1) not null,
	valor numeric (8) not null,
	tipo varchar (25) not null,
	imagem varchar (50) not null,
	descricao_cupom varchar(75) not null,
	desconto numeric(2) not null
);
CREATE INDEX xCupom ON tblCupom(ID_cupom);
go

-- Local Deposito

CREATE TABLE tblLocalDeposito (
	ID_local_deposito numeric(6) not null PRIMARY KEY identity(1,1),
	nome_deposito varchar(50) not null,
	rua_deposito varchar(25) not null,
	numero_deposito varchar(5) not null,
	bairro_deposito varchar(25) not null,
	cidade_deposito varchar(25) not null,
	estado_deposito char(2) not null
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
	senha_usuario varchar(15) not null,
	dt_nascimento date not null
);
CREATE INDEX xUsuario ON tblUsuario(ID_usuario);
go

-- Feedback

CREATE TABLE tblFeedback (
	ID_feedback numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) not null,
	descricao_feedback varchar(250) not null
);
CREATE INDEX xFeedback ON tblFeedback(ID_feedback);
go

-- Doacao

CREATE TABLE tblDoacao (
	ID_doacao numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) not null,
	ID_local_deposito numeric(6) FOREIGN KEY REFERENCES tblLocalDeposito(ID_local_deposito) not null,
	dt_doacao datetime not null,
	pontuacao decimal(7,2) not null,
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
	qtde_resgate int not null
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

INSERT INTO tblCupom VALUES ('Rivotril', 'S', 12000, 'Promofarma', './src/imgs/cupons/rivotril.png', 'Suspensão Oral', 25);
INSERT INTO tblCupom VALUES ('Pediatra', 'S', 25000, 'Unimed', './src/imgs/cupons/unimed.png', 'Terça-feira e Quinta-feira', 25);
INSERT INTO tblCupom VALUES ('Psicóloga', 'S', 27000, 'Hospital das Clínicas', './src/imgs/cupons/hc.png', 'Domingo à Quarta-feira', 25);
INSERT INTO tblCupom VALUES ('Paracetamol 750mg', 'S', 12000, 'Promofarma', './src/imgs/cupons/paracetamol.jpg', 'Comprimido revestido Dor e Febre', 25);
INSERT INTO tblCupom VALUES ('Clínico Geral', 'S', 12000, 'Amil', './src/imgs/cupons/amil.jpg', 'Terça-feira e Sexta-feira', 25);
INSERT INTO tblCupom VALUES ('Gastroenterologista', 'S', 12000, 'Sírio Libanês', './src/imgs/cupons/sirio.jpg', 'Quarta-feira à Sexta-feira', 25);
go

SELECT * FROM tblCupom;
SELECT * FROM tblUsuario;

SELECT * FROM tblCupom WHERE nome_cupom='Rivotril' AND valor=12000
go
