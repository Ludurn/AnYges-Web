CREATE DATABASE Anyges;

USE Anyges;

-- Usuário

CREATE TABLE tblUsuario (
	ID_usuario int not null PRIMARY KEY identity(1,1),
	nome_usuario varchar(50) not null,
	sobrenome_usuario varchar(50) not null,
	cpf varchar(14) not null,
	telefone_usuario varchar(18) not null,
	email_usuario varchar(100) not null,
	senha_usuario varchar(15) not null,
);

CREATE INDEX xUsuario ON tblUsuario(ID_usuario);

SELECT * FROM tblUsuario;