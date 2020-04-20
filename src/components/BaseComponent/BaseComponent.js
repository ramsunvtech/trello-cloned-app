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
    await this.preRender();
    await this.render();
    await this.postRender();
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

  postRender() {}

  onUpdate() {}
}

export default BaseComponent;
