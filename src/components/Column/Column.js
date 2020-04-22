import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';
import * as API from '../../Api.js';

class Column extends BaseComponent {
  constructor() {
    super({
      cardList: [],
      searchFor: ''
    });
  }

  onMount() {
    this.getCard();
    this.$app.addEventListener('onNewCardAdded', e => this.addToCardList(e));
    this.$app.addEventListener('onBoardSearch', e => this.boardSearch(e));
  }

  boardSearch(e) {
    this.setState({
      searchFor: e.detail,
    });
  }

  addToCardList(e) {
    const columnId = this.getAttribute('id');
    
    if (columnId !== e.detail.columnId) {
      return;
    }

    const { cardList = [] } = this.state;
    const card = [...cardList, e.detail];
    this.setState({ cardList: card });
  }

  async getCard() {
    const { apiEndpoint } = this.state;
    const cardListResponse = await API.get(`${apiEndpoint}/cards`);
    this.setState({ cardList: cardListResponse });
  }

  getCardList() {
    const columnId = this.getAttribute('id');
    const { cardList = [], searchFor = '' } = this.state;

    const columnCards = cardList
      .filter(card => {
        const isColumnMatched = (card.columnId === columnId);

        if (!searchFor) {
          return isColumnMatched;
        }

        return isColumnMatched && card.title.search(searchFor) >= 0;
      })
      .map(card => {
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
        ${columnCards.join('\n')}
      </ul>
    `;
  }

  render() {
    const title = this.getAttribute('title');
    const columnId = this.getAttribute('id');

    this.innerHTML = `
      <div class="list" ondrop="drop(event)" ondragover="allowDrop(event)">
        <h3 class="list-title">${title}</h3> 
        ${this.getCardList()}
        <add-card-form column-id="${columnId}"></add-card-form>
      <div>
    `;
  }
}

export default Column;
