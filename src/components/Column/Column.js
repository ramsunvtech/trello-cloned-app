import BaseComponent from '../BaseComponent/BaseComponent.js';

const cardList = [
    {
        "id": "1",
        "title": "Break Fast",
        "description": "",
    },
    {
        "id": "2",
        "title": "Lunch",
        "description": "",
    },
    {
        "id": "3",
        "title": "Dinner",
        "description": "",
    },
];

class Column extends BaseComponent {
    constructor() {
        super();
    }

    getCardList() {
        //@todo: Card List API Goes here.
        const cards = cardList.map(card => {
            const {
                id,
                title,
            } = card;
            return `
                <app-cards>${title}</app-cards>
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
            <div class="list">
                <h3 class="list-title">${title}</h3>
                ${this.getCardList()}
            </div>
            <button class="add-card-btn btn">Add a card</button>
        `;
    }
  }
  
  export default Column;
  