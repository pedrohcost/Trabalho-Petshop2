async function listarAnimais() {
    const response = await fetch('http://localhost:3000/animal/listar');
    const result = await response.json();
    const clientes = result.data;
    if (!result.success) {
        alert('Erro ao listar os clientes.');
    } else {
        alert('sucesso')
    }

    const listaClientes = document.querySelector('#listaAnimais');
    clientes.forEach(c => {
        listaClientes.innerHTML += `
        <div class="cartao">
            <div>
                <p>Nome: ${c.nome}</p>
                <p>Telefone: ${c.idade}</p>
                <p>Endereço: ${c.tipo}</p>
                <p>Dono: ${c.dono}</p>
                </div>
            <div>
                <button class="editar" onclick="editar(${c.idAnimal}, '${c.nome}', '${c.telefone}', '${c.endereco}')">Editar</button>
                <button class="excluir" onclick="excluir(${c.idAnimal})">Excluir</button>
            </div>
        </div>
        `;
    });
}
listarAnimais();

document.querySelector('#animalForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    if (document.querySelector('#animalForm').querySelector('button') == 'Salvar Animal') {
        cadastrar();
    }
});

async function cadastrar() {
    const nome = document.querySelector('#nome').value;
    const idade = document.querySelector('#idade').value;
    const tipo = document.querySelector('#tipo').value;
    // const dono = document.querySelector('#dono').value;

    const data = { nome, idade, tipo};
    console.log(data)
    const response = await fetch('http://localhost:3000/animal/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (result.success) {
        alert('Animal cadastrado com sucesso!');
        window.location.href = 'animais.html';
    } else {
        alert('Erro ao cadastrar o animal');
    }
};

async function excluir(id) {

    const response = await fetch(`http://localhost:3000/animal/deletar/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    });
    const result = await response.json();
    if (result.success) {
        window.location.href = 'animais.html';
    } else {
        alert("Erro ao excluir o animal");
    }
}