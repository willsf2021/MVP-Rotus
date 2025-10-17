const inputArea = document.getElementById('inputArea');
const toggleMode = document.getElementById('toggleMode');
const selectIngredientsHTML = document.querySelector("#ingredients-select");
const addIngredientHTML = document.querySelector("#add-ingredient");
const ingredientList = document.querySelector("#ingredient-list");

// Simulam os ingredientes vindos do Backend
// Mockup
const INGREDIENTS = [
    { id: 1, name: "Batata" },
    { id: 2, name: "Carne moída" },
    { id: 3, name: "Arroz" },
    { id: 4, name: "Feijão" },
    { id: 5, name: "Alface" },
]

// Preenche os ingredientes no Select
bindIngredients(INGREDIENTS);

function bindIngredients(ingredients) {
    ingredients.forEach(ingredient => {
        let optionHTML = document.createElement('option')
        optionHTML.value = ingredient.id;
        optionHTML.innerHTML = `${ingredient.name}`

        selectIngredientsHTML.appendChild(optionHTML);
    });
}


function selectIngredients(ingredient_id) {

    let ingredient = INGREDIENTS.find(
        ingredient => ingredient.id == ingredient_id
    );

    data.ingredientes.push(ingredient)
    renderIngredients(ingredient)
}

function renderIngredients(ingredient) {
    let liHTML = document.createElement('li')
    liHTML.innerHTML = `
        ${ingredient.name}
    `
    ingredientList.appendChild(liHTML)
}



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

class Ingrediente {
    peso_bruto;
    peso_liquido;
    peso_cozido;

    constructor(peso_bruto, peso_liquido, fator_coccao) {
        this.peso_liquido = peso_liquido;
        this.peso_bruto = peso_bruto;
        this.calcularCoccao(fator_coccao);
    }

    calcularCoccao(fator_coccao) {
        this.peso_cozido = this.peso_liquido * (1 + fator_coccao);
    }
}


const templates = {
    search: `
        <label class="input-form">
            <span>Cliente <small>(Opcional)</small></span>
            <input type="text" placeholder="Digite o nome do cliente..." id="client-name">
        </label>
    `,
    add: `
        <label class="input-form">
                <span>Nome Completo <span class="required-field"> *</span></span>
                <input type="text" placeholder="João da Silva" id="complete-name">
        </label>
        <label class="input-form">
                <span>CPF<span class="required-field"> *</span></span>
                <input type="text" placeholder="111.222.333-44" id="cpf">
        </label>
        <label class="input-form">
                <span>Celular<small>(Opcional)</small></span>
                <input type="text" placeholder="(11) 9 9999-9999" id="telephone-number">
        </label>
         <button class="submit-button" type="button">Cadastrar Cliente</button>
    `
};





async function handleToggleMode() {
    inputArea.innerHTML = await toggleMode.checked ? templates.add : templates.search;
    
    if (toggleMode.checked) {
        document.querySelector(".submit-button").addEventListener('click', registerClient)
    }
}

async function registerClient() {

    const inputNomeCompleto = document.querySelector("#complete-name")
    const inputCpf = document.querySelector("#cpf")
    const inputCelular = document.querySelector("#telephone-number")

    let isNotValidFields = validateData([inputNomeCompleto.value, inputCpf.value])

    if (!isNotValidFields) {

        toggleMode.checked = false;
        await handleToggleMode();

        let clientInput = document.querySelector("#client-name")
        clientInput.value = inputNomeCompleto.value;

    } else {

        return;

    }
}

function validateData(data = []) {
    let getOut = false;

    if (data.length == 0) {
        console.error("Dados para validação não informados")
        return;
    }

    data.map((content) => {
        if (content == '') {
            getOut = true;
        };
    })

    if (!getOut) {
        alert("Cliente registrado com sucesso!")
    } else {
        alert("Preencha todos os dados obrigatórios!")
    }

    return getOut;
}


addIngredientHTML.addEventListener('click', () => {
    selectIngredients(selectIngredientsHTML.value)
})

toggleMode.addEventListener('change', handleToggleMode);