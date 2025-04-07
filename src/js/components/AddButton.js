class AddButton extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {

       
        const listId = this.getAttribute("list-id")

        this.addEventListener("click", this.addTask.bind(this))

        console.log(listId)
        const buttonTemplate = document.createElement('template')

        buttonTemplate.innerHTML = `
            <style>
                button {
                    border-radius: 6px;
                    padding: 4px 8px;
                    border: none;
                    font-weight: bolder;
                    font-size: 18px;
                    color: #979797;
                    background-color: transparent;
                }

                button:hover {
                    background-color: #d9d9d95d;
                    cursor: pointer;
                    transition: 200ms;
                }
            </style>
        `

        buttonTemplate.innerHTML += `
            <button id="add-task">+</button>
        `

        this.shadowRoot.appendChild(buttonTemplate.content.cloneNode(true))
        

    }

    disconnectedCallback() {
        this.removeEventListener("click", this.addTask.bind(this))
    }

    addTask() {

        
        const task = document.createElement('task-item')
        
        task.id = `task-${++taskIndex}`
        task.draggable = true
        
        const taskTitle = document.createElement('span')
        taskTitle.setAttribute('slot', 'task')
        taskTitle.innerHTML = 'Nova tarefa (Clique para editar)'
        
        const taskStatus = this.getAttribute("list-id")
               
        
        task.appendChild(taskTitle)
    
        
        const list = document.getElementById(taskStatus)
        
        //localStorage.setItem(taskTitle.innerHTML, taskStatus.replace('-list', ''))
        
        list.appendChild(task)
    }
}

customElements.define("add-button", AddButton)