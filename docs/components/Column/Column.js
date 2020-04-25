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

    //todo: need to restrict based on drop column
    this.$app.addEventListener('dragover', e => this.ondragover(e));    
    this.$app.addEventListener('drop', e => this.onCardDrop(e));
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
    const cardListResponse = await API.get(`${apiEndpoint}/cards?isDeleted=false`);
    this.setState({ cardList: cardListResponse });
  }

  ondragover(ev) {
    ev.preventDefault();
  }

  removeFromColumn(droppedCard) {
    const { cardList = [] } = this.state;
    let filteredCardList = cardList.filter(card => !(
      card.id == droppedCard.id &&
      card.columnId == droppedCard.columnId
    ));
    console.log('filteredCardList: ', filteredCardList);
    this.setState({ cardList: filteredCardList });
  }

  addToColumn(droppedCard) {
    const columnId = this.getAttribute('id');

    const { cardList = [] } = this.state;
    droppedCard.columnId = columnId;
    const updatedCardList = [ ...cardList, droppedCard ];
    this.setState({ cardList: updatedCardList });
  }

  isValidColumn(node) {
    const columnId = this.getAttribute('id');

    return (
      node &&
      node.parentNode &&
      node.parentNode.tagName.toLowerCase() === 'app-column' &&
      columnId === node.parentNode.getAttribute('id')
    );
  }

  onCardDrop(e) {
    e.preventDefault();
    const columnId = this.getAttribute('id');
    const droppedCard = JSON.parse(e.dataTransfer.getData("card"));

    if (columnId === droppedCard.columnId) {
      this.removeFromColumn(droppedCard);
    }

    if (
      this.isValidColumn(e.target) ||
      this.isValidColumn(e.target.parentNode) ||
      this.isValidColumn(e.target.parentNode.parentNode)
    ) {
      this.addToColumn(droppedCard);
    }
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
      <ul class="list-items" class="drop-area">
        ${columnCards.join('\n')} 
      </ul>
    `;
  }

  render() {
    const title = this.getAttribute('title');
    const columnId = this.getAttribute('id');

    this.innerHTML = `
      <div class="list">
        <h3 class="list-title">${title}</h3> 
        ${this.getCardList()}
        <add-card-form column-id="${columnId}"></add-card-form>
      <div>
    `;
  }
}

export default Column;
