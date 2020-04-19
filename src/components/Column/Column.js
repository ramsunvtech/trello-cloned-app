import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';

class Column extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.getCard();
    this.$cardCreator = this.querySelector('card-creator');
    // this.$cardCreator.addEventListener('cardCreation', this.addCard.bind(this));
  }

  addCard(e) {
    const card = [...cardList, {
      "id": ID(),
      "title": e.detail.description,
      "description": e.detail.description
    }]
    this.setState({ cardList: card });
  }

  async getCard() {
    const { apiEndpoint } = this.state;
    const data = await fetch(`${apiEndpoint}/cards`);
    const response = await data.json();
    this.setState({ cardList: response });
  }

  getCardList() {
    const id = this.getAttribute('id');
    const { cardList = [] } = this.state;
    //@todo: Card List API Goes here. 
    const data = cardList.filter(data => data.columnId === id);
    const cards = (data || []).map(card => {
      const {

        id,
        title,
      } = card;
      return `
        <li>
          <app-card
            draggable="true" id=${getUniqueId()}
            ondragstart="drag(event)"
            name="${title}"
          ></app-cards>
        </li>
      `;
    });

    return `
      <ul class="list-items">
        ${cards.join('\n')}
      </ul>
    `;
  }

  render() {
    const title = this.getAttribute('title');

    this.innerHTML = `
      <div class="list" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h3 class="list-title">${title}</h3> 
        ${this.getCardList()}
        <add-card-form></add-card-form>
      <div>
    `;
  }
}

export default Column;
