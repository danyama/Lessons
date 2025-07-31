import api from "./api.js"

const ui = {
    async renderizarPensamentos () {
        try {
            const pensamentos = await api.buscarPensamentos()
            if (pensamentos.length === 0){
                this.mostrarListaVazia()
                return
            }
            pensamentos.forEach( pensamento => this.adicionarPensamentoNaLista(pensamento) );
        } catch (error) {
            alert(`Erro: ${error}`)
        } 
    },

    mostrarListaVazia () {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const containerListaVazia = document.createElement("div")
        containerListaVazia.classList.add("container-lista-vazia")
        const mensagemListaVazia = document.createElement("h3")
        mensagemListaVazia.innerText = "Nada por aqui ainda, que tal compartilhar alguma ideia?"
        mensagemListaVazia.classList.add("mensagem-lista-vazia")
        containerListaVazia.appendChild(mensagemListaVazia)
        const imagemListaVazia = document.createElement("img")
        imagemListaVazia.src = "./assets/imagens/lista-vazia.png"
        imagemListaVazia.classList.add("imagem-lista-vazia")
        containerListaVazia.appendChild(imagemListaVazia)
        listaPensamentos.appendChild(containerListaVazia)
    },

    adicionarPensamentoNaLista (pensamento) {
        const listaPensamentos = document.getElementById("lista-pensamentos");
        const li = document.createElement("li")
        li.setAttribute("data-id", pensamento.id);
        li.classList.add("li-pensamento");

        const iconeAspas = document.createElement("img")
        iconeAspas.src = "./assets/imagens/aspas-azuis.png"
        iconeAspas.alt = "Aspas azuis"
        iconeAspas.classList.add("icone-aspas")
        li.appendChild(iconeAspas)

        const conteudoPensamento = document.createElement("div")
        conteudoPensamento.classList.add("pensamento-conteudo")
        conteudoPensamento.textContent = pensamento.conteudo
        li.appendChild(conteudoPensamento)

        const autoriaPensamento = document.createElement("div")
        autoriaPensamento.classList.add("pensamento-autoria")
        autoriaPensamento.textContent = pensamento.autoria
        li.appendChild(autoriaPensamento)

        const icones = document.createElement("div")
        icones.classList.add("icones")

        const btnEditar = document.createElement("button")
        btnEditar.classList.add("botao-editar")
        btnEditar.onclick = () => ui.preencherFormulario(pensamento.id)
        const iconeEditar = document.createElement("img")
        iconeEditar.src = "./assets/imagens/icone-editar.png"
        btnEditar.appendChild(iconeEditar)
        icones.appendChild(btnEditar)
        
        const btnExcluir = document.createElement("button")
        btnExcluir.classList.add("botao-excluir")
        btnExcluir.onclick= async () => {
            try {
                await api.excluirPensamento(pensamento.id)
                ui.renderizarPensamentos()
                
            } catch (error) {
                alert("Erro ao excluir pensamento")
            }

        }
        const iconeExcluir = document.createElement("img")
        iconeExcluir.src = "./assets/imagens/icone-excluir.png"
        btnExcluir.appendChild(iconeExcluir)
        icones.appendChild(btnExcluir)

        li.appendChild(icones)

        listaPensamentos.appendChild(li)
    },

    async preencherFormulario (pensamentoId) {
        const pensamento = await api.buscarPensamentoPorId(pensamentoId);

        document.getElementById("pensamento-id").value = pensamento.id
        document.getElementById("pensamento-conteudo").value = pensamento.conteudo
        document.getElementById("pensamento-autoria").value = pensamento.autoria
    },

    
}

export default ui;
