import BaseComponent from '../BaseComponent/BaseComponent.js';

// Styles.
import { getStyles } from './Loader.styles.js';

class Loader extends BaseComponent {
  constructor() {
    super({
      onProgress: false,
    });
  }

  render() {
    const {
      onProgress,
    } = this.state;

    if (!onProgress) {
      return;
    }

    this.innerHTML = `
      ${getStyles()}
      <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
    `;
  }
}

export default Loader;
