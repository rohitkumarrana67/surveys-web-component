class RecentSurvey extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/recent_survey').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
    })
  }

}

customElements.define('recent-survey', RecentSurvey);