/* function dragstartHandler(event) {
    //add o id do elemento alvo ao objeto dataTransfet
    event.dataTransfer.dropEffect = "move"
    event.dataTransfer.setData("id", event.target.id)
    console.log(event)
//    console.log(event.target)
}

window.addEventListener("DOMContentLoaded", () => {
    //obtem o elemento pelo id
    const items = document.querySelectorAll('li')

    //add o listener ondragstart ao elemento
    items.forEach(e => e.addEventListener("dragstart", dragstartHandler))


    const lists = document.querySelectorAll('ul')

    

    lists.forEach((e) => {
        e.addEventListener("drop", dropHandler)
        e.addEventListener("dragover", dragoverHandler)
    })

})



 */