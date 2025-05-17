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

-- Usuï¿½rio

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
	token_ativacao varchar(64)
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
	ID_usuario numeric(6) FOREIGN KEY REFERENCES tblUsuario(ID_usuario) ON DELETE CASCADE not null,
	ID_local_deposito numeric(6) FOREIGN KEY REFERENCES tblLocalDeposito(ID_local_deposito) ON DELETE CASCADE not null,
	dt_doacao datetime not null,
	pontuacao numeric(8) not null,
	peso numeric(6) not null,
	descricao_doacao varchar(75),
	qr_code varchar(10) not null
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
go

INSERT INTO tblAssociacao VALUES ('Promofarma', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'pr0m0', 'f4rm4', 'promofarma@gmail.com', 's');
INSERT INTO tblAssociacao VALUES ('Unimed', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'un1', 'm3d', 'unimed@hotmail.com', 's');
INSERT INTO tblAssociacao VALUES ('Hospital Presidente', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'h0sp1tal', 'cl1n1c4', 'hc@outlook.com', 's');
INSERT INTO tblAssociacao VALUES ('Amil', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'am1l', 'am1l', 'amil@outlook.com', 's');
INSERT INTO tblAssociacao VALUES ('Hospital Sírio-Libanês', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 's1r1o', 'l1b4n3s', 'siriolib@hotmail.com', 's');
INSERT INTO tblAssociacao VALUES ('Drogasil', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'dr0ga', 's1l', 'drogasil@hotmail.com', 's');
INSERT INTO tblAssociacao VALUES ('Farmais', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'f4r', 'ma15', 'farmais@outlook.com', 's');
INSERT INTO tblAssociacao VALUES ('Ultrafarma', 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 0x4D65616E696E676C65737344617461, 'u1tra', 'f4rm4', 'ultrafarma@gmail.com', 's');
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


