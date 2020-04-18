import BaseComponent from './components/BaseComponent/BaseComponent.js';

class TrelloGameApp extends BaseComponent {
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
            <app-header title="Trello Clone App"></app-header>
            <app-board></app-board>
        `;
    }
  }
  
  export default TrelloGameApp;
  