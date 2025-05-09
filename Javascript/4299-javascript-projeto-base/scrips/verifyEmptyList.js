const emptyListMessage = document.querySelector(".empty-list-message");

function verifyEmptyList (buyList) {
    const listItems = buyList.querySelectorAll("li");
    if (listItems.length === 0){
        emptyListMessage.style.display = 'block';
    } else {
        emptyListMessage.style.display = 'none';

    }
};

export default verifyEmptyList;