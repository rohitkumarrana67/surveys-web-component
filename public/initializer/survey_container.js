class SurveyContainer extends HTMLElement{

  constructor(){
    super();
    this.template;
    if(!window.customElements.get("eng_subnav")){
      $.getScript('http://localhost:4001/common/eng_subnav.js', ()=>{})
    }
  }

  connectedCallback(){
    this.type = this.getAttribute('type') || 'overview'
    this.survey_id = this.getAttribute('data-id');
    fetch(`http://localhost:4002/survey/survey_container?type=${this.type}`).then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.render();
    })
  }

  render(){
    switch (this.type) {
      case 'overview':
        this.renderOverview();
        break;
      case 'dashboard':
        this.renderDashboard();
        break;
      case 'all_surveys':
        this.renderAllSurveys();
        break;
      case 'template_library':
        this.renderTemplateLibrary();
        break;
      case 'reports':
        this.renderReports();
        break;
      case 'details':
        this.renderSurveyDetails();
        break;
      default:
        break;
    }
  }

  renderOverview(){
    if(!window.customElements.get('survey-overview')){
      $.getScript('http://localhost:4001/overview/overview.js', ()=>{
        $(this).find('#survey-main-content').html('<survey-overview></survey-overview>')
      })
    } else {
      $(this).find('#survey-main-content').html('<survey-overview></survey-overview>')
    }
  }

  renderDashboard() {
    $(this).find('#survey-main-content').html("This is dashboard");
  }

  renderAllSurveys() {
    $(this).find('#survey-main-content').html("This is all surveys");
  }

  renderTemplateLibrary() {
    $(this).find('#survey-main-content').html("This is template library");
  }

  renderReports() {
    $(this).find('#survey-main-content').html("This is reports");
  }

  renderSurveyDetails() {
    $(this).find('#survey-main-content').html("This is survey details");
  }

  static get observedAttributes() {
    return ['type'];
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(attr == 'type' && oldValue !== newValue){
      this.type = newValue;
      this.render();
    }
  }
}

customElements.define('survey-container', SurveyContainer);