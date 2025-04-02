class TaskList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }


    connectedCallback() {

        this.addEventListener("dragover", this.dragoverHandler.bind(this))
        this.addEventListener("drop", this.dropHandler.bind(this))

        const listId = this.getAttribute("id")

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
        <ul id="${listId}-list">
            <slot></slot>            
        </ul>    
        `

        this.shadowRoot.appendChild(listTemplate.content.cloneNode(true))

        

    }

    disconectedCallback() {
        return
    }

    dragoverHandler(event) {
        event.preventDefault()
        //event.dataTransfer.dropEffect = "move"
    }

    dropHandler(event) {
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

}
customElements.define('task-list', TaskList)
