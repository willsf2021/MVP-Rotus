const inputArea = document.getElementById('inputArea');
const toggleMode = document.getElementById('toggleMode');

let data = {
    // Step 1 - Cliente
    has_client: false,
    client_id: null,

    // Step 2 - Receita
    nome_receita: '',
    categoria: '',
    tempo_preparo: '',
    porcao: '',
    unidade_medida: '',
    modo_preparo: '',

    // Step 3 - Ingredientes
    ingredientes: [],

    // Step 4 - Alergênicos
    alergenicos: ''
}

// TODO: Classe que representa o ingrediente


const templates = {
    search: `
        <label>
            Buscar Cliente <small>(Opcional)</small>
            <input type="search" placeholder="Digite o nome do cliente">
        </label>
    `,
    add: `
        <label>
            Nome Completo <small></small>
            <input type="text" placeholder="João da Silva">
        </label>
        <label>
            CPF <small></small>
            <input type="text" placeholder="111.222.333-44">
        </label>
        <label>
            Email <small></small>
            <input type="text" placeholder="(11) 9 9999-9999">
        </label>
        <button type="button">Cadastrar Cliente</button>
    `
};

toggleMode.addEventListener('change', () => {
    inputArea.innerHTML = toggleMode.checked ? templates.add : templates.search;
});