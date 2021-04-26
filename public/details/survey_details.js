class SurveyDetails extends HTMLElement{

  constructor(){
    super();
    this.template;
    this.type;
    this.survey_id;
    if(!window.customElements.get("eng_subnav")){
      $.getScript('http://localhost:4001/common/eng_subnav.js', ()=>{})
    }
  }

  connectedCallback() {
    this.type = this.getAttribute('type');
    this.survey_id = this.getAttribute('data-id');
    fetch(`http://localhost:4002/survey/survey_details?type=${this.type}&survey_id=${this.survey_id}`).then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.renderDetailsTopSection();
      this.renderDetailsMainSection();
    });
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