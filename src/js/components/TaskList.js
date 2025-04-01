class TaskList extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    
    connectedCallback() {

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

        const list = this.shadowRoot.querySelector("ul")

    }

}
customElements.define('task-list', TaskList)
