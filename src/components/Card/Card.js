import BaseComponent from '../BaseComponent/BaseComponent.js';
import * as API from '../../Api.js';

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
    //@todo: Delete API removes all the data, issue #885. 
    //Implementing PATCH with softdelete
    const softDeleteItem = {
      isDeleted: true
    };

    const deleteCardResponse = await API.patch(`${apiEndpoint}/cards/${id}/`, softDeleteItem);

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

    this.$card = this.querySelector('div.card');
    this.$card.addEventListener('dragstart', e => this.moveCard(e));

  }

  disconnectedCallback() {
    this.$deleteLink && this.$deleteLink.removeEventListener('click', e => this.delete(e));
    this.$editLink && this.$editLink.removeEventListener('click', e => this.edit(e));
  }

  moveCard(e) {
    const id = this.getAttribute('id');
    const title = this.getAttribute('name');
    const columnId = this.getAttribute('column');

    e.dataTransfer.setData("card", JSON.stringify({ id, title, columnId }));
  }

  render() {
    const name = this.getAttribute('name');
    const id = this.getAttribute('id');
    const {
      canEdit
    } = this.state;

    this.innerHTML = `
      <div class="card" draggable="true" id="card-${id}">
        ${!canEdit ? `<span class="item name" contenteditable="${canEdit}">${name}</span>` : ''}
        ${canEdit ? `<input id="edit-column-input-${id}" class="edit-card-input" type="text" value="${name}" />` : ''}
        <span class="item action">
          <a href="#" class="edit">E</a> | 
          <a href="#" class="delete">X</a>
        </span>
      </div>
    `;
  }
}

export default Card;
