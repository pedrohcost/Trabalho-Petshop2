CREATE DATABASE petshop;
USE petshop;

CREATE TABLE Clientes (
	idCliente INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    endereco VARCHAR(255) NOT NULL
);

CREATE TABLE Animais (
	idAnimal INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(100) NOT NULL,
    idade INT,
    tipo VARCHAR(80) NOT NULL,
    dono INT NOT NULL,
    FOREIGN KEY (dono) REFERENCES Clientes(idCliente)
);