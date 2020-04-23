import BaseComponent from '../BaseComponent/BaseComponent.js';
import { getUniqueId } from '../../Utiltities.js';
import * as API from '../../Api.js';

class AddCardForm extends BaseComponent {
  constructor() {
    super({
      canToggle: true,
    });
  }

  listenToAddLink() {
    this.$addButton = this.querySelector('.add-card-btn');

    if (this.$addButton) {
      this.$addButton.addEventListener('click', (e) => this.setState({ canToggle: false }));
    }
  }

  onMount() {
    this.listenToAddLink();
  }

  async addCard(e) {
    const columnId = this.getAttribute('column-id');

    const {
      apiEndpoint,
    } = this.state;

    const newCardItem = {
      id: getUniqueId(),
      title: this.$titleInput.value,
      description: this.$titleInput.value,
      columnId,
    };

    const newCardResponse = await API.post(`${apiEndpoint}/cards`, newCardItem);

    if (!newCardResponse.id) {
      return;
    }

    this.$app.dispatchEvent(
      new CustomEvent('onNewCardAdded', {
        detail: newCardItem,
      })
    );
  }

  onUpdate() {
    this.$form = this.querySelector('form');
    this.$titleInput = this.querySelector('.textarea-input');

    this.listenToAddLink();

    this.$cancelButton = this.querySelector('.cancel-btn');
    if (this.$cancelButton) {
      this.$cancelButton.addEventListener('click', (e) => {
        e.preventDefault();
        this.setState({ canToggle: true });
      });
    }

    if (this.$form) {
      this.$form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await this.addCard();
      });
    }
  }

  disconnectedCallback() { }

  render() {
    const {
      canToggle
    } = this.state;

    this.innerHTML = `
      ${canToggle ? `<button class="add-card-btn btn">+ Add another card</button>` : ''}
      ${!canToggle ? `<div class="card-composer">
        <form id="new-card-form" class="card-creator">
          <div class="add-card">
            <textarea class="textarea-input" placeholder="Enter a Title for this card"></textarea>
            <button class="add-button primary" type="submit">Add card</button>&nbsp;<a href="#" class="cancel-btn">Cancel</a>
          </div>
        </form>
      </div>` : ''}
    `;
  }
}

export default AddCardForm;