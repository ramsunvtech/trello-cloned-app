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
    this.$app.addEventListener('columnCreation', this.addColumn.bind(this));
  }

  disconnectedCallback() { }

  async addColumn(e) {
    const { title } = e.detail;
    const {
      apiEndpoint,
      columnList,
    } = this.state;

    const newColumnItem = {
      "id": getUniqueId(),
      "title": title,
      "boardId": "1",
    };
    
    const newColumn = await fetch(`${apiEndpoint}/columns`, {
      method: 'POST',
      body: JSON.stringify(newColumnItem),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const newColumnResponse = await newColumn.json();

    if (!newColumnResponse.id) {
      return;
    }

    const columns = [...columnList, newColumnItem];
    console.log('columns: ', columns);

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
