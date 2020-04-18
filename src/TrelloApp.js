import BaseComponent from './components/BaseComponent/BaseComponent.js';

class TrelloApp extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const app = this.getAttribute('app');

    this.innerHTML = `
            <app-header title="Trello Clone App"></app-header>
            <app-board></app-board>
        `;
  }
}

export default TrelloApp;
