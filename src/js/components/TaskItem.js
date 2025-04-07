class TaskItem extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {

        this.setAttribute("draggable", true)
        this.addEventListener("dragstart", this.dragstartHandler.bind(this))
        this.addEventListener("click", this.editTask.bind(this))

        /*Não executa o restante caso o shadowRoot já tenha conteúdo (corrige o problema de dupliciade ao fazer drag and drop)*/
        if (this.shadowRoot.children.length > 0) {
            return
        }

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
                    <li>
                        <slot name="task"></slot>
                        <slot name="editInput"></slot>
                    </li>
                    `

        this.shadowRoot.appendChild(taskTemplate.content)

        const listItem = this.shadowRoot.querySelector("task-item");
    }

    disconnectedCallback() {
        this.removeEventListener("dragstart", this.dragstartHandler.bind(this))
    }


    dragstartHandler(event) {
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("id", this.id);
    }

    editTask() {

        // Obtém os slots do shadow DOM
        const taskSlot = this.shadowRoot.querySelector("slot[name='task']")
        const inputSlot = this.shadowRoot.querySelector("slot[name='editInput']")
        
        const taskContent = taskSlot.assignedNodes()[0]
 
        //Cria um template para o input
        const inputTemplate = document.createElement('template')
        inputTemplate.innerHTML = `
            <input type="text" value="" placeholder="${taskContent.textContent.trim()}" size="36" slot="editInput">
        `

        //Remove o slot de texto e adiciona o input
        taskSlot.assignedNodes()[0].remove()
        this.appendChild(inputTemplate.content.cloneNode(true))

        const input = this.querySelector("input")

        //Ao clicar fora do input, o slot com o novo texto é adicionado e o input é removido
        input.addEventListener("blur", () => {

            const newSpanSlot = document.createElement("span")
            newSpanSlot.setAttribute("slot", "task")
            newSpanSlot.innerText = input.value.trim() === '' ? taskContent.textContent.trim() : input.value

            this.replaceChild(newSpanSlot, input)

            
            localStorage.removeItem(taskContent.textContent)
            localStorage.setItem(newSpanSlot.innerText, 'not-started')
        });

        input.focus();
    }


}

customElements.define('task-item', TaskItem)


