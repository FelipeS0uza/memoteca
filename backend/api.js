const url = "http://localhost:3000/pensamentos";

const converterStringParaData = (dataString) => {
    const [ano, mes, dia] = dataString.split("-")

    return new Date(Date.UTC(ano, mes - 1, dia))
}

const api = {
    async buscar() {
        try {
            const response = await axios.get(url);
            const pensamentos = await response.data

            return pensamentos.map(pensamento => {
                return {
                    ...pensamento,
                    data: new Date(pensamento.data)
                }
            })
        } catch (error) {
            const erro = document.getElementById("lista-pensamentos")
            erro.innerHTML = `Erro ao buscar pensamentos. <br>   ${error}`
        }
    },

    async inserir(pensamento) {
        try {
            const data = converterStringParaData(pensamento.data);
            const response = await axios.post(url, {
                ...pensamento,
                data: data.toISOString()
            });
            return await response.data
        } catch (error) {
            const erro = document.getElementById("lista-pensamentos")
            erro.innerHTML = `Erro ao buscar pensamentos. <br>   ${error}`
        }
    },

    async buscarId(id) {
        try {
            const response = await axios.get(`${url}/${id}`);
            const pensamento = await response.data

            return {
                ...pensamento,
                data: new Date(pensamento.data)
            }
        } catch (error) {
            alert(`Erro ao buscar o pensamento. ${error}`)
        }
    },

    async editar(pensamento) {
        try {
            const response = await axios.put(`${url}/${pensamento.id}`, pensamento);
            return await response.data
        } catch (error) {
            alert(`Erro ao editar o pensamento selecionado: ${error}`)
        }
    },

    async excluir(id) {
        try {
            const response = await axios.delete(`${url}/${id}`);
        } catch (error) {
            alert("Erro ao apagar pensamento")
        }
    },

    async buscarPensamentoPorTermo(termo) {
        try {
            const pensamentos = await this.buscar();
            const termoMinusculo = termo.toLowerCase();

            const pensmaentosFiltrados = pensamentos.filter(pensamento => {
                return (pensamento.conteudo.toLowerCase().includes(termoMinusculo) || pensamento.autoria.toLowerCase().includes(termoMinusculo))
            })

            return pensmaentosFiltrados
        } catch (error) {
            alert("Erro ao filtar pensamentos" + error)
        }
    },

    async atualizarFavoritos(id, favorito) {
        try {
            const response = await axios.patch(`${url}/${id}`, { favorito })
            return response.data
        } catch (error) {
            alert("Erro ao atualizar favorito")
        }
    }

}

export default api;