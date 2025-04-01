
//Adiciona os eventos para as tasks iniciais
window.addEventListener("DOMContentLoaded", () => {
    const tasks = document.querySelectorAll("task-item")
    tasks.forEach((task) => {
        task.addEventListener("dragstart", dragstartHandler)
    })


    const lists = document.querySelectorAll("task-list")
    lists.forEach((list) => {
        list.addEventListener("dragover", dragoverHandler)
        list.addEventListener("drop", dropHandler)
    })
}) 



function dragstartHandler(event) {
        //add o id do elemento alvo ao objeto dataTransfet
        event.dataTransfer.dropEffect = "move"
        event.dataTransfer.setData("id", event.target.id)
        
}

function dragoverHandler(event) {
    event.preventDefault()
    //event.dataTransfer.dropEffect = "move"
}

function dropHandler(event) {
    event.preventDefault()
    

    const data = event.dataTransfer.getData("id")
    

    
    // Verifica se o elemento alvo é um task-item ou task-list
    if (event.target.tagName === "TASK-ITEM") {
        
        event.target.parentNode.appendChild(document.getElementById(data), event.target.nextSibling)
        return
    } 
    if (event.target.tagName === "TASK-LIST") {
        event.target.appendChild(document.getElementById(data))
        return
    }

    //event.target.parentNode.insertBefore(document.getElementById(data), event.target)
}