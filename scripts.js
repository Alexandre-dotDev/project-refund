//Seleciona os elemento do formulário.
const form = document.querySelector("form");
const amount = document.querySelector("#amount");
const expense = document.querySelector("#expense");
const category = document.querySelector("#category");

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
};