INSERT INTO tblUsuario VALUES ('Daniel', 'da Cruz', '33278744598', '(11) 76327-9809', 'daniel@hotmail.com', '$2y$10$7AuCvSI/Cg13KW1rD3CKC.dTxzg4oeLG5pevI.NBkUYNCjyi5qrOW', '18-12-1990', NULL, NULL, NULL); --senha: danteAl1gu1er3
INSERT INTO tblUsuario VALUES ('Luis', 'Almeida', '82957725909', '(13) 26121-9333', 'luis@gmail.com', '$2y$10$P7zHZL/9cY23W12ZBsnUQuo7kZcYDy6A00SCuRcI6E5PW/OAQp09u', '28-01-2000', NULL, NULL, NULL); --senha: 34L99Mnol00nacl
INSERT INTO tblUsuario VALUES ('Luigi', 'Pugh', '82911125231', '(23) 00112-9653', 'luigi.nascimento01@etec.sp.gov.br', '$2y$10$v3MIZtBqEOWEWwgm1cbYvO936VsmMtrHAkeAfOV6ZNRzpCLs3bH62', '30-04-1999', NULL, NULL, NULL); --senha: etecsaopaulo
INSERT INTO tblUsuario VALUES ('Maria', 'Silva', '12345678901', '(11) 98765-4321', 'maria@gmail.com', '$2y$12$egGbJ2U09nBr31PA52GrXeJhgEjvzqxNNR/8W.BFd4dqXoRuIRigi', '15-05-1985', NULL, NULL, NULL); --senha: Maria@123
INSERT INTO tblUsuario VALUES ('Luiza', 'Azevedo', '91654827355', '(41) 0375-1223', 'pietra04@lima.com', '$2b$12$IZV6noajUpsFqKO9o7KwbOq.LJM0xsxdSbfOf7NBu2SBx08elSuD6', '10-03-1975', NULL, NULL, NULL); --senha: SenhaForte!123
INSERT INTO tblUsuario VALUES ('João Felipe', 'Araújo', '65197402849', '(84) 7518-0626', 'rebecada-rocha@lopes.org', '$2b$12$DadwEnBOlQ6VyrOkDfAhe.Ia/blF6zWcP/OX7X4Q.cbF7ZvvutFG.', '20-02-1994', NULL, NULL, NULL); --senha: Brasil2022
INSERT INTO tblUsuario VALUES ('Vicente', 'Costa', '12854976002', '(99) 0523-7863', 'davi-luccaviana@yahoo.com.br', '$2b$12$3qMrtreenHuEJ.UlpD7RvOfeCwLrPjFljBfWN7tLCPKNrkRQnri3C', '25-09-2006', NULL, NULL, NULL); --senha: qweRTY!@#
INSERT INTO tblUsuario VALUES ('Emilly', 'Nogueira', '27345908674', '(61) 0857-6110', 'melissa39@da.com', '$2b$12$ejdEvbgeP6gVswXEeTk8MOtEV5wvO3DDhZyjgAKpnoj2PVaK7Iz0y', '02-11-1996', NULL, NULL, NULL); --senha: Maria2020
INSERT INTO tblUsuario VALUES ('Lara', 'Duarte', '20834971631', '(41) 1993-0420', 'cauada-rocha@gmail.com', '$2b$12$f9KhpHGrS/Q28paaH/DN/eZhVp2lEtpXjAZ5F.JMTfWzQOAe8KCvi', '28-12-1961', NULL, NULL, NULL); --senha: Teste1234@
INSERT INTO tblUsuario VALUES ('Carlos Eduardo', 'Cavalcanti', '20708315925', '(61) 31322-0182', 'henrique29@gmail.com', '$2b$12$WMa0c5uJ7oL/YKItBeIJSeRY7VeyYZIfhPnhzkuAjbnFZrLvmqUpe', '22-02-1971', NULL, NULL, NULL); --senha: Segredo$2021
INSERT INTO tblUsuario VALUES ('Ingrid', 'Santos', '48126153046', '(31) 5082-6285', 'laura35@terra.com.br', '$2b$12$A/0TgSxT9dUdAjDsKyuhJeJoBt9EFY2zGKnDbidTLD2VWyVG1IShy', '29-08-1988', NULL, NULL, NULL); --senha: Futebol10
INSERT INTO tblUsuario VALUES ('Tatiane', 'Silveira', '46215798300', '(43) 68172-4471', 'marcela33@rodrigues.com', '$2b$12$4rsM0PqiRcf3eUr3nWRA0OYRGsfXg9GKrHcMoJ9YjX.nRAcvjKIdy', '07-06-1983', NULL, NULL, NULL); --senha: Ver@o2023
INSERT INTO tblUsuario VALUES ('Paulo', 'Martins', '12084309150', '(21) 2090-0881', 'bianca51@hotmail.com', '$2b$12$Zhzvm2AxzEPyjlmGgfIOw.9oUs8oUn6pc7kWnVbEj.CGPXYOLmdUq', '24-09-1999', NULL, NULL, NULL); --senha: P4ssword!
INSERT INTO tblUsuario VALUES ('Helena', 'Gonçalves', '54803796115', '(27) 8857-7113', 'analuiza21@gmail.com', '$2b$12$uVauYkK3NzRPzwJWc3hAuOdvrrm7jlR.RZpH0Wq0O7X.ToxqVt1wS', '03-01-1995', NULL, NULL, NULL); --senha: Et3c@sp
INSERT INTO tblUsuario VALUES ('Ricardo', 'Freitas', '49062187492', '(24) 2085-1449', 'patricia15@hotmail.com', '$2b$12$av6KHwsWb3jPPbZWu.c7mO9/v14P1rYIljeZ6CD5sZbh9PWBWekH2', '19-07-1980', NULL, NULL, NULL); --senha: Aluno2024#
INSERT INTO tblUsuario VALUES ('Aline', 'Teixeira', '52409638768', '(84) 60262-6842', 'raquel.goncalves@hotmail.com', '$2b$12$xdm30fjLF6OS1HQ63VzCKO7dWR7mhEnP1UeMAAw2j5bJ9GNDTSae.', '05-05-1987', NULL, NULL, NULL); --senha: Job@123
INSERT INTO tblUsuario VALUES ('Guilherme', 'Pereira', '40729183620', '(17) 49901-2536', 'caio10@terra.com.br', '$2b$12$ZwGULuim7exxXy7OGskQGuZBhECNKhFlWAG8AgKc8QkzEpkBb9A5m', '13-12-1992', NULL, NULL, NULL); --senha: Pa$$w0rd2025
INSERT INTO tblUsuario VALUES ('Fernanda', 'Barros', '30986412759', '(81) 4602-9636', 'heloise.rodrigues@terra.com.br', '$2b$12$ENltmXb3Y2L9GikTf7BNYeq1nTq1xCyK7AogOpTv5YJ9YxzqZTb.u', '17-10-1986', NULL, NULL, NULL); --senha: Acesso!321
INSERT INTO tblUsuario VALUES ('Thiago', 'Farias', '30924675821', '(11) 3938-1412', 'lucas20@hotmail.com', '$2b$12$LHlKNuyFAyy9Z.k9cs3J2uTnPB8tx1mUpcK8XbI4F2/ugAU17nP/C', '16-11-1982', NULL, NULL, NULL); --senha: DadoSeguro!
INSERT INTO tblUsuario VALUES ('Vanessa', 'Lima', '96328047139', '(91) 9054-1340', 'eduarda17@hotmail.com', '$2b$12$huZhkFi/s3PPLy4n74Om7.0Bkr6JP5UPHeZpmaM5bLb5ZOp2IWq6G', '01-08-1990', NULL, NULL, NULL); --senha: Confid3ncial
INSERT INTO tblUsuario VALUES ('Bruno', 'Rezende', '20318649285', '(92) 6477-4157', 'rafael42@yahoo.com', '$2b$12$Ct06pLZObv4Tnrm0FrxZy.o9RZOrczhDpZ3OB3d2YcvqkdUTljVHG', '26-03-1984', NULL, NULL, NULL); --senha: Admin!@#2023
INSERT INTO tblUsuario VALUES ('Juliana', 'Souza', '58319042617', '(95) 5441-8213', 'camila50@gmail.com', '$2b$12$r3I9C89WwrTHP5IJ0nKzvuH3.DVYvXB7uPbtZ.9N.K9rcFZdVUkqC', '18-06-1978', NULL, NULL, NULL); --senha: Usu@rio123
INSERT INTO tblUsuario VALUES ('Marcelo', 'Oliveira', '14079523869', '(96) 2252-1283', 'matheus50@terra.com.br', '$2b$12$0qEk6sm9XJIXiIBcHkOa8e5wCRK4r8S35QYHjcGG0pASslrF4rqna', '09-04-1973', NULL, NULL, NULL); --senha: SeguranÇa2024
INSERT INTO tblUsuario VALUES ('Tatiana', 'Rocha', '59172834607', '(85) 9035-8043', 'lais57@hotmail.com', '$2b$12$qyQZRYcWS8zxjYZ0XNIPveZjNDRo6Eji4MS7Fb9fvn5uDJzkx/yHq', '23-01-1968', NULL, NULL, NULL); --senha: MyPass!2023
INSERT INTO tblUsuario VALUES ('Felipe', 'Mendes', '45730819694', '(27) 9097-5663', 'geovana50@yahoo.com.br', '$2b$12$eLHHKZzG/E5.0lO1HZauFOLsU9Bnd5eJxbTegA9eFZ3NoCN5Rm.QC', '04-07-1977', NULL, NULL, NULL); --senha: T3steT3ste
INSERT INTO tblUsuario VALUES ('Patrícia', 'Cardoso', '70389261015', '(98) 30244-6536', 'leticia.ribeiro@hotmail.com', '$2b$12$uLpc1NvyloOXyYv5xdnFduGHj70FqC2cTR.AJhfC/.c04YI1qil2a', '12-05-1989', NULL, NULL, NULL); --senha: Priv4do@!
go

INSERT INTO tblFuncionario VALUES ('prm1rwe', '111', 'gestor de dados');
INSERT INTO tblFuncionario VALUES ('nvweblo', '222', 'atendente centro deposito');
go

INSERT INTO tblDoacao VALUES (2, 1, 1, '17-12-2024', 100000, 450, '', 'HGSF238II1');
INSERT INTO tblDoacao VALUES (2, 2, 1, '23-12-2024', 12000, 10, '', 'O99F222OP1');
go

INSERT INTO tblPedido VALUES (1, '07-03-2025 16:00:21');
INSERT INTO tblPedido VALUES (1, '11-01-2025 21:23:00');

INSERT INTO tblResgate VALUES (1, 1, '9244e59d', '07-12-2025', 'N');
INSERT INTO tblResgate VALUES (2, 1, '0a51427e', '01-03-2026', 'N');
INSERT INTO tblResgate VALUES (2, 2, '4a4d2fcb', '12-07-2025', 'N');


SELECT * FROM tblResgate r WHERE r.ID_pedido IN (SELECT ID_pedido FROM tblPedido p INNER JOIN tblUsuario u ON p.ID_usuario = u.ID_usuario WHERE u.ID_usuario = 1 AND p.ID_pedido = 1); 
SELECT * FROM tblPedido

SELECT * FROM tblFeedback

SELECT ID_pedido, dt_pedido, (SELECT SUM(valor) FROM tblCupom WHERE ID_cupom IN (SELECT ID_cupom FROM tblResgate WHERE ID_pedido = p.ID_pedido)) AS 'valor_pedido' FROM tblPedido p WHERE ID_usuario IN (SELECT ID_usuario FROM tblUsuario WHERE email_usuario = 'daniel@hotmail.com')