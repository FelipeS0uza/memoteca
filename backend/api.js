const url = "http://localhost:3000/pensamentos";

const api = {
    async buscar() {
        try{
            const response = await fetch(url);
            return await response.json()
        } catch (error) {
            // alert(`Erro ao buscar pensamentos: ${error}`)
            const erro = document.getElementById("lista-pensamentos")
            erro.innerHTML = `Erro ao buscar pensamentos. <br>   ${error}`
        }
    },

    async inserir(pensamento) {
        try{
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json()
        } catch (error) {
            const erro = document.getElementById("lista-pensamentos")
            erro.innerHTML = `Erro ao buscar pensamentos. <br>   ${error}`
        }
    },

    async buscarId(id) {
        try {
            const response = await fetch(`${url}/${id}`);
            return await response.json()
        } catch (error) {
            alert(`Erro ao buscar o pensamento. ${error}`)
        }
    },

    async editar(pensamento) {
        try{
            const response = await fetch(`${url}/${pensamento.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            });
            return await response.json()
        } catch (error) {
            alert(`Erro ao editar o pensamento selecionado: ${error}`)
        }
    },

    async excluir(id) {
        try {
            const response = await fetch(`${url}/${id}`, {
                method: "DELETE"
            });
        } catch (error) {
            alert("Erro ao apagar pensamento")
        }
    }

}

export default api;