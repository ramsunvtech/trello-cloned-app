import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';

class Board extends BaseComponent {
  constructor() {
    super({
      columnList: [],
    });

    this.getColumnList();
  }

  onMount() {
    this.$app.addEventListener('onNewColumnAdded', e => this.addToBoard(e));
  }

  addToBoard(e) {
    const { columnList = [] } = this.state;
    const columns = [...columnList, e.detail];
    this.setState({ columnList: columns });
  }

  async getColumnList() {
    const {
      apiEndpoint,
    } = this.state;

    const columnListApi = await fetch(`${apiEndpoint}/columns`);
    const columnList = await columnListApi.json();

    this.setState({ columnList });
  }

  render() {
    const {
      columnList,
    } = this.state;

    this.innerHTML = `
      <section class="lists-container">
        ${columnList.map(column => {
          const {
            id,
            title,
          } = column;
          return `<app-column id="${id}" title="${title}" ></app-column>`;
        }).join('\n')}
        <add-column-form></add-column-form>
      </section>
    `;
  }
}

export default Board;
