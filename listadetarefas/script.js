const btnAdicionar = document.getElementById("btnAdicionar");
const input = document.getElementById("novaTarefa");
const listaTarefas = document.getElementById("listaTarefas");

btnAdicionar.addEventListener("click", () => {
  adicionarTarefa();
});

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") adicionarTarefa();
});

function adicionarTarefa() {
  const valor = input.value.trim();
  if (!valor) return alert("Digite uma tarefa!");

  const li = document.createElement("li");
  li.textContent = valor;

  const btnRemover = document.createElement("button");
  btnRemover.textContent = "Excluir";
  btnRemover.onclick = () => {
    li.remove();
    salvarTarefas();
  };
  li.appendChild(btnRemover);

  listaTarefas.appendChild(li);
  salvarTarefas();
  input.value = "";
}

function salvarTarefas() {
  const tarefas = [...listaTarefas.children].map(li => li.firstChild.textContent);
  localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
  const tarefas = JSON.parse(localStorage.getItem("tarefas") || "[]");
  tarefas.forEach(t => {
    const li = document.createElement("li");
    li.textContent = t;

    const btnRemover = document.createElement("button");
    btnRemover.textContent = "Excluir";
    btnRemover.onclick = () => {
      li.remove();
      salvarTarefas();
    };
    li.appendChild(btnRemover);
    listaTarefas.appendChild(li);
  });
}

carregarTarefas();
