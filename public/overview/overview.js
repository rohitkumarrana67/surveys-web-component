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
      this.renderRecentSurveyContainer()
      this.events()
    })
  }

  renderAssignedSurveyContainer(){
    if(!window.customElements.get('assigned-container')){
      $.getScript('http://localhost:4001/overview/assigned_container.js', ()=>{
        $(this).find('#assigned-surveys').html('<assigned-container></assigned-container>')
      })
    } else {
      $(this).find('#assigned-surveys').html('<assigned-container></assigned-container>')
    }
  }

  renderRecentSurveyContainer(){
    if(!window.customElements.get('recent-container')){
      $.getScript('http://localhost:4001/overview/recent_container.js', ()=>{
        $(this).find('#recent-created-surveys').html('<recent-container></recent-container>')
      })
    } else {
      $(this).find('#recent-created-surveys').html('<recent-container></recent-container>')
    }
  }

  events(){
    this.querySelector('#create-survey').addEventListener('click', this.openNewSurveyModal.bind(this))
  }

  openNewSurveyModal(){
    if(!window.customElements.get('new-survey-popup')){
      $.getScript('http://localhost:4001/new_survey/new_survey_popup.js', ()=>{
        $('body').append('<new-survey-popup />')
      })
    } else {
      $('body').append('<new-survey-popup/>')
    }
  }

}

customElements.define('survey-overview', SurveyOverview);