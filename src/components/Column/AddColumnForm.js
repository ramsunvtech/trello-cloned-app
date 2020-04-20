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
    super();
  }

  postRender() {
    this.appendChild(templateColumnCreator.content.cloneNode(true));

    this.$form = this.querySelector('form');
    this.$input = this.querySelector('input');
    this.$form.addEventListener('submit', e => {
      e.preventDefault();

      if (!this.$input.value) return; 
      this.dispatchEvent(
        new CustomEvent('columnCreation', { detail: { title: this.$input.value } })
      );
      this.$input.value = '';
    });
  }

  disconnectedCallback() { }

  render() {
    // this.innerHTML = `
    //   <button class="add-list-btn btn">+ Add another list</button>
    // `;
  }
}

export default AddColumnForm;