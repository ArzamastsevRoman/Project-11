import Popup from '../popup';
import {api} from '../../index';

export default class PopupEdit extends Popup {
	constructor (container, button) {
		super (container, button)
		this.popupFormEdit = this.container.querySelector('#popupFormEdit');
		this.popupFormEditInputName = this.popupFormEdit.elements.name;
		this.popupFormEditInputAbout = this.popupFormEdit.elements.about;
		this.popupEditButton = this.popupFormEdit.querySelector('button');

		this.errorEditName = this.popupFormEdit.querySelector('#error__name');
		this.errorEditAbout = this.popupFormEdit.querySelector('#error__about');
		
		this.save = this.save.bind(this);
		this.diactivatedEditButton = this.diactivatedEditButton.bind(this);
		this.validateTextField = this.validateTextField.bind(this);
		this.validate = this.validate.bind(this);

		this.popupFormEdit
			.addEventListener('submit', this.save);

		this.popupFormEdit
			.addEventListener('input', this.diactivatedEditButton);

		this.popupFormEdit
			.addEventListener('input', this.validate);
	}

	open () {
		this.container.classList.add('popup_is-opened');
		this.popupFormEditInputName.value = document.querySelector('.user-info__name').textContent;
  		this.popupFormEditInputAbout.value = document.querySelector('.user-info__job').textContent;
  	}


   	close () {
		this.container.classList.remove('popup_is-opened');
		this.popupFormEdit.querySelector('#error__name').textContent = '';
  		this.popupFormEdit.querySelector('#error__about').textContent = '';
  	}

  	save (e) {
		e.preventDefault();
		if (e.key === 'Enter') {
	  		this.container.classList.remove('popup_is-opened');
		}
		this.container.classList.remove('popup_is-opened');

		api.getInitialEdit(this.popupFormEditInputName.value, this.popupFormEditInputAbout.value)
			.then(res => { console.log(res); });
		api.getUser()
			.then(res => { document.querySelector('.user-info__name').textContent = res.name; });
		api.getUser()
			.then(res => { document.querySelector('.user-info__job').textContent = res.about; });
	}

	diactivatedEditButton () {
		if (!this.popupFormEditInputName.checkValidity() || !this.popupFormEditInputAbout.checkValidity()) {
			this.popupEditButton.setAttribute('disable', true);
			this.popupEditButton.classList.add('popup__button-edit_disable');
			this.popupEditButton.classList.remove('popup__button-edit');
		} else {
			this.popupEditButton.removeAttribute('disable');
			this.popupEditButton.classList.remove('popup__button-edit_disable');
			this.popupEditButton.classList.add('popup__button-edit');
		}
	}

	validateTextField (field) {
  		if (field.value.length === 0) {
	 		return 'Это обязательное поле';
  		} else if (field.value.length <= 1 || field.value.length > 30) {
	  		return 'Должно быть от 2 до 30 символов';
  		}
  		return '';
	}
	
	validate () {
  		const nameErrorText = this.validateTextField(this.popupFormEditInputName);
  		this.errorEditName.textContent = nameErrorText;
  		const aboutErrorText = this.validateTextField(this.popupFormEditInputAbout);
  		this.errorEditAbout.textContent = aboutErrorText;

  		if (nameErrorText === '' && aboutErrorText === '') {
	  		this.popupEditButton.removeAttribute('disabled');
	  		this.popupEditButton.classList.add('popup__button-edit');
  		}	else {
	  		this.popupEditButton.setAttribute('disabled', true);
	  		this.popupEditButton.classList.remove('popup__button-edit');
  		}
	}

}
