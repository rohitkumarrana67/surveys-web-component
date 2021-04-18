class RecentContainer extends HTMLElement{

  constructor(){
    super();
    this.template;
  }

  connectedCallback(){
    fetch('http://localhost:4002/survey/recent_container').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.renderRecentSurveys()
    })
  }

 renderRecentSurveys(){
  if(!window.customElements.get('new-survey-popup')){
    $.getScript('http://localhost:4001/overview/recent_survey.js', ()=>{
      for (let i=0;i<5;i++){
        $(this).find('#recent-list-container').append('<recent-survey class="col-md-4 mb-20"></recent-survey>')
      }
    })
  } else {
    for (let i=0;i<5;i++){
      $(this).find('#recent-list-container').append('<recent-survey class="col-md-4 mb-20"></recent-survey>')
    }
  }
 }

}

customElements.define('recent-container', RecentContainer);