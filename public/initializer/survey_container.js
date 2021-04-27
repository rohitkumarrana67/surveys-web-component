class SurveyContainer extends HTMLElement{

  COMPONENTS_URL = {
    'survey-overview'      : "http://localhost:4001/overview/overview.js",
    'all-surveys-container': "http://localhost:4001/all_surveys/all_surveys_container.js"
  }

  static get observedAttributes() {
    return ['type','data-id'];
  }

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
        let type = window.location.hash.split('/')[2]
        this.renderSurveyDetails(type);
        break;
      default:
        break;
    }
  }

  renderOverview(){
    this.fetchComponent('survey-overview').then(()=>{
      $(this).find('#survey-main-content').html('<survey-overview></survey-overview>')
    }).catch((e)=>{
      console.log(e)
    })
  }

  renderDashboard() {
    $(this).find('#survey-main-content').html("This is dashboard");
  }

  renderAllSurveys() {
    this.fetchComponent('all-surveys-container').then(()=>{
      $(this).find('#survey-main-content').html('<all-surveys-container></all-surveys-container>')
    }).catch((e)=>{
      console.log(e)
    })
  }

  renderTemplateLibrary() {
    $(this).find('#survey-main-content').html("This is template library");
  }

  renderReports() {
    $(this).find('#survey-main-content').html("This is reports");
  }

  renderSurveyDetails(type) {
    if(!window.customElements.get('survey-details')){
      $.getScript('http://localhost:4001/details/survey_details.js', ()=>{
        $(this).find('#survey-main-content').html(`<survey-details type="${type}" data-id=${this.survey_id}></survey-details>`);
      })
    } else {
      $(this).find('#survey-main-content').html(`<survey-details type="${type}" data-id=${this.survey_id}></survey-details>`);
    }
  }

  attributeChangedCallback(attr, oldValue, newValue) {
    if(attr == 'type' && oldValue !== newValue){
      this.type = newValue;
      this.render();
    }
    if(attr == 'data-id' && oldValue !== newValue){
      this.survey_id = newValue;
    }
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

customElements.define('survey-container', SurveyContainer);