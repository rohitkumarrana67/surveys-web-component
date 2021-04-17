class SurveyOverview extends HTMLElement {

  constructor(){
    super()
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/survey_overview').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.renderAssignedSurveyContainer()
    })
  }

  renderAssignedSurveyContainer(){
    $.getScript('http://localhost:4001/overview/assigned_container.js', ()=>{
      $(this).find('#assigned-surveys').html('<assigned-container></assigned-container>')
    })
  }

}

customElements.define('survey-overview', SurveyOverview);