import api from "./backend/api.js";

const interfaceDoUser = {
    async renderizar(pensamentosFiltrados = null) {
        const lista = document.getElementById('lista-pensamentos');
        const mensagemVazia = document.getElementById("mensagem-vazia");
        lista.innerHTML = "";

        try {
            let pensamentosParaRenderizar 

            if(pensamentosFiltrados) {
                pensamentosParaRenderizar = pensamentosFiltrados
            } else {
                pensamentosParaRenderizar = await api.buscar()
            }

            pensamentosParaRenderizar.forEach(interfaceDoUser.criar);
            if (pensamentosParaRenderizar.length === 0) {
                mensagemVazia.style.display = "block";
            } else {
                mensagemVazia.style.display = "none";
            }
        } catch (error) {
            alert("Erro")
        }
    },

    criar(pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement("li");
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const aspas = document.createElement("img");
        aspas.src = 'assets/imagens/aspas-azuis.png';
        aspas.alt = 'Aspas Azuis';
        aspas.classList.add("icone-aspas");

        const pensamentoConteudo = document.createElement("div");
        pensamentoConteudo.textContent = pensamento.conteudo;
        pensamentoConteudo.classList.add("pensamento-conteudo");

        const pensamentoAutoria = document.createElement("div");
        pensamentoAutoria.textContent = pensamento.autoria;
        pensamentoAutoria.classList.add("pensamento-autoria");

        const pensamentoData = document.createElement("div");
        const dataFormatada = pensamento.data.toLocaleDateString('pt-BR')
        pensamentoData.textContent = dataFormatada;
        pensamentoData.classList.add("pensamento-data");

        const botaoEditar = document.createElement("button");
        botaoEditar.classList.add("botao-editar");
        botaoEditar.onclick = () => {
            interfaceDoUser.preencherFormulario(pensamento.id)
        }

        const iconeEditar = document.createElement("img");
        iconeEditar.src = "assets/imagens/icone-editar.png";
        iconeEditar.alt = "Editar";
        botaoEditar.appendChild(iconeEditar);

        const botaoExcluir = document.createElement("button");
        botaoExcluir.classList.add("botao-excluir");
        botaoExcluir.onclick = async () => {
            try {
                await api.excluir(pensamento.id)
                interfaceDoUser.renderizar()
            } catch (error) {
                alert("Erro ao excluir pensamento")
            }
        }

        const iconeExcluir = document.createElement("img");
        iconeExcluir.src = "assets/imagens/icone-excluir.png";
        iconeExcluir.alt = "Excluir";
        botaoExcluir.appendChild(iconeExcluir);

        const botaoFavorito = document.createElement("button");
        botaoFavorito.classList.add("botao-favorito");
        botaoFavorito.onclick = async () => {
            try {
                await api.atualizarFavoritos(pensamento.id, !pensamento.favorito)
                interfaceDoUser.renderizar()
            } catch (error) {
                alert("Erro ao atualizar favoritos")
            }
        }

        const iconeFavorito = document.createElement("img");
        iconeFavorito.src = pensamento.favorito ? "assets/imagens/icone-favorito.png" : "assets/imagens/icone-favorito_outline.png"
        iconeFavorito.alt = "icone de favorito";
        botaoFavorito.appendChild(iconeFavorito);

        const icones = document.createElement("div");
        icones.classList.add("icones");
        icones.appendChild(botaoFavorito)
        icones.appendChild(botaoEditar);
        icones.appendChild(botaoExcluir);

        li.appendChild(aspas);
        li.appendChild(pensamentoConteudo);
        li.appendChild(pensamentoAutoria);
        li.appendChild(pensamentoData);
        
        li.appendChild(icones)

        listaPensamentos.appendChild(li)
    },

    limparFormulario() {
        const form = document.getElementById("pensamento-form");
        form.reset();
    },

    async preencherFormulario(pensamentoId) {
        const pensamento = await api.buscarId(pensamentoId);
        document.getElementById("pensamento-id").value = pensamento.id;
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo;
        document.getElementById("pensamento-autoria").value = pensamento.autoria;
        document.getElementById("pensamento-data").value = pensamento.data.toISOString().split("T")[0];
        document.getElementById("form-container").scrollIntoView()
    }
}

export default interfaceDoUser;