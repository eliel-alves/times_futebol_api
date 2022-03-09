-- criar um banco de dados chamado times_futebol_api

-- criar as tabelas

create table times (
codigo serial not null primary key, 
nome varchar(50) not null,
sigla varchar(3) not null,
ano_fundacao integer not null,
historia text not null);

create table posicoes (
codigo serial not null primary key,
nome varchar(50) not null);

create table jogadores (
codigo serial not null primary key,
nome varchar(50) not null,
numero_camisa integer not null,
time integer not null,
posicao integer not null,
foreign key (posicao) references posicoes (codigo),
foreign key (time) references times (codigo));

-- inserir alguns registros
insert into times (nome, sigla, ano_fundacao, historia) values ('Grêmio', 'GRE', 1903, 'Aqui vai a história do Grêmio'),
('Internacional', 'INT', 1909, 'Aqui vai a história do Internacional'),
('Flamengo', 'FLA', 1895, 'Aqui vai a história do Flamengo');

insert into posicoes (nome) values
('Lateral direito'),
('Lateral esquerdo'),
('Zagueiro'),
('Atacante');

insert into jogadores (nome, numero_camisa, time, posicao) values
('Diego Souza', 29, 1, 4),
('Pedro Geromel', 3, 1, 3);