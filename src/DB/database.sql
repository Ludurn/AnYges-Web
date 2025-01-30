CREATE DATABASE anyges;

USE anyges;

DROP DATABASE anyges

SET DATEFORMAT DMY;

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

-- Cupom

CREATE TABLE tblCupom (
	ID_cupom numeric(6) not null PRIMARY KEY identity(1,1),
	nome_cupom varchar(25) not null,
	status char(1) not null,
	valor decimal (8,2) not null,
	tipo varchar (25) not null,
	imagem varchar (25) not null,
	descricao_cupom varchar(25) not null
);

CREATE INDEX xCupom ON tblCupom(ID_cupom);

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

-- Feedback

CREATE TABLE tblFeedback (
	ID_feedback numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) not null,
	descricao_feedback varchar(250) not null
);

CREATE INDEX xFeedback ON tblFeedback(ID_feedback);

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

-- Pedido

CREATE TABLE tblPedido (
	ID_pedido numeric(6) not null PRIMARY KEY identity(1,1),
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) not null,
	dt_pedido datetime not null
);

CREATE INDEX xPedido ON tblPedido(ID_pedido);

-- Resgate

CREATE TABLE tblResgate (
	ID_resgate numeric(6) not null PRIMARY KEY identity(1,1),
	ID_cupom numeric(6) FOREIGN KEY REFERENCES tblCupom(ID_cupom) not null,
	ID_pedido numeric(6) FOREIGN KEY REFERENCES tblPedido(ID_pedido) not null,
	qtde_resgate int not null
);

CREATE INDEX xResgate ON tblResgate(ID_resgate);

-- Associacao cupom

CREATE TABLE tblAssociacaoCupom (
	ID_associacao_cupom numeric(6) not null PRIMARY KEY identity(1,1),
	ID_associacao numeric (6) FOREIGN KEY REFERENCES tblAssociacao(ID_associacao) not null,
	ID_cupom numeric(6) FOREIGN KEY REFERENCES tblCupom(ID_cupom) not null,
	qtde_estoque int
);

CREATE INDEX xAssociaoCupom ON tblAssociacaoCupom(ID_associacao_cupom);

-- COMANDOS --

SELECT * FROM tblUsuario;
