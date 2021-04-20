class DetailsTopSection extends HTMLElement {

  constructor() {
    super()
    this.template
  }

  connectedCallback() {
    fetch('http://localhost:4002/survey/details_top_section').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
    });
  }
}  

customElements.define('details-top', DetailsTopSection);