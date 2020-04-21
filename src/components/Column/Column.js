import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';

class Column extends BaseComponent {
  constructor() {
    super();
  }

  onMount() {
    this.getCard();
    this.$app.addEventListener('cardCreation', e => this.addCard(e));
  }

  async addCard(e) {
    const id = this.getAttribute('id');
    const {
      columnId,
      value,
    } = e.detail;

    if (columnId !== id) {
      return;
    }

    const {
      apiEndpoint,
      cardList
    } = this.state;

    const newCardItem = {
      "id": getUniqueId(),
      "title": value,
      "description": value,
      "columnId": id,
    };
    const newCard = await fetch(`${apiEndpoint}/cards`, {
      method: 'POST',
      body: JSON.stringify(newCardItem),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const newCardResponse = await newCard.json();

    if (!newCardResponse.id) {
      return;
    }
    const card = [...cardList, newCardItem];

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
