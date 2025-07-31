const URL_BASE = "http://localhost:3000"

const api = {
    async buscarPensamentos () {
        try {
            const response = await axios.get(`${URL_BASE}/pensamentos`)
            return response.data
        } catch (error) {
            alert(`Erro: ${error}` )
            throw error
        }
    },

    async salvarPensamento (pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos`,{
                method:"POST", 
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return response.json()
        } catch (error) {
            alert(`Erro: ${error}`)
        }
    },

    async buscarPensamentoPorId (id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`)
            return response.json()
        } catch (error) {
            alert(`Erro: ${error}` )
            throw error
        }
    },

    async editarPensamento (pensamento) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${pensamento.id}`, {
                method:"PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(pensamento)
            })
            return response.json()
        } catch (error) {
            alert(`Erro: ${error}`)
        }
    },

    async excluirPensamento (id) {
        try {
            const response = await fetch(`${URL_BASE}/pensamentos/${id}`, {
                method: "DELETE"
            })
        } catch (error) {
            alert(`Erro: ${error}`)
        }
    }
}

export default api;
