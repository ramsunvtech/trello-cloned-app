import Header from './components/Header/Header.js';
import Column from './components/Column/Column.js';
import Board from './components/Board/Board.js';
import TrelloApp from './TrelloApp.js';

(() => {
  customElements.define('app-header', Header);
  customElements.define('app-board', Board);
  customElements.define('app-column', Column);
  customElements.define('trello-app', TrelloApp);
})();
