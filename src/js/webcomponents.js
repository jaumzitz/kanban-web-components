class Task extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {
        
        const taskTemplate = document.createElement('template')

        taskTemplate.innerHTML = `
        <style>

        li {
            padding: 10px;
            margin: 4px 0;
            border-radius: 8px;
            background-color: rgb(255, 255, 255);
            border: 1px solid #e5e9ea;
            box-shadow: 0px 5px 8px -3px rgba(0, 0, 0, 0.041);

        }

        li:hover {
            background-color: #e7e7e759;
            cursor: grab;
        }

        </style>
        `

        taskTemplate.innerHTML += `
        
            <li id="1" draggable="true">TEMPLATE</li>
        `

        this.shadowRoot.appendChild(taskTemplate.content.cloneNode(true))


    }
}


class TaskList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({mode: "open"})
    }

    connectedCallback() {
        const listTemplate = document.createElement('template')

        listTemplate.innerHTML = `
        <style>
            ul {
                background-color: rgba(84, 72, 49, 0.04);
                max-width: 30rem;
                width: 20rem;
                padding: 10px;
                border-radius: 10px;
                list-style-type: none;
            }
        </style>
        `

        listTemplate.innerHTML += `
        <ul>
            <task-item>aaa</task-item>
            <task-item>aaa</task-item>
        </ul>    
        `

        this.shadowRoot.appendChild(listTemplate.content.cloneNode(true))
    }
}


customElements.define('task-item', Task)
customElements.define('task-list', TaskList)

