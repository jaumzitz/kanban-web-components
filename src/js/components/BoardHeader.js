class BoardHeader extends HTMLElement {
    constructor() {
        super()
        this.attachShadow({ mode: "open" })
    }

    connectedCallback() {

        const boardId = this.getAttribute("id")
        const boardTitle = this.getAttribute("title")
        const headerTemplate = document.createElement('template')

        headerTemplate.innerHTML = `
            <style>
                .board-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: rgba(84, 72, 49, 0.04);
                margin-bottom: 20px;
                border-radius: 10px;
                padding: 0 10px;
                max-width: 30rem;
                width: 20rem;
            }

            
            .board-title {
                display: flex;
                align-items: center;
                background-color: #d9d9d9;
                font-weight: 600;
                padding: 4px 8px;
                margin-top: 10px;
                margin-bottom: 10px;
                border-radius: 60px;

            }

            #not-started-title {
                color: #5c5b5b
            }

            #in-progress-title {
                background-color: rgba(93, 165, 206, 0.27);
                color: rgb(24, 51, 71);
            

            }

            #done-title {
                color: rgb(28, 56, 41);
                background-color: rgba(123, 183, 129, 0.27);
            }

            .in-progress .board-header {
                background-color: rgba(91, 166, 209, 0.07)
            }

            
            .done .board-header {
                background: rgba(123, 183, 129, 0.07);
            
            }

            .dot {
                margin-right: 5px;
                border-radius: 99px;
                height: 8px;
                width: 8px;
                display: inline-flex;
                flex-shrink: 0;
            }

            #not-started-dot {
                background-color: #5c5b5b
            }

            #in-progress-dot {
                background-color: rgb(24, 51, 71)
            }

            #done-dot {
                background-color: #1c3829;
            }
            </style>
         
        `

        

        headerTemplate.innerHTML += `
            <div class="board-header">
                <div id="${boardId}-title" class="board-title">
                    <div id="${boardId}-dot" class="dot"></div>
                    ${boardTitle}
                </div>
                <add-button list-id="${boardId}-list"></add-button>
            </div>
        `

        this.shadowRoot.appendChild(headerTemplate.content.cloneNode(true))
        
    }



}

customElements.define('board-header', BoardHeader)