class DetailsMainSection extends HTMLElement {

  constructor() {
    super();
    this.template;
  }

  connectedCallback() {
    fetch('http://localhost:4002/survey/details_main_section').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
    });
  }
}

customElements.define('details-main', DetailsMainSection);