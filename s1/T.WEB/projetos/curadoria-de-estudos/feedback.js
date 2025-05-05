document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("form-comentario");
    const listaComentarios = document.getElementById("lista-comentarios");

    // Carregar comentários do localStorage
    function carregarComentarios() {
        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        listaComentarios.innerHTML = "";
        comentarios.forEach((comentario, index) => {
            const div = document.createElement("div");
            div.classList.add("comentario");
            div.innerHTML = `
                <strong>${comentario.nome}</strong>: ${comentario.mensagem}
                <button onclick="removerComentario(${index})">X</button>
            `;
            listaComentarios.appendChild(div);
        });
    }

    // Adicionar novo comentário
    form.addEventListener("submit", function(event) {
        event.preventDefault();
        const nome = document.getElementById("nome").value.trim();
        const mensagem = document.getElementById("mensagem").value.trim();

        if (nome === "" || mensagem === "") {
            alert("Preencha todos os campos!");
            return;
        }

        const comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.push({ nome, mensagem });
        localStorage.setItem("comentarios", JSON.stringify(comentarios));

        document.getElementById("nome").value = "";
        document.getElementById("mensagem").value = "";

        carregarComentarios();
    });

    // Função para remover comentário
    window.removerComentario = function(index) {
        let comentarios = JSON.parse(localStorage.getItem("comentarios")) || [];
        comentarios.splice(index, 1);
        localStorage.setItem("comentarios", JSON.stringify(comentarios));
        carregarComentarios();
    };

    // Carregar comentários ao abrir a página
    carregarComentarios();
});