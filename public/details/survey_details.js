class SurveyDetails extends HTMLElement{

  constructor(){
    super();
    this.template = `<div>
                      <div id = "details-top-section"></div>
                      <div id = "details-main-section"></div>
                    </div>`;
  }

  connectedCallback() {
    this.innerHTML = this.template;
    this.renderDetailsTopSection()
    this.renderDetailsMainSection()
  }

  renderDetailsTopSection() {
    if(!window.customElements.get('details-top')){
      $.getScript('http://localhost:4001/details/details_top_section.js', ()=>{
        $(this).find('#details-top-section').html('<details-top></details-top>');
      })
    } else {
      $(this).find('#details-top-section').html('<details-top></details-top>');
    }
  }

  renderDetailsMainSection() {
    if(!window.customElements.get('details-main')){
      $.getScript('http://localhost:4001/details/details_main_section.js', ()=>{
        $(this).find('#details-main-section').html('<details-main></details-main>');
      })
    } else {
      $(this).find('#details-main-section').html('<details-main></details-main>');
    }
  }

}

customElements.define('survey-details', SurveyDetails);