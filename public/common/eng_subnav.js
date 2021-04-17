class EngSubnav extends HTMLElement{

  constructor(){
    super();
    this.template = `<nav class='nav nav-subtabs navbar-expand'>
                      <ul class='navbar-nav'>
                      </ul>
                     </nav>`
    this._navItems;
    this._navItemsIDs
  }

  connectedCallback(){
    this._navItems = this.getAttribute('navItems');
    this._navItemsIDs = this.getAttribute('navItemsIDs');
    this.populateNavItems();
  }

  populateNavItems(){

  }

}

customElements.define('eng-subnav', EngSubnav);

