const inputArea = document.getElementById('inputArea');
const toggleMode = document.getElementById('toggleMode');
const selectIngredientsHTML = document.querySelector("#ingredients-select");
const addIngredientHTML = document.querySelector("#add-ingredient");
const ingredientList = document.querySelector("#ingredient-list");

const INGREDIENTS = [
    { id: 1, name: "Batata" },
    { id: 2, name: "Carne moída" },
    { id: 3, name: "Arroz" },
    { id: 4, name: "Feijão" },
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

addIngredientHTML.addEventListener('click', () => {
    selectIngredients(selectIngredientsHTML.value)
})