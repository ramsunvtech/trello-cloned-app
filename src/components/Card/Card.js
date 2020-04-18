import BaseComponent from '../BaseComponent/BaseComponent.js';

class Card extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const title = this.getAttribute('title');

    this.innerHTML = `
            <li>${title}</li>
        `;
  }
}

export default Card;
