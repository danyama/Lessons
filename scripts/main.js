import ui from "./ui.js";
import api from "./api.js"

const btnAdicionarPensamento = document.getElementById("botao-salvar")

//Renderizar pensamentos
document.addEventListener("DOMContentLoaded", () => {
    ui.renderizarPensamentos()

    //Adicionar pensamento
    const formularioPensamento = document.getElementById("pensamento-form")
    formularioPensamento.addEventListener("submit", manipularSubmissaoFormulario)

    //botao cancelar
    const btnCancelarPensamento = document.getElementById("botao-cancelar")
    btnCancelarPensamento.addEventListener("click", (ev) => {
        ev.preventDefault()

        formularioPensamento.reset()
    })
})

async function manipularSubmissaoFormulario(event) {
    event.preventDefault();

    const id = document.getElementById("pensamento-id").value
    const conteudo = document.getElementById("pensamento-conteudo").value
    const autoria = document.getElementById("pensamento-autoria").value

    try {
        if (id){
            await api.editarPensamento({id, conteudo, autoria})
        } else {
            await api.salvarPensamento({conteudo, autoria})
        }
        ui.renderizarPensamentos()


    } catch (error) {
        alert(`Erro: ${error}`)
    }
}
// //Adicionar pensamento
// btnAdicionarPensamento.addEventListener("click", (event) => {

// })