import Loader from './components/Loader/Loader.js';
import Header from './components/Header/Header.js';
import Board from './components/Board/Board.js';
import Column from './components/Column/Column.js';
import Card from './components/Card/Card.js';
import AddColumnForm from './components/Column/AddColumnForm.js';
import AddCardForm from './components/Card/AddCardForm.js';
import TrelloApp from './TrelloApp.js';

// Add Custom Elements Once Document is Ready.
document.addEventListener('readystatechange', event => {
  if (event.target.readyState === 'complete') {
    customElements.define('app-loader', Loader);
    customElements.define('app-header', Header);
    customElements.define('app-board', Board);
    customElements.define('app-column', Column);
    customElements.define('app-card', Card);
    customElements.define('add-column-form', AddColumnForm);
    customElements.define('add-card-form', AddCardForm);
    customElements.define('trello-app', TrelloApp);
  }
});
