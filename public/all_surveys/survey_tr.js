class SurveyTR extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/survey_tr').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
    })
  }

}

customElements.define('survey-tr', SurveyTR);