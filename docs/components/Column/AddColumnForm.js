import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';
import * as API from '../../Api.js';

class AddColumnForm extends BaseComponent {
  constructor() {
    super({
      canToggle: true,
    });
  }

  listenToAddLink() {
    this.$addButton = this.querySelector('.add-list-btn');
  
    if (this.$addButton) {
      this.$addButton.addEventListener('click', (e) => this.setState({ canToggle: false }));
    }
  }

  onMount() {
    this.listenToAddLink();
  }

  async addColumn() {
    const {
      apiEndpoint,
    } = this.state;

    const newColumnItem = {
      id: getUniqueId(),
      title: this.$input.value,
      boardId: 1,
      isDeleted: false
    };

    const newColumnResponse = await API.post(`${apiEndpoint}/columns`, newColumnItem);

    if (!newColumnResponse.id) {
      return;
    }

    this.$app.dispatchEvent(
      new CustomEvent('onNewColumnAdded', {
        detail: newColumnItem
      })
    );
  }

  onUpdate() {
    this.$form = this.querySelector('form');
    this.$input = this.querySelector('input');

    this.listenToAddLink();
    
    this.$cancelButton = this.querySelector('.cancel-btn');
    if (this.$cancelButton) {
      this.$cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.setState({ canToggle: true });
      });
    }

    this.$form.addEventListener('submit', async (e) => {
      e.preventDefault();
      await this.addColumn();
    });
  }

  disconnectedCallback() { }

  render() {
    const {
      canToggle
    } = this.state;

    this.innerHTML = `
      ${canToggle ? `<button class="add-list-btn btn">+ Add another list</button>` : ''}
      ${!canToggle ? `<div class="column-wrapper mod-add">
        <div class="column">
          <div class="column-creator">
            <form id="new-column-form">
              <input id="new-column-input" class="add-column-input" type="text" placeholder="Enter list title..." />
              <button class="primary add-button" type="submit">Add another column</button>&nbsp;<a href="#" class="cancel-btn">Cancel</a>
            </form>
          </div>
        </div>
      </div>` : ''}
    `;
  }
}

export default AddColumnForm;