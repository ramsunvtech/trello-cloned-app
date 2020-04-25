import { apiEndpoint } from '../../config.js';

class BaseComponent extends HTMLElement {
  constructor(state = {}) {
    super();

    this.state = {
      ...state,
      apiEndpoint,
    };

    this.$app = document.querySelector('trello-app');
  }

  async renderCycle() {
    await this.render();
    await this.onMount();
  }

  async connectedCallback() {
    await this.renderCycle();
  }

  setState(state, canReRender = true) {
    return new Promise(resolve => {
      this.state = {
        ...this.state,
        ...state,
      };
  
      if (canReRender) {
        this.render();
        this.onUpdate();
      }
      resolve();
    })
  }

  preRender() {}

  render() {}

  onMount() {}

  onUpdate() {}
}

export default BaseComponent;
