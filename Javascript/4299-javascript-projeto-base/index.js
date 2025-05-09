import verifyEmptyList from "./scrips/verifyEmptyList.js";
import addNewProduct from "./scrips/addNewProduct.js"; 


const addItemInList = document.getElementById("adicionar-item");
const buyList = document.getElementById("lista-de-compras");

verifyEmptyList(buyList);

addItemInList.addEventListener("click", (ev) => {
    ev.preventDefault();
    addNewProduct();
    verifyEmptyList(buyList);
})


