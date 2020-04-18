class TrelloGameApp extends HTMLElement {
    constructor() {
        super();
  
        this.render();
    }
  
    render() {  
        this.innerHTML = `
            <h1>Trello App here</h1>
        `;
    }
  }
  
  export default TrelloGameApp;
  