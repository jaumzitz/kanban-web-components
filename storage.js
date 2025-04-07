window.addEventListener('storage', (event) => {
    
    console.log(event)
    
    
})



window.addEventListener('load', () => {
    localStorage.setItem('Veio do Local Storage', 'done')
    localStorage.setItem('Mais uma do storage', 'done')
     

    for (let i = 0; i < localStorage.length; i++) {
        let taskTitle = localStorage.key(i)
        let taskStatus = localStorage.getItem(taskTitle)
        loadTasks(taskTitle, taskStatus)
    }

})

const loadTasks = (name, status) => {
    const task = document.createElement('task-item')
    
    task.id = `task-${++taskIndex}`
    task.draggable = true

    const taskTitle = document.createElement('span')
    taskTitle.setAttribute('slot', 'task')
    taskTitle.innerHTML = name

    task.appendChild(taskTitle)

    const list = document.getElementById(`${status}-list`)
    list.appendChild(task)
}

