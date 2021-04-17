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
        break;
      case 'template_library':
        break;
      case 'reports':
        break;
      default:
        break;
    }
  }

  renderOverview(){
    $.getScript('http://localhost:4001/overview/overview.js', ()=>{
      $(this).find('#survey-main-content').html('<survey-overview></survey-overview>')
    })
  }

  renderDashboard() {
    $(this).find('#survey-main-content').html("This is dashboard");
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