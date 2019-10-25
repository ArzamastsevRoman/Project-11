import Card from '../card/card.js';

export default class CardList {
	constructor (container, array) {
		this.container = container;
		this.array = array;
		this.render();
		this.popupForm = document.querySelector('.popup__form');
		this.popupButton = document.querySelector('.button');
		this.popup = document.querySelector('.popup');
		this.popupAddButton = this.popupForm.querySelector('button');
		this.popupInputName = this.popupForm.elements.name;
		this.popupInputUrl = this.popupForm.elements.link;

		this.addCard = this.addCard.bind(this);
		this.render = this.render.bind(this);
		this.diactivatedAddButton = this.diactivatedAddButton.bind(this);

		this.popupForm.addEventListener('submit', this.addCard);
		this.popupButton.addEventListener('click', this.diactivatedAddButton);
		this.popupForm.addEventListener('input', this.diactivatedAddButton);
		
	}

	addCard (e) {
		e.preventDefault();
		const {placeCard} = new Card(this.popupForm.elements.name.value, this.popupForm.elements.link.value);
		
		this.container.appendChild(placeCard);
		this.popup.classList.remove('popup_is-opened');
		this.popupForm.reset();
	}

  	diactivatedAddButton () {
		if (!this.popupInputName.checkValidity() || !this.popupInputUrl.checkValidity()) {
	  			this.popupAddButton.setAttribute('disable', true);
	  			this.popupAddButton.classList.add('popup__button_disable');
	  			this.popupAddButton.classList.remove('popup__button');
		} else {
	  			this.popupAddButton.removeAttribute('disabled');
	  			this.popupAddButton.classList.remove('popup__button_disable');
	  			this.popupAddButton.classList.add('popup__button');
		}
  	}
	
	render () {
		for (let i = 0; i < this.array.length; i++) {
			const { placeCard } = new Card(this.array[i].name, this.array[i].link);
			this.container.appendChild(placeCard);
		}
	}
}