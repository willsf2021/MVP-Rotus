const inputArea = document.getElementById("inputArea");
const toggleMode = document.getElementById("toggleMode");
const selectIngredientsHTML = document.querySelector("#select-with-search");
const addIngredientHTML = document.querySelector("#add-ingredient");
const ingredientList = document.querySelector("#ingredient-list");

// Simulam os ingredientes vindos do Backend
// Mockup
const INGREDIENTS = [
  { value: "1", label: "Arroz branco cozido" },
  { value: "2", label: "Feijão carioca cozido" },
  { value: "3", label: "Frango grelhado" },
  { value: "4", label: "Carne bovina cozida" },
  { value: "5", label: "Ovo cozido" },
  { value: "6", label: "Leite integral" },
  { value: "7", label: "Pão francês" },
  { value: "8", label: "Banana prata" },
  { value: "9", label: "Maçã" },
  { value: "10", label: "Tomate" },
];

const selectWithSearch = new CustomSelect("#select-with-search", {
  label: "Selecione um ingrediente",
  searchable: true,
  placeholder: "Digite para buscar...",
  items: INGREDIENTS,
  onChange: (value, item) => {},
});

function selectIngredients(ingredient_id) {
  let ingredient = INGREDIENTS.find(
    (ingredient) => ingredient.value == ingredient_id
  );

  // Pega os valores dos inputs - SELETORES CORRETOS baseados no SEU HTML
  const inputs = document.querySelectorAll('#inputs-container-ingredients input[type="text"]');
  const pesoBruto = inputs[0].value;
  const pesoLiquido = inputs[1].value;
  const pesoCozido = inputs[2].value;

  data.ingredientes.push({
    ...ingredient,
    pesoBruto,
    pesoLiquido,
    pesoCozido
  });
  
  renderIngredients(ingredient, pesoBruto, pesoLiquido, pesoCozido);
  
  // Limpa os inputs após adicionar
  inputs.forEach(input => input.value = '');
  
  // Reseta o select (opcional)
  selectWithSearch.setValue(null);
}

function removeIngredient(ingredientId) {
  // Remove do array
  data.ingredientes = data.ingredientes.filter(
    ing => ing.value !== ingredientId
  );
  
  // Remove do DOM
  const card = document.querySelector(`[data-id="${ingredientId}"]`);
  if (card) {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-20px)';
    setTimeout(() => card.remove(), 200);
  }
}

function renderIngredients(ingredient, pesoBruto, pesoLiquido, pesoCozido) {
  let liHTML = document.createElement("li");
  liHTML.className = "ingredient-card";
  liHTML.dataset.id = ingredient.value;
  
  liHTML.innerHTML = `
    <div class="ingredient-header">
      <span class="ingredient-name">${ingredient.label}</span>
      <button class="ingredient-remove" onclick="removeIngredient('${ingredient.value}')">
        <i class="bi bi-trash"></i>
      </button>
    </div>
    <div class="ingredient-weights">
      <div class="ingredient-weight-item">
        <span class="weight-label">Peso Bruto</span>
        <span class="weight-value">${pesoBruto || '-'}</span>
      </div>
      <div class="ingredient-weight-item">
        <span class="weight-label">Peso Líquido</span>
        <span class="weight-value">${pesoLiquido || '-'}</span>
      </div>
      <div class="ingredient-weight-item">
        <span class="weight-label">Peso Cozido</span>
        <span class="weight-value">${pesoCozido || '-'}</span>
      </div>
    </div>
  `;
  
  ingredientList.appendChild(liHTML);
}

let data = {
  // Step 1 - Cliente
  has_client: false,
  client_id: null,

  // Step 2 - Receita
  nome_receita: "",
  categoria: "",
  tempo_preparo: "",
  porcao: "",
  unidade_medida: "",
  modo_preparo: "",

  // Step 3 - Ingredientes
  ingredientes: [],

  // Step 4 - Alergênicos
  alergenicos: "",
};

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
    `,
};

async function handleToggleMode() {
  inputArea.innerHTML = (await toggleMode.checked)
    ? templates.add
    : templates.search;

  if (toggleMode.checked) {
    document
      .querySelector(".submit-button")
      .addEventListener("click", registerClient);
  }
}

async function registerClient() {
  const inputNomeCompleto = document.querySelector("#complete-name");
  const inputCpf = document.querySelector("#cpf");
  const inputCelular = document.querySelector("#telephone-number");

  let isNotValidFields = validateData([
    inputNomeCompleto.value,
    inputCpf.value,
  ]);

  if (!isNotValidFields) {
    toggleMode.checked = false;
    await handleToggleMode();

    let clientInput = document.querySelector("#client-name");
    clientInput.value = inputNomeCompleto.value;
  } else {
    return;
  }
}

function validateData(data = []) {
  let getOut = false;

  if (data.length == 0) {
    console.error("Dados para validação não informados");
    return;
  }

  data.map((content) => {
    if (content == "") {
      getOut = true;
    }
  });

  if (!getOut) {
    alert("Cliente registrado com sucesso!");
  } else {
    alert("Preencha todos os dados obrigatórios!");
  }

  return getOut;
}

addIngredientHTML.addEventListener("click", () => {
  const selectedValue = selectWithSearch.getValue();
  if (selectedValue) {
    selectIngredients(selectedValue);
  }
});

toggleMode.addEventListener("change", handleToggleMode);
