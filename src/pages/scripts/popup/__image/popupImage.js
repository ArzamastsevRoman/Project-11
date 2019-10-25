import Popup from '../popup';

export default class PopupImage extends Popup {
	constructor (...args) {
		super (...args)
		this.popupImage = document.querySelector('.popup__image');
		this.popupImageClose = this.popupImage.querySelector('#image-close');
		
		this.close = this.close.bind(this);

		this.popupImageClose
			.addEventListener('click', this.close);
	}

	setImage (imgUrl) {
		this.container.querySelector('.popup__image-link').setAttribute('src', imgUrl);
	}

	close () {
  		this.popupImage.classList.remove('popup_is-opened');
	}
}
