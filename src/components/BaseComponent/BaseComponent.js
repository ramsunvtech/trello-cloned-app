import { apiEndpoint } from '../../config.js';

class BaseComponent extends HTMLElement {
  constructor(state = {}) {
    super();

    this.state = {
      ...state,
      apiEndpoint,
    };

    this.render();
  }

  setState(state, canReRender = true) {
    this.state = {
      ...this.state,
      ...state,
    };

    if (canReRender) {
      this.render();
    }
  }

  render() {
    this.innerHTML = '';
  }
}

export default BaseComponent;
