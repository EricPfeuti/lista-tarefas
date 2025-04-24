const listaTarefas = document.getElementById("listaTarefas");
const inputTarefa = document.getElementById("novaTarefa");
const btnAdicionar = document.getElementById("adicionar");

// Carrega tarefas salvas ao iniciar
window.addEventListener("load", carregarTarefas);

btnAdicionar.addEventListener("click", function () {
    let tarefaTexto = inputTarefa.value.trim();
    if (tarefaTexto === "") return;

    adicionarTarefaNaTela(tarefaTexto);
    salvarTarefa(tarefaTexto);

    inputTarefa.value = "";
    inputTarefa.focus();
});

function adicionarTarefaNaTela(tarefaTexto, concluida = false) {
    let item = document.createElement("li");
    item.textContent = tarefaTexto;

    if (concluida) item.classList.add("concluida");

    let btnConcluir = document.createElement("button");
    btnConcluir.textContent = "CONCLUIR";
    btnConcluir.addEventListener("click", function () {
        item.classList.toggle("concluida");
        salvarTodasTarefas();
        item.removeChild(btnConcluir);
        item.removeChild(btnRemover);
    });

    let btnRemover = document.createElement("button");
    btnRemover.textContent = "REMOVER";
    btnRemover.addEventListener("click", function () {
        listaTarefas.removeChild(item);
        salvarTodasTarefas();
    });

    item.appendChild(btnConcluir);
    item.appendChild(btnRemover);
    listaTarefas.appendChild(item);
}

function salvarTarefa(tarefaTexto) {
    let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.push({ texto: tarefaTexto, concluida: false });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function salvarTodasTarefas() {
    const tarefas = [];
    document.querySelectorAll("#listaTarefas li").forEach(li => {
        tarefas.push({
            texto: li.firstChild.textContent,
            concluida: li.classList.contains("concluida")
        });
    });
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
}

function carregarTarefas() {
    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
    tarefas.forEach(tarefa => {
        adicionarTarefaNaTela(tarefa.texto, tarefa.concluida);
    });
}
