import BaseComponent from '../BaseComponent/BaseComponent.js';

class Card extends BaseComponent {
  constructor() {
    super({
      canEdit: false,
    });
  }

  async delete(e) {
    e.preventDefault();

    const {
      canEdit
    } = this.state;

    if (canEdit) {
      console.log('canEdit: ', canEdit);
      this.setState({
        canEdit: false,
      });
      return;
    }

    const canDelete = confirm('Are you sure to delete this card');

    if (!canDelete) {
      return;
    }

    const id = this.getAttribute('id');
    const {
      apiEndpoint,
    } = this.state;

    const deleteCard = await fetch(`${apiEndpoint}/cards/${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const deleteCardResponse = await deleteCard.json();
  }

  edit(e) {
    e.preventDefault();

    this.setState({
      canEdit: true,
    }).then(() => {
      this.querySelector('input.edit-card-input').focus();
    });
  }

  onMount() {
    this.$deleteLink = this.querySelector('a.delete');
    this.$deleteLink.addEventListener('click', e => this.delete(e));

    this.$editLink = this.querySelector('a.edit');
    this.$editLink.addEventListener('click', e => this.edit(e));
  }

  disconnectedCallback() {
    this.$deleteLink.removeEventListener('click', e => this.delete(e));
    this.$editLink.removeEventListener('click', e => this.edit(e));
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const {
      canEdit
    } = this.state;

    this.innerHTML = `
      <div class="card" draggable="true" id="card-${id}" ondragstart="">
        ${!canEdit ? `<span class="item name" contenteditable="${canEdit}">${name}</span>` : ''}
        ${canEdit ? `<input id="edit-column-input-${id}" class="edit-card-input" type="text" value="${name}" />`: ''}
        <span class="item action">
          <a href="#" class="edit">E</a> | 
          <a href="#" class="delete">X</a>
        </span>
      </div>
    `;
  }
}

export default Card;
