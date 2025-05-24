


function mostrarLivros(livros) {
    const booksSection = document.getElementById("livros");
    booksSection.innerHTML= '';
    console.log(livros)

    livros.forEach( (livro) => {
        //create book tag
        const livroDados = document.createElement("div");
        livroDados.classList = "livro";

        //create book image tag
        const imagemLivro = document.createElement("img");
        // if (livro.quantidade) {
        //     imagemLivro.classList = "livro__imagens";
        // } else {
        //     imagemLivro.classList = "livro__imagens indisponivel";
        // }

        imagemLivro.classList = livro.quantidade > 0? "livro__imagens" : "livro__imagens indisponivel";
        imagemLivro.src = livro.imagem;
        imagemLivro.alt = livro.alt;

        livroDados.appendChild(imagemLivro);

        //create book title tag
        const tituloLivro = document.createElement("h2");
        tituloLivro.classList = "livro__titulo";
        tituloLivro.innerText = livro.titulo;

        livroDados.appendChild(tituloLivro);

        //create book description tag
        const descricaoLivro = document.createElement("p");
        descricaoLivro.classList = "livro__descricao";
        descricaoLivro.innerText = livro.autor;

        livroDados.appendChild(descricaoLivro);

        //create book price tag 
        const precoLivro = document.createElement("p");
        precoLivro.classList = "livro__preco";
        precoLivro.innerText= `R$${Number(livro.preco).toFixed(2)}`;

        livroDados.appendChild(precoLivro);


        //create book tags tag
        const tagsLivro = document.createElement("div");
        tagsLivro.classList = "tags";

        const categoriaLivro = document.createElement("span");
        categoriaLivro.classList = "tag";
        categoriaLivro.innerText = livro.categoria;

        tagsLivro.appendChild(categoriaLivro);
        
        livroDados.appendChild(tagsLivro);

        booksSection.appendChild(livroDados);

    });
}
let livros = [];
const endpoindAPI = "https://guilhermeonrails.github.io/casadocodigo/livros.json";

async function getBuscarLivros() {
    const result = await fetch(endpoindAPI);
    livros = await result.json();


    discount = 0.5;
    livros = livros.map((livro) => ({
        ...livro,
        preco: (livro.preco * (1 - discount)).toFixed(2),
    }))

    mostrarLivros(livros);
}

getBuscarLivros()



//Filter using tag/category
function filterBooks (keyword) {
    let filteredBooks = livros.filter((livro) => livro.categoria == keyword)

    mostrarLivros(filteredBooks);

}



const buttons = document.querySelectorAll(".btn");
const filterButtonsByCategoryTypes = ["front-end", "back-end", "dados"];

buttons.forEach((button) => {
    if (filterButtonsByCategoryTypes.includes(button.value) ){
        button.addEventListener("click", (event) => {
            event.preventDefault();


            filterBooks(button.value);
        })
    }
})

//Show avaibles books

const buttonAvaibleBooks = document.getElementById("btnLivrosDisponiveis");

buttonAvaibleBooks.addEventListener("click", (event) => {
    const avaibleBooks = livros.filter((livro) => livro.quantidade > 0);
    mostrarLivros(avaibleBooks);
})


//Order by price

const buttonOrderByPrice = document.getElementById("btnOrdenarPorPreco");

buttonOrderByPrice.addEventListener("click", (event) => {
    event.preventDefault();
    const sortBooksByPrice = livros.sort((a, b) => a.preco - b.preco);
    mostrarLivros(sortBooksByPrice);
})
