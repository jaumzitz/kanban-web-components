class TaskItem extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })

        //adicionar os event listeners da task-item nesse construtor
    }

    connectedCallback() {

        if (this.shadowRoot.children.length > 0) {
            return
        }
        
        const taskTemplate = document.createElement('template')
        
        console.log(this.shadowRoot)
        


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

        //listItem.addEventListener("dragstart", this.dragstartHandler);

    }


    
    dragstartHandler(event) {
        event.dataTransfer.dropEffect = "move";
        console.log(event)
        event.dataTransfer.setData("id", event.target.closest("task-item").id);
    }
}

customElements.define('task-item', TaskItem)


