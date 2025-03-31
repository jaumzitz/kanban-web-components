taskIndex = 0


document.addEventListener("DOMContentLoaded", () => {


    const list = document.querySelector("task-list")
    list.addTask('Nova página', ++taskIndex)



})


function addTaskToList(taskName, listId) {
    const list = document.getElementById(listId)
    
    list.addTask(taskName, ++taskIndex)
}


addTaskToList('adicionado a lista', 'in-progress-list')
