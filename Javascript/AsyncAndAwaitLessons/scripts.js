// Link Figma 
// https://www.figma.com/community/file/1410409546403062951

const submitImageButton = document.getElementById("submit-image-button");
const uploadImageInput = document.getElementById("image-upload");

submitImageButton.addEventListener("click", () =>{ 
    uploadImageInput.click();

})

function readFileContent (file) {
    // const file = event.target.files[0];
    // fileContentDisplay.textContent = ""; // Clear previous file content
    // messageDisplay.textContent = ""; // Clear previous messages

    // // Validate file existence and type
    // if (!file) {
    //     alert("No file selected. Please choose a file.", "error");
    //     return;
    // }

    // if (!file.type.startsWith("text")) {
    //     alert("Unsupported file type. Please select a text file.", "error");
    //     return;
    // }

    return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        
        fileReader.onload = () => {
            resolve({ url:fileReader.result, name: file.name });
        }
        fileReader.onerror = () => {
            reject(`Erro na leitura do arquivo${file.name}`);

        }

        fileReader.readAsDataURL(file)
    })
}

const uploadImage = document.querySelector(".upload-image");
const uploadImageName = document.querySelector(".upload-list p");


uploadImageInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];

    // // Validate file existence and type
    // if (!file) {
    //     alert("No file selected. Please choose a file.", "error");
    //     return;
    // }

    // if (!file.type.startsWith("text")) {
    //     alert("Unsupported file type. Please select a text file.", "error");
    //     return;
    // }

    if (file) {
        try {
            const fileContent = await readFileContent(file);
            uploadImage.src = fileContent.url;
            uploadImageName.textContent = fileContent.name;

        } catch (error) {
            alert("Erro na leitura" + error);
        }
    } 
})

const tagInput = document.querySelector(".tags-input");
const tagList = document.querySelector(".project-tags-list");

let tagcount = 0;

const avaibleTagList = ["Front-end", "Programação", "Data Science", "Full-Stack", "oi"];

async function verifyTag (tagName) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(avaibleTagList.includes(tagName));
        }, 1000);
    })
}


tagInput.addEventListener("keypress", async (event) => {
    if (event.key == "Enter") {
        event.preventDefault();
        const textTag = tagInput.value.trim();
        
        if (await verifyTag(textTag)){
            const tagId = tagcount++;
            const newTag = document.createElement("li");
            const closeIcon = document.createElement("img");
            closeIcon.src = "./img/close-black.svg";
            closeIcon.id = `closetag-${tagId}`;
            closeIcon.classList = "remove-tag";

            newTag.classList = "project-tag";
            newTag.id = `tag-${tagId}`;
            newTag.textContent = textTag;
            newTag.appendChild(closeIcon);

            tagList.appendChild(newTag);
        } else {
            alert ("tag inválida")
        }
        

    }
})

const tagsList = document.getElementById("tag-list");

tagsList.addEventListener("click", (event) => {
    console.log(event.target.classList)
    if (event.target.classList.contains("remove-tag")) {
        const deleteTag = event.target.parentElement;
        tagsList.removeChild(deleteTag);
    }
})


const publishButton = document.getElementById("publish-project");

const projectNameInput = document.getElementById("project-name");
const projectDescription = document.getElementById("project-description");

async function publishProject(projectName, projectDescription, projectTags) {
    const projectData = {
        name: projectName,
        description: projectDescription,
        tags: projectTags, 
    }
    return new Promise( (resolve, reject) => {
        //To test request error
        const isSuccess = Math.random() > 0.3;

        if (isSuccess) {
            resolve(projectData);
        } else {
            reject("erro na submissão");
        }
    })


}

publishButton.addEventListener("click", async (event) => {
    const projectTags = Array.from(tagsList.querySelectorAll("li")).map((tag) => {return tag.textContent});

    event.preventDefault();  

    try {
        const result = await publishProject(projectNameInput.value, projectDescription.value, projectTags)
        console.log(result);
    } catch (error) {
        alert("Erro na publicação: " + error);
    }
})

const descartButton = document.getElementById("discard-button");

descartButton.addEventListener("click", (event) => {
    event.preventDefault();

    //reset form
    const projectForm = document.querySelector("form");
    projectForm.reset();

    //reset image
    uploadImage.src = "./img/imagem1.png";
    uploadImageName.textContent = "image_projeto.png";
    
    //delete tags
    tagList.querySelectorAll("li").forEach((tag) => {tag.remove()})

})