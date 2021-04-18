class AssignedContainer extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/assigned_container').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.renderAssignedSurveys()
    })
  }

  renderAssignedSurveys(){
    if(!window.customElements.get('assigned-survey')){
      $.getScript('http://localhost:4001/overview/assigned_survey.js', ()=>{
        for (let i=0;i<5;i++){
          $(this).find('#assigned-list-container').append('<assigned-survey></assigned-survey>')
        }
      })
    } else {
      for (let i=0;i<5;i++){
        $(this).find('#assigned-list-container').append('<assigned-survey></assigned-survey>')
      }
    }
  }

}

customElements.define('assigned-container', AssignedContainer);