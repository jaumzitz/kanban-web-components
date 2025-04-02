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
                    <li><slot></slot></li>
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
        const taskContent = slot.assignedNodes().find(node => node.nodeType === Node.TEXT_NODE);

        if (!taskContent) {
            console.error("Nenhum conteúdo de texto encontrado no slot.");
            return;
        }

        const input = document.createElement("input");
        input.type = "text";
        input.value = ''//taskContent.textContent.trim();
        input.placeholder = taskContent.textContent.trim()
        input.size = 36
        
        // Substitui o conteúdo do slot pelo input
        input.addEventListener("blur", () => {
            

            const newSlot = document.createElement("slot")
            newSlot.value = input.value
            
            input.parentNode.appendChild(newSlot)

            /* 
            const newText = document.createElement("span").innerText = input.value

            newSlot.assign(newText);

            slot.parentNode.replaceChild(taskContent, input); */
        });

        

        
        slot.parentNode.replaceChild(input, slot);   
        //slot.parentNode.replaceChild(input, slot);
        
        input.focus();
    }


}

customElements.define('task-item', TaskItem)


