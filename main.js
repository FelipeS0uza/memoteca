import interfaceDoUser from "./interface.js"
import api from "./backend/api.js";

const pensamentosSet = new Set()

async function adicionarChaveAoPensamento() {
    try {
        const pensamentos = await api.buscar()
        pensamentos.forEach(pensamento => {
            const chavePensamento = `${pensamento.conteudo.trim().toLowerCase()}-${pensamento.autoria.trim().toLowerCase()}`
            pensamentosSet.add(chavePensamento)
        });
    } catch (error) {
        alert("Erro ao adicionar chave ao pensamento!")        
    }
}

function removerEspaços(string){
    return string.replaceAll(/\s+/g, '')
}

const regexConteudo = /^[A-Za-z\s]{10,}$/
function validarConteudo(conteudo) {
    return regexConteudo.test(conteudo)
}

const regexAutoria = /^[a-zA-Z]{3,15}$/;
function validarAutoria(autoria) {
  return regexAutoria.test(autoria);
}

document.addEventListener("DOMContentLoaded", () => {
    interfaceDoUser.renderizar()
    adicionarChaveAoPensamento()

    const formulario = document.getElementById("pensamento-form");
    formulario.addEventListener("submit", envioDoFormulario)

    const inputBusca = document.getElementById("campo-busca")
    inputBusca.addEventListener("input", manipularBusca)

    const cancelar = document.getElementById("botao-cancelar");
    cancelar.addEventListener("click", interfaceDoUser.limparFormulario);

})

async function envioDoFormulario(e) {
    e.preventDefault();
    const id = document.getElementById("pensamento-id").value;
    const favorito = false;
    const conteudo = document.getElementById("pensamento-conteudo").value;
    const autoria = document.getElementById("pensamento-autoria").value;
    const data = document.getElementById("pensamento-data").value;

    const conteudoSemEspacos = removerEspaços(conteudo)
    const autoriaSemEspacos = removerEspaços(autoria)

    if(!validarConteudo(conteudoSemEspacos)){
        alert("PENSAMENTO: É permitida a inclusão de apenas letras e espaços com no minímo 10 caracteres")
        return
    }

    if (!validarAutoria(autoriaSemEspacos)) {
        alert("AUTORIA: É permitida a inclusão de letras e entre 3 e 15 caracteres sem espaços")
        return
    }

    if(!validarData(data)) {
        alert("DATA: Não é permitido o cadastro da datas futuras!")
    }

    const chaveNovoPensamento = `${conteudo.trim().toLowerCase()}-${autoria.trim().toLowerCase()}`

    if(pensamentosSet.has(chaveNovoPensamento)){
        alert('Esse pensamento já existe')
        return
    }

    try {
        if (id){
            await api.editar({ id, favorito, conteudo, autoria, data })
        } else {
            await api.inserir({favorito, conteudo, autoria, data})
        }
        interfaceDoUser.renderizar();
    } catch (error) {
        alert(`Erro ao inserir novo pensamento. <br> ${error}`)
    }
}



async function manipularBusca() {
    const termoBusca = document.getElementById("campo-busca").value;
    try {
        const pensamentosFiltrados = await api.buscarPensamentoPorTermo(termoBusca);
        interfaceDoUser.renderizar(pensamentosFiltrados)
    } catch (error) {
        alert("Erro ao realizar busca")
    }
}

function validarData(data) {
    const dataAtual = new Date();
    const dataInserida = new Date(data)
    return dataInserida <= dataAtual
}