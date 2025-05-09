import createDate from "./createDate.js";


const buyList = document.getElementById("lista-de-compras");
const inputItem = document.getElementById("input-item");

let checkboxCount = 0;


function addNewProduct () {
    //create html tag
    const listItem = document.createElement('li');

    const listItemContainer = document.createElement('div');
    listItemContainer.classList.add("lista-item-container");

    const inputCheckbox = document.createElement("input");
    inputCheckbox.type = "checkbox";
    inputCheckbox.id = "checkbox-" + checkboxCount++;

   
    if (inputItem.value == "") {
        alert("Insira um produto")
        return
    }
    
    const itemName = document.createElement("p");
    itemName.innerText = inputItem.value;

    inputCheckbox.addEventListener('click', () => {
        if (inputCheckbox.checked){
            itemName.style.textDecoration = "line-through";
        } else {
            itemName.style.textDecoration = "none";
        }
    });

    listItemContainer.appendChild(inputCheckbox);
    listItemContainer.appendChild(itemName);

    const dateInfo = document.createElement("p");
    dateInfo.classList.add("texto-data");
    dateInfo.innerText = createDate();

    listItem.appendChild(listItemContainer);
    listItem.appendChild(dateInfo);
    buyList.appendChild(listItem);

}

export default addNewProduct;