import BaseComponent from '../BaseComponent/BaseComponent.js';

const templateColumnCreator = document.createElement('template');

templateColumnCreator.innerHTML = `
  <div class="column-wrapper mod-add">
    <div class="column">
      <div class="column-creator">
        <form id="new-column-form">
          <input id="new-column-input" class="add-column-input" type="text" placeholder="Enter list title..." />
          <button class="primary add-button" type="submit">Add another column</button>
        </form>
      </div>
    </div>
  </div>
`;

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

  onUpdate() {
    // this.appendChild(templateColumnCreator.content.cloneNode(true));

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

    this.$form.addEventListener('submit', e => {
      e.preventDefault();

      if (!this.$input.value) return; 
      this.$app.dispatchEvent(
        new CustomEvent('columnCreation', { detail: { title: this.$input.value } })
      );
      this.$input.value = '';
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