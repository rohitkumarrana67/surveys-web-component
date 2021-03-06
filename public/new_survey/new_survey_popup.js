class NewSurveyPopup extends HTMLElement{

  constructor(){
    super()
    this.template;
    this.dataJSON = {};
  }

  connectedCallback(){
    fetch("http://localhost:4002/survey/new_survey_popup").then(response => {
      return response.text();
    }).then(response => {
      this.template = response
      this.innerHTML = this.template;
      $(this).find('.modal').modal('show')
      $(this).find('.save').on('click', this.createSurvey.bind(this))
      $(window).on('hidden.bs.modal',()=>{
        $(this).remove()
      })
    })
  }

  validateFields(){
    if($(this).find('input.survey-name').val() === ''){
      $(this).find('input.survey-name').addClass('border-danger');
      return false;
    }
    return true;
  }

  createSurvey(){
    if(this.validateFields()){
      this.dataJSON['name'] = $(this).find('input.survey-name').val();
      this.dataJSON['description'] = $(this).find('textarea.description').val();
      window.survey_data = this.dataJSON;
      window.survey_data["id"] = 1;
      $('eng-subnav').trigger('clear_active_item')
      $(this).find('.modal').modal('hide')
      window.location.assign("#survey/1")
    }
  }

}

customElements.define('new-survey-popup', NewSurveyPopup);