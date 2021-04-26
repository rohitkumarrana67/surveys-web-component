class EngSubnav extends HTMLElement{

  static get observedAttributes() {
    return ['activeitem'];
  }

  constructor(){
    super();
    this.template = `<nav class='nav nav-subtabs navbar-expand'>
                      <ul class='navbar-nav'>
                      </ul>
                     </nav>`
    this._navItems;
    this._activeItem;
    this._baseURL;
  }

  connectedCallback(){
    this._navItems = this.getAttribute('navItems');
    this._activeItem = this.getAttribute('activeItem') || 'overview';
    this._baseURL = this.getAttribute('base-url') || '';
    this.innerHTML = this.template;
    this.populateNavItems();
    this.addEventListeners();
  }

  populateNavItems(){
    let nav_items = this._navItems.split(',');
    for(let item of nav_items){
      item = item.trim();
      let item_name = item.replace(' ', '_').toLowerCase();
      $(this).find('ul').append(`<li class="nav-item ${item_name}" value="${item_name}">
                                  <a class="nav-link" href="${window.location.pathname}#${this._baseURL}${item_name}">${item}</a>
                                </li>`);
    }
    $(this).find(`.${this._activeItem}`).addClass('active');
  }

  addEventListeners(){
    $(this).find('li.nav-item').on('click', this.changeActiveItem.bind(this));
    $(this).on('clear_active_item', this.clearActiveItem.bind(this))
  }

  changeActiveItem(e) {
    let target_val = e.currentTarget.getAttribute('value');
    this.clearActiveItem();
    $(`.${target_val}`).addClass('active');
    $(this).attr('activeItem', target_val);
  }

  clearActiveItem() {
    $(this).find('li.active').removeClass('active');
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(attr == 'activeitem' && oldValue !== newValue) {
      if($(this).find(`.${newValue}`).length == 0) {
        this.clearActiveItem();
      }
    }
  }

}

customElements.define('eng-subnav', EngSubnav);

