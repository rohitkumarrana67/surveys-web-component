class AssignedSurvey extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/assigned_survey').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
    })
  }
}

customElements.define('assigned-survey', AssignedSurvey);