CREATE DATABASE Anyges;

USE Anyges;

-- Usuário

CREATE TABLE tblUsuario (
	ID_usuario int not null PRIMARY KEY identity,
	nome_usuario varchar(100) not null,
	sobrenome_usuario varchar(100) not null,
	cpf varchar(14) not null,
	telefone_usuario varchar(18) not null,
	email_usuario varchar(100) not null,
	senha_usuario varchar(50) not null,
	rua_usuario varchar (100) not null,
	numero_usuario varchar(6) not null,
	bairro_usuario varchar(100) not null,
	cidade_usuario varchar(100) not null,
	estado_usuario char(2) not null
);

CREATE INDEX xUsuario ON tblUsuario(ID_usuario);

--Produto e Associação

CREATE TABLE tblAssociacao(
	ID_associacao numeric(6) NOT NULL IDENTITY(1,2) PRIMARY KEY,
	CNPJ numeric(14),
	nome_associcao varchar(50)
);
CREATE INDEX xAssociacao ON tblAssociacao(ID_associacao);

CREATE TABLE tblProduto(
	ID_produto numeric(6) NOT NULL IDENTITY(1,2) PRIMARY KEY,
	nome_produto varchar(50),
	status char(1),
	valor dec(8,2),
	tipo varchar(70),
	imagem varchar(50),
	descricao_produto varchar(50)
);

CREATE TABLE tblAssociao_Produto(
	ID_associacao numeric(6) NOT NULL FOREIGN KEY REFERENCES tblAssociacao(ID_associacao),
	ID_produto numeric(6) NOT NULL FOREIGN KEY REFERENCES tblProduto(ID_produto),
	qtde_estoque numeric(7)
);