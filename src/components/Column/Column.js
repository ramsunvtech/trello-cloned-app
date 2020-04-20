import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';

class Column extends BaseComponent {
  constructor() {
    super();
  }

  postRender() {
    this.getCard();
    document.addEventListener('cardCreation', this.addCard.bind(this));
  }

  addCard(e) {
    const id = this.getAttribute('id');
    const { cardList } = this.state;

    const card = [...cardList, {
      "id": getUniqueId(),
      "title": e.detail.description,
      "description": e.detail.description,
      "columnId": id,
    }];

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

    const data = cardList.filter(data => data.columnId === id);
    const cards = (data || []).map(card => {
      const {
        id,
        title,
        columnId,
      } = card;
      return `
        <li>
          <app-card
            id="${id}"
            name="${title}"
            column="${columnId}"
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
    const id = this.getAttribute('id');

    this.innerHTML = `
      <div class="list" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h3 class="list-title">${title}</h3> 
        ${this.getCardList()}
        <add-card-form column-id="${id}"></add-card-form>
      <div>
    `;
  }
}

export default Column;
