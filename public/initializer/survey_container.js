class SurveyContainer extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/survey_container').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.renderOverView()
    })
  }

  renderOverView(){
    $.getScript('http://localhost:4001/overview/overview.js', ()=>{
      $(this).find('#survey-main-content').html('<survey-overview></survey-overview>')
    })
  }
}

customElements.define('survey-container', SurveyContainer);