import BaseComponent from '../BaseComponent/BaseComponent.js';

class Board extends BaseComponent {
  constructor() {
    super({
      columnList: [],
    });

    this.getColumnList();
  }

  postRender() {
    this.$columnCreator = this.querySelector('add-column-form');
    this.$columnCreator.addEventListener('columnCreation', this.addColumn.bind(this));
  }

  disconnectedCallback() { }

  addColumn(e) {
    const { title } = e.detail;
  }

  async getColumnList() {
    const {
      apiEndpoint,
    } = this.state;

    const data = await fetch(`${apiEndpoint}/columns`);
    const response = await data.json();

    const columnList = response.map(column => {
      const {
        id,
        title,
      } = column;
      return `<app-column id="${id}" title="${title}" ></app-column>`;
    });
    this.setState({ columnList });
  }

  render() {
    const {
      columnList,
    } = this.state;

    this.innerHTML = `
      <section class="lists-container">
          ${columnList.join('\n')} 
          <add-column-form></add-column-form>
      </section>
    `;
  }
}

export default Board;
