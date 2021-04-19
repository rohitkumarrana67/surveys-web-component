class SurveyDetails extends HTMLElement{

  constructor(){
    super();
    $(this).css('display', 'block')
    this.template;
    this._state
    this._data = []
  }

  connectedCallback() {
    fetch('http://localhost:4002/survey/survey_details').then((response)=>{
      return response.text();
    }).then((response)=>{
      this.template = response;
      this.innerHTML = this.template;
      this.dataJSON = window.survey_data
      $(this).find('.name').text(this.dataJSON.name)
      if (this.dataJSON.description){
        $(this).find('.desc').text(this.dataJSON.description)
      }
      this.render()
    });
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "state") {
      this.setstate(newValue);
    }
  }

  render(){
    console.log(JSON.parse(this._state))
  }

}

customElements.define('survey-details', SurveyEdit);