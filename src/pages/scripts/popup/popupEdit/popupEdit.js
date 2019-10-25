import Popup from '../Popup';
import {api} from '../../index';

export default class PopupEdit extends Popup {
	constructor (container, button) {
		super (container, button)
		this.popupFormEdit = this.container.querySelector('#popupFormEdit');
		this.popupFormEditInputName = this.popupFormEdit.elements.name;
		this.popupFormEditInputAbout = this.popupFormEdit.elements.about;
		this.save = this.save.bind(this);

		this.popupFormEdit
			.addEventListener('submit', this.save);
	}

	open () {
		this.container.classList.add('popup_is-opened');
		this.popupFormEditInputName.value = document.querySelector('.user-info__name').textContent;
  		this.popupFormEditInputAbout.value = document.querySelector('.user-info__job').textContent;
  	}


   	close () {
		this.container.classList.remove('popup_is-opened');
		popupFormEdit.querySelector('#error__name').textContent = '';
  		popupFormEdit.querySelector('#error__about').textContent = '';
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
}