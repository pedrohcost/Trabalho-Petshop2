async function listarClientes() {
    const response = await fetch('http://localhost:3000/cliente/listar');
    const result = await response.json();
    const clientes = result.data;
    if (!result.success) {
        alert('Erro ao listar os clientes.');
    } else {
        alert('sucesso')
    }

    const listaClientes = document.querySelector('#listaClientes');
    clientes.forEach(c => {
        listaClientes.innerHTML += `
        <div class="cartao">
            <div>
                <input type="hidden" value="${c.idCliente}" class="id">
                <p>Nome: ${c.nome}</p>
                <p>Telefone: ${c.telefone}</p>
                <p>Endereço: ${c.endereco}</p>
                </div>
            <div>
                <button class="editar" onclick="editar(${c.idCliente}, '${c.nome}', '${c.telefone}', '${c.endereco}')">Editar</button>
                <button class="excluir" onclick="excluir(${c.idCliente})">Excluir</button>
            </div>
        </div>
        `;
    });
}
listarClientes();

document.querySelector('#clienteForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (document.querySelector('#clienteForm').querySelector('button') == 'Salvar Cliente') {
        cadastrar();
    }
});

async function cadastrar() {
    
    const nome = document.querySelector('#nome').value;
    const telefone = document.querySelector('#telefone').value;
    const endereco = document.querySelector('#endereco').value;

    const data = { nome, telefone, endereco };
    const response = await fetch('http://localhost:3000/cliente/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
        alert('Cliente cadastrado com sucesso!');
        window.location.href = 'clientes.html';
    } else {
        alert('Erro ao cadastrar o cliente');
    }
}

async function editar() {
    const nome = document.querySelector('#nome').value;
    const telefone = document.querySelector('#telefone').value;
    const endereco = document.querySelector('#endereco').value;
    const idCliente = document.querySelector('#idCliente').value;
    
    const data = { nome, telefone, endereco, idCliente };

    const response = await fetch('http://localhost:3000/cliente/editar', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await response.json();
    if (result.success) {
        alert('Cliente editado com sucesso!');
        window.location.href = 'clientes.html';
    } else {
        alert('Erro ao editar o cliente');
    }
}

async function excluir(id) {

    const response = await fetch(`http://localhost:3000/cliente/deletar/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (result.success) {
        window.location.href = 'clientes.html';
    } else {
        alert("Erro ao excluir o cliente");
    }
}