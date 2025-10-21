const inputArea = document.getElementById("inputArea");
const toggleMode = document.getElementById("toggleMode");
const selectIngredientsHTML = document.querySelector("#select-with-search");
const addIngredientHTML = document.querySelector("#add-ingredient");
const ingredientList = document.querySelector("#ingredient-list");
const togglePrecificacao = document.getElementById("toggleModePrecificacao");
const pricingContainer = document.getElementById("inputs-container-pricing");

// Adicione essa função para controlar a exibição dos campos de precificação
togglePrecificacao.addEventListener("change", function () {
  if (this.checked) {
    pricingContainer.style.display = "flex";
  } else {
    pricingContainer.style.display = "none";
    // Limpa os inputs de precificação quando desmarcar
    document.getElementById("quantidade-embalagem").value = "";
    document.getElementById("custo-embalagem").value = "";

    // Remove dados de precificação dos ingredientes já adicionados
    data.ingredientes.forEach((ing) => {
      delete ing.quantidadeEmbalagem;
      delete ing.custoEmbalagem;
    });
  }
});

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

  // Pega os valores dos inputs
  const inputs = document.querySelectorAll(
    '#inputs-container-ingredients input[type="text"]'
  );
  const pesoBruto = inputs[0].value.trim();
  const pesoLiquido = inputs[1].value.trim();
  const pesoCozido = inputs[2].value.trim();

  // Validação: campos obrigatórios
  if (!pesoBruto || !pesoLiquido || !pesoCozido) {
    alert("Por favor, preencha todos os campos de peso!");
    return;
  }

  // Validação: peso líquido não pode ser maior que bruto
  const valorBruto = parseFloat(pesoBruto.replace(/\D/g, ""));
  const valorLiquido = parseFloat(pesoLiquido.replace(/\D/g, ""));

  if (valorLiquido > valorBruto) {
    alert("O peso líquido não pode ser maior que o peso bruto!");
    inputs[1].focus();
    return;
  }

  // Dados do ingrediente
  const ingredienteData = {
    ...ingredient,
    pesoBruto,
    pesoLiquido,
    pesoCozido,
  };

  // Se precificação estiver ativa, adiciona os dados
  if (togglePrecificacao.checked) {
    const quantidadeEmbalagem = document
      .getElementById("quantidade-embalagem")
      .value.trim();
    const custoEmbalagem = document
      .getElementById("custo-embalagem")
      .value.trim();

    if (!quantidadeEmbalagem || !custoEmbalagem) {
      alert("Por favor, preencha os dados de precificação!");
      return;
    }

    ingredienteData.quantidadeEmbalagem = quantidadeEmbalagem;
    ingredienteData.custoEmbalagem = custoEmbalagem;
  }

  data.ingredientes.push(ingredienteData);
  renderIngredients(
    ingredient,
    pesoBruto,
    pesoLiquido,
    pesoCozido,
    ingredienteData.quantidadeEmbalagem,
    ingredienteData.custoEmbalagem
  );

  // Limpa TODOS os inputs após adicionar
  inputs.forEach((input) => (input.value = ""));

  // Limpa os inputs de precificação se estiverem visíveis
  if (togglePrecificacao.checked) {
    document.getElementById("quantidade-embalagem").value = "";
    document.getElementById("custo-embalagem").value = "";
  }

  // Reseta o select
  selectWithSearch.setValue(null);
}

function removeIngredient(ingredientId) {
  // Remove do array
  data.ingredientes = data.ingredientes.filter(
    (ing) => ing.value !== ingredientId
  );

  // Remove do DOM
  const card = document.querySelector(`[data-id="${ingredientId}"]`);
  if (card) {
    card.style.opacity = "0";
    card.style.transform = "translateX(-20px)";
    setTimeout(() => card.remove(), 200);
  }
}

// Atualize a função renderIngredients
function renderIngredients(
  ingredient,
  pesoBruto,
  pesoLiquido,
  pesoCozido,
  quantidadeEmbalagem,
  custoEmbalagem
) {
  let liHTML = document.createElement("li");
  liHTML.className = "ingredient-card";
  liHTML.dataset.id = ingredient.value;

  // HTML base do card
  let weightsHTML = `
    <div class="ingredient-weight-item">
      <span class="weight-label">Peso Bruto</span>
      <span class="weight-value">${pesoBruto || "-"}</span>
    </div>
    <div class="ingredient-weight-item">
      <span class="weight-label">Peso Líquido</span>
      <span class="weight-value">${pesoLiquido || "-"}</span>
    </div>
    <div class="ingredient-weight-item">
      <span class="weight-label">Peso Cozido</span>
      <span class="weight-value">${pesoCozido || "-"}</span>
    </div>
  `;

  // Adiciona dados de precificação se existirem
  if (quantidadeEmbalagem && custoEmbalagem) {
    weightsHTML += `
      <div class="ingredient-weight-item">
        <span class="weight-label">Qtd. Embalagem</span>
        <span class="weight-value">${quantidadeEmbalagem}</span>
      </div>
      <div class="ingredient-weight-item">
        <span class="weight-label">Custo Embalagem</span>
        <span class="weight-value">${custoEmbalagem}</span>
      </div>
    `;
  }

  liHTML.innerHTML = `
    <div class="ingredient-header">
      <span class="ingredient-name">${ingredient.label}</span>
      <button class="ingredient-remove" onclick="removeIngredient('${ingredient.value}')">
        <i class="bi bi-trash"></i>
      </button>
    </div>
    <div class="ingredient-weights">
      ${weightsHTML}
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
