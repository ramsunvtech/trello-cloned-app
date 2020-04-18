import BaseComponent from './components/BaseComponent/BaseComponent.js';

class TrelloApp extends BaseComponent {
    constructor() {
        super({
            status: 'initial',
        });
    }

    setButtonStatus() {
        this.setState({
            status: 'clicked',
        });
    }

    connectedCallback() {
        document.getElementById('submit').addEventListener('click', () => this.setButtonStatus());
    }

    disconnectedCallback() {
        document.getElementById('submit').removeEventListener('click', () => this.setButtonStatus());
    }

    render() {
        const app = this.getAttribute('app');
        const {
            status
        } = this.state;

        this.innerHTML = `
            <h1>${app} App here</h1>
            <button id="submit">Click</button>
            Status: ${status}
        `;
    }
  }
  
  export default TrelloApp;
  