//Seleciona os elemento do formulário.
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

//Seleciona os elemento da lista.
const expenseList = document.querySelector("ul");
const expenseQuantity = document.querySelector("aside header p span");
const expensesTotal = document.querySelector("aside header h2");

//Captura o evento de input para formatar o valor
amount.addEventListener("input", () => {
  //Obtém o valor atual do input e remove os caracteres não numéricos.
  let value = amount.value.replace(/\D+/g, "");

  //Transforma o valor do input em centavos (Exemplo: 150/100 = 1.5 que é equivalente a R$1,50).
  value = Number(value) / 100;

  //Atualiza o valor do input.
  amount.value = formatCurrencyBRL(value);
});

function formatCurrencyBRL(value) {
  //Formata o valor no padrão BRL (Real Brasileiro).
  value = value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  //Retorna o valor formatado.
  return value;
}

//Captura o evento de submit do formulário para obter os valores.
form.onsubmit = (event) => {
  //Previne o comportamento padrão de recarregar a página.
  event.preventDefault();

  //Cria um objeto com os detalhes da nova despesa.
  const newExpense = {
    id: new Date().getTime(),
    expense: expense.value,
    category_id: category.value,
    category_name: category.options[category.selectedIndex].text,
    amount: amount.value,
    created_at: new Date().toLocaleString(),
  };

  //Chama a function que irá adicionar o item na lista.
  expenseAdd(newExpense);
};

//Adiciona um novo item na lista.
function expenseAdd(newExpense) {
  try {
    //Cria o elemento para adicionar o item (li) na lista (ul).
    const expenseItem = document.createElement("li");
    expenseItem.classList.add("expense");

    //Cria o ícone da categoria.
    const expenseIcon = document.createElement("img");
    expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`);
    expenseIcon.setAttribute("alt", `Ícone de ${newExpense.category_name}`);

    //Cria a informação a despesa.
    const expenseInfo = document.createElement("div");
    expenseInfo.classList.add("expense-info");

    //Cria o nome da despesa.
    const expenseName = document.createElement("strong");
    expenseName.textContent = newExpense.expense;

    //Cria a categoria da despesa.
    const expenseCategory = document.createElement("span");
    expenseCategory.textContent = newExpense.category_name;

    //Cria o valor da despesa.
    const expenseAmount = document.createElement("span");
    expenseAmount.classList.add("expense-amount");
    expenseAmount.innerHTML = `<small>R$</small>${newExpense.amount
      .toUpperCase()
      .replace("R$", "")}`;

    //Cria um ícone de remover um item da lista.
    const removeIcon = document.createElement("img");
    removeIcon.classList.add("remove-icon");
    removeIcon.setAttribute("src", "img/remove.svg");
    removeIcon.setAttribute("alt", "Ícone de remover");

    //Adiciona as informações (name, category) de despesas na div das despesas.
    expenseInfo.append(expenseName, expenseCategory);
    //Adicona as informações no item.
    expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);
    //Adiciona o item na lista.
    expenseList.append(expenseItem);

    //Limpar os inputs do formulário e adiciona focus.
    formClear();

    //Atualiza od totais.
    updateTotals();
  } catch (error) {
    alert("Não foi possível atualizar a lista de despesas.");
    console.log(error);
  }
}

//Atualiza os totais
function updateTotals() {
  try {
    //Recupera todos os itens(li) da lista(ul).
    const items = expenseList.children;

    //Atualiza a quantidade itens na lista.
    expenseQuantity.textContent = `${items.length} ${
      items.length > 1 ? "despesas" : "despesa"
    }`;

    //Variavel para incrementar o total.
    let total = 0;

    //Percorre cada item (li) da lista (ul).
    for (let item = 0; item < items.length; item++) {
      const itemAmount = items[item].querySelector(".expense-amount");
      //Remove caracteres não númericos e sunistitui a vírgula por ponto.
      let value = itemAmount.textContent
        .replace(/[^\d,]/g, "")
        .replace(",", ".");
      //Converte o valor para float.
      value = parseFloat(value);

      if (isNaN(value)) {
        alert(
          "Não foi possivel calcular o totla. O valor não parece ser um número. "
        );
      }

      //Incrementar o valor total.
      total += Number(value);
    }

    //Cria a span para adiconar o R$ formatado.
    const symbolBRL = document.createElement("small");
    symbolBRL.textContent = "R$";

    //Formata o valor e remove o R$ que será exibido pela small com um estilo customizado.
    total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

    //Limpa o conteúdo do elemento.
    expensesTotal.innerHTML = "";

    //Adiciona o símbolo da moeda e o valor total formatado.
    expensesTotal.append(symbolBRL, total);
  } catch (error) {
    alert("Não foi possível atualizart os totais.");
    console.log(error);
  }
}

//Evento que captura o click nos itens da lista.
expenseList.addEventListener("click", (event) => {
  //verificar se o elemento clicado é o ícone de remover.
  if (event.target.classList.contains("remove-icon")) {
    //Obtém a li pai do elemento clicado.
    const item = event.target.closest(".expense");

    //Remove o item da lista.
    item.remove();
  }

  //Atualiza os totais.
  updateTotals();
});

function formClear() {
  //Limpa os imputs.
  expense.value = "";
  category.value = "";
  amount.value = "";

  //Adiciona o focus no input.
  expense.focus();
}
