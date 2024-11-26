const express = require("express");
const cors = require("cors");
const connection = require("./db_config");
const app = express();

app.use(cors());
app.use(express.json());

const port = 3000;
app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));


// Rotas de Cliente
app.post('/cliente/cadastrar', (req, res) => {
    const { nome, telefone, endereco } = req.body;
    const query = 'INSERT INTO Clientes (nome, telefone, endereco) VALUES (?, ?, ?)';
    const params = [nome, telefone, endereco];
    
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao cadastrar cliente.'});
        }
        res.json({ success: true, message: 'Cliente cadastrado!'});
    });
});

app.get('/cliente/listar', (request, response) => {
    const query = "SELECT * FROM clientes";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
    }
})
});

app.put('/cliente/editar', (req, res) => {
    const { nome, telefone, endereco, idCliente } = req.body;
    const query = 'UPDATE Clientes SET nome = ?, telefone = ?, endereco = ? WHERE idCliente = ?';
    const params = [nome, telefone, endereco, idCliente];
    connection.query(query, params, (err, results) => {
        if (err || results.length == 0) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar cliente.'});
        }
        res.json({ success: true, message: 'Cliente atualizado com sucesso!'});
    });
});

app.delete('/cliente/deletar/:id', (req, res) => {
    const query = 'DELETE FROM Clientes WHERE idCliente = ?';
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar cliente.'});
        }
        res.json({ success: true, message: 'Cliente deletado com sucesso!'});
    });
});


// Rotas de Animal
app.post('/animal/cadastrar', (req, res) => {
    const {nome, idade, tipo} = req.body;
    const query = 'INSERT INTO Animais (nome, idade, tipo) VALUES (?, ?, ?)';
    const params = [nome, idade, tipo];
    console.log(req.body)
    
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(400).json({ success: false, message: 'Erro ao cadastrar animal.'});
        }
        res.json({ success: true, message: 'Animal cadastrado!'});
    });
});

app.get('/animal/listar', (request, response) => {
    const query = "SELECT * FROM animais";

    connection.query(query, (err, results) => {
        if (results) {
            response
                .status(200)
                .json({
                    success: true,
                    message: "sucesso",
                    data: results
                })
        } else {
            response
                .status(400)
                .json({
                    success: false,
                    message: "sem sucesso",
                    data: err
                })
    }
})
});

app.get('/animal', (req, res) => {
    const query = 'SELECT * FROM Animais';
    connection.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao selecionar animais.'});
        }
        res.json({ success: true, message: 'Animais selecionados com sucesso!', data: results});
    });
});

app.put('/animal/editar', (req, res) => {
    const { nome, idade, tipo, dono, idAnimal } = req.body;
    const query = 'UPDATE Animais SET nome = ?, idade = ?, tipo = ?, dono = ? WHERE idAnimal = ?';
    const params = [nome, idade, tipo, dono, idAnimal];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao atualizar animal.'});
        }
        res.json({ success: true, message: 'Animal atualizado com animal!'});
    });
});

app.delete('/animal/deletar/:id', (req, res) => {
    const query = "DELETE FROM Animais WHERE idAnimal = ?";
    const params = [req.params.id];
    connection.query(query, params, (err, results) => {
        if (err) {
            return res.status(500).json({ success: false, message: 'Erro ao deletar animal.'});
        }
        res.json({ success: true, message: 'Animal deletado com sucesso!'});
    });
});