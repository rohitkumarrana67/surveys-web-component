class AllSurveysContainer extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/all_surveys_container').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.renderSurveys()
    })
  }

}

customElements.define('all-surveys-container', AllSurveysContainer);
