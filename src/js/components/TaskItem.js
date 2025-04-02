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
        // Obtém o conteúdo do slot
        const slot = this.shadowRoot.querySelector("slot");
        console.log(slot)
                
        const taskContent = slot.assignedNodes()[0]

        if (!taskContent) {
            console.error("Nenhum conteúdo de texto encontrado no slot.");
            return;
        }

        const input = document.createElement("input");
        input.type = "text";
        input.value = ''
        input.placeholder = taskContent.textContent.trim()
        input.size = 36
        
        //Ao finalizar a edição, substitui o input pelo slot novamente
        input.addEventListener("blur", () => {
            
            

            const newContent = document.createElement("slot")
            
            newContent.setAttribute("slot", "task")
            newContent.innerText = input.value
            
            input.parentNode.replaceChild(newContent, input);
         
        });

        
        input.setAttribute("slot", "editInput")
        
        slot.parentNode.replaceChild(input, slot);   
        //slot.parentNode.replaceChild(input, slot);
        
        input.focus();
    }


}

customElements.define('task-item', TaskItem)


