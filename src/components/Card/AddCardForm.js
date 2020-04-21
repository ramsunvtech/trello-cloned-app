import BaseComponent from '../BaseComponent/BaseComponent.js';

const templateCardCreator = document.createElement('template');
templateCardCreator.innerHTML = `
  <div class="card-composer">
    <form id="new-card-form" class="card-creator">
      <div class="add-card" style="padding: 6px 8px; margin: 0;">
        <div>
          <textarea class="textarea-input" placeholder="Enter a Title for this card" style="height:34px;"></textarea>
        </div>
        <button class="add-button primary" type="submit">Add card</button>&nbsp;<a href="#" class="cancel">Cancel</a>
      </div>
    </form>
  </div>
`;

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

  onUpdate() {
    // this.appendChild(templateCardCreator.content.cloneNode(true));
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
      this.$form.addEventListener('submit', e => {
        const columnId = this.getAttribute('column-id');
        e.preventDefault();

        this.$app.dispatchEvent(
          new CustomEvent('cardCreation', {
            detail: {
              columnId,
              value: this.$titleInput.value,
            },
          })
        );
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