import BaseComponent from '../BaseComponent/BaseComponent.js';

class Header extends BaseComponent {
    constructor() {
        super();
    }

    render() {
        const title = this.getAttribute('title');

        this.innerHTML = `
            <header class="masthead">
                <div class="boards-menu">
                    <div class="board-search">
                        <input type="search" class="board-search-input" aria-label="Enter to Search Board" placeholder="Enter to Search Board">
                        <i class="fas fa-search search-icon" aria-hidden="true"></i>
                    </div>
                </div>

                <div class="logo">
                    <h1><i class="fab fa-trello logo-icon" aria-hidden="true"></i>${title}</h1>
                </div>
            </header>
        `;
    }
  }
  
  export default Header;
  