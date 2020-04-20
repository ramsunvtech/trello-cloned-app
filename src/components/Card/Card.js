import BaseComponent from '../BaseComponent/BaseComponent.js';

class Card extends BaseComponent {
  constructor() {
    super();
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');

    this.innerHTML = `
      <div class="card" draggable="true" id="${id}" ondragstart="">
        <span class="item name">${name}</span>
        <span class="item action">
          <a href="#" class="edit">E</a> | 
          <a href="#" class="delete">X</a>
        </span>
      </div>
    `;
  }
}

export default Card;
