class SurveyOverview extends HTMLElement {

  COMPONENTS_URL = {
    'assigned-container'   : "http://localhost:4001/overview/assigned_container.js",
    'recent-container'     : "http://localhost:4001/overview/recent_container.js",
    'new-survey-popup'     : "http://localhost:4001/new_survey/new_survey_popup.js",
  }

  constructor(){
    super();
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

  events(){
    this.querySelector('#create-survey').addEventListener('click', this.openNewSurveyModal.bind(this))
  }

  renderAssignedSurveyContainer(){
    this.fetchComponent('assigned-container').then(()=>{
      $(this).find('#assigned-surveys').html('<assigned-container></assigned-container>')
    }).catch((e)=>{
      console.log(e)
    })
  }

  renderRecentSurveyContainer(){
    this.fetchComponent('recent-container').then(()=>{
      $(this).find('#recent-created-surveys').html('<recent-container></recent-container>')
    }).catch((e)=>{
      console.log(e)
    })
  }

  openNewSurveyModal(){
    this.fetchComponent('new-survey-popup').then(()=>{
      $('body').append('<new-survey-popup />')
    }).catch((e)=>{
      console.log(e)
    })
  }

  fetchComponent(urlKey){
    return new Promise((resolve,reject)=>{
      if(!window.customElements.get(urlKey)){
        $.getScript(this.COMPONENTS_URL[urlKey]).done(()=>resolve()).fail(()=>reject())
      }else{
        resolve();
      }
    })
  }

}

customElements.define('survey-overview', SurveyOverview);