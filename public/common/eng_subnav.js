class EngSubnav extends HTMLElement{

  constructor(){
    super();
    this.template = `<nav class='nav nav-subtabs navbar-expand'>
                      <ul class='navbar-nav'>
                      </ul>
                     </nav>`
    this._navItems;
    this._activeItem;
  }

  connectedCallback(){
    this._navItems = this.getAttribute('navItems');
    this._activeItem = this.getAttribute('activeItem') || 'overview';
    this.innerHTML = this.template;
    this.populateNavItems();
    this.addEventListeners();
  }

  populateNavItems(){
    let nav_items = this._navItems.split(',');
    for(let item of nav_items){
      item = item.trim();
      $(this).find('ul').append(`<li class="nav-item ${item.replace(' ', '_').toLowerCase()}"><a class="nav-link" href="${window.location.pathname}#${item.replace(' ', '_').toLowerCase()}">${item}</a></li>`);
    }
    $(this).find(`.${this._activeItem}`).addClass('active');
  }

  addEventListeners(){
    $(this).find('li.nav-item').on('click', this.changeActiveItem.bind(this));
  }

  changeActiveItem(e) {
    target = $(e.currentTarget);
    debugger
    $(this).find('li.active').removeClass('active');
    target.addClass('active');
  }

}

customElements.define('eng-subnav', EngSubnav);

