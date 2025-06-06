import interfaceDoUser from "./interface.js"
import api from "./backend/api.js";

document.addEventListener("DOMContentLoaded", () => {
    interfaceDoUser.renderizar()

    const formulario = document.getElementById("pensamento-form");
    formulario.addEventListener("submit", envioDoFormulario)

})

async function envioDoFormulario(e) {
    e.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;

    try {
        if (id){
            await api.editar({ id, conteudo, autoria })
        } else {
            await api.inserir({conteudo, autoria})
        }
        interfaceDoUser.renderizar();
    } catch (error) {
        alert(`Erro ao inserir novo pensamento. <br> ${error}`)
    }
}

const cancelar = document.getElementById("botao-cancelar");
cancelar.addEventListener("click", interfaceDoUser.limparFormulario);