import BaseComponent from '../BaseComponent/BaseComponent.js';

class Board extends BaseComponent {
  constructor() {
    super({
      columnList: [],
    });

    this.getColumnList();
  }

  getColumnList() {
    const {
      apiEndpoint,
    } = this.state;

    fetch(`${apiEndpoint}/columns`)
      .then((response) => {
        return response.json();
      }).then((data) => {
        const columnList = data.map(column => {
          const {
            id,
            title,
          } = column;
          return `
                        <app-column id="${id}" title="${title}"></app-column>
                    `;
        });
        this.setState({ columnList });
      });
  }

  render() {
    const {
      columnList,
    } = this.state;

    this.innerHTML = `
            <section class="lists-container">
                ${columnList.join('\n')}
                <button class="add-list-btn btn">Add a list</button>
            </section>
        `;
  }
}

export default Board;
