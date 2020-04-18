import Header from './components/Header/Header.js';
import Card from './components/Card/Card.js';
import Column from './components/Column/Column.js';
import Board from './components/Board/Board.js';

import TrelloApp from './TrelloApp.js';

(() => {
    customElements.define('app-header', Header);
    customElements.define('app-board', Board);
    customElements.define('app-column', Column);
    customElements.define('app-cards', Card);
    customElements.define('trello-app', TrelloApp);
})();
