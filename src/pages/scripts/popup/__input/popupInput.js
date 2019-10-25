import Popup from '../popup';
import {api} from '../../index';
export default class PopupInput extends Popup {

	constructor (container, button) {
		super (container, button)
		this.popupForm = this.container.querySelector('.popup__form');
		this.popupInputName = this.popupForm.elements.name;
		this.popupInputLink = this.popupForm.elements.link;

		this.save = this.save.bind(this);
		this.inputValidate = this.inputValidate.bind(this);
		this.validate = this.validate.bind(this);

		this.popupForm
			.addEventListener('submit', this.save);

		this.popupInputName
			.addEventListener('click', this.inputValidate);
		this.popupInputLink
			.addEventListener('click', this.inputValidate);
		this.popupInputName
			.addEventListener('input', this.inputValidate);
		this.popupInputLink
			.addEventListener('input', this.inputValidate);
	}

	open () {
		super.open()
		this.popupInputName.value = '';
		this.popupInputLink.value = '';
	}

	close () {
		super.close()
		this.popupForm.querySelector('#error__title').textContent = '';
  		this.popupForm.querySelector('#error__link').textContent = '';
	}

	save (e) {
		e.preventDefault();
		api.addCard(this.popupInputName.value, this.popupInputLink.value).then(res => { console.log(res); });
		if (e.key === 'Enter') {
	  		this.container.classList.remove('popup_is-opened');
		}
		this.container.classList.remove('popup_is-opened');
	}

	inputValidate(e) {
		this.validate(e.target);
	}
	
	validate(element) {
		const errorElement = this.popupForm.querySelector(`#error__${element.id}`);
		
		if (element.validity.tooShort) {
			errorElement.textContent = 'Должно быть от 2 до 30 символов';
			element.parentNode.classList.remove('popup__input-content');
			element.parentNode.classList.add('popup__input-content_invalid');
		  } else if (element.validity.valueMissing) {
			errorElement.textContent = 'Это обязательное поле';
			element.parentNode.classList.remove('popup__input-content');
			element.parentNode.classList.add('popup__input-content_invalid');
		  } else {
			element.parentNode.classList.add('popup__input-content');
			element.parentNode.classList.remove('popup__input-content_invalid');
			errorElement.textContent = '';
		  }
	}
	
}