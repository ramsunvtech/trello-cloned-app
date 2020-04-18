import BaseComponent from '../BaseComponent/BaseComponent.js';

const columnList = [
  {
    "id": "1",
    "title": "To do",
    "boardId": "1"
  },
  {
    "id": "2",
    "title": "Doing",
    "boardId": "1"
  },
  {
    "id": "3",
    "title": "Done",
    "boardId": "1"
  }
];

class Board extends BaseComponent {
  constructor() {
    super();
  }

  getColumnList() {
    //@todo: Column List API Goes here.
    const columns = columnList.map(column => {
      const {
        id,
        title,
      } = column;
      return `
                <app-column id="${id}" title="${title}"></app-column>
            `;
    });

    return columns.join('\n');
  }

  render() {
    this.innerHTML = `
            <section class="lists-container">
                ${this.getColumnList()}
                <button class="add-list-btn btn">Add a list</button>
            </section>
        `;
  }
}

export default Board;
