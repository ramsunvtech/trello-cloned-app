import BaseComponent from '../BaseComponent/BaseComponent.js';

const templateCardCreator = document.createElement('template');
templateCardCreator.innerHTML = `
  <div class="card-composer">
    <form id="new-card-form" class="card-creator">
      <div class="card" style="padding: 6px 8px; margin: 0;">
        <div>
          <textarea class="textarea-input" placeholder="Enter a Title for this card" style="height:34px;"></textarea>
        </div>
        <button class="add-button primary" type="submit">Add card</button>
      </div>
    </form>
  </div>
`;

class AddCardForm extends BaseComponent {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(templateCardCreator.content.cloneNode(true));
    this.$form = this.querySelector('form');
    this.$titleInput = this.querySelector('.textarea-input');

    this.$form.addEventListener('submit', e => {
      e.preventDefault();
      document.dispatchEvent(
        new CustomEvent('cardCreation', {
          detail: { description: this.$titleInput.value },
        })
      );
    });
  }

  disconnectedCallback() { }

  render() {
    // this.innerHTML = `
    //   <button class="add-card-btn btn">+ Add another card</button>
    // `;
  }
}

export default AddCardForm;