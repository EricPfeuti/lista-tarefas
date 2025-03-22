document.getElementById("adicionar").addEventListener("click", function() {
    let inputTarefa = document.getElementById("novaTarefa");
    let tarefaTexto = inputTarefa.value.trim(); // retirar o espaço;

    if (tarefaTexto === "") return;

    let item = document.createElement("li");
    item.textContent = tarefaTexto;

    let listaTarefas = document.getElementById("listaTarefas");

    let btnConcluir = document.createElement("button");
    btnConcluir.textContent = "CONCLUIR";
    btnConcluir.addEventListener("click", function () {
        item.classList.toggle("concluida");
        item.removeChild(btnConcluir);
        item.removeChild(btnRemover);
    });

    let btnRemover = document.createElement("button");
    btnRemover.textContent = "REMOVER";
    btnRemover.addEventListener("click", function() {
        listaTarefas.removeChild(item);
    });

    item.appendChild(btnConcluir);
    item.appendChild(btnRemover);
    listaTarefas.appendChild(item);

    inputTarefa.value = "";
    inputTarefa.focus();

})