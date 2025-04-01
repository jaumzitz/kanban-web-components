taskIndex = 3



function addTask(content, listId) {
    const task = document.createElement('task-item')
    task.id = `task-${++taskIndex}`
    task.draggable = true
    task.textContent = content

    const list = document.getElementById(listId)
    task.addEventListener("dragstart", dragstartHandler)
    list.appendChild(task)
}

function removeTask(taskId) {
    const task = document.getElementById(taskId)
    task.remove()
}
