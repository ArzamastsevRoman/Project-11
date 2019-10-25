import {popupImage} from '../index';
export default class Card {

	constructor (name, link) {
		this.name = name;
		this.link = link;
		this.create ();
		this.remove = this.remove.bind(this);
		this.like = this.like.bind(this);
		this.showImage = this.showImage.bind(this);

		this.placeCard
			.querySelector('.place-card__like-icon')
			.addEventListener ('click', this.like);

		this.placeCard
			.querySelector('.place-card__delete-icon')
			.addEventListener('click', this.remove);
		this.placeCard
			.querySelector('.place-card__image')
			.addEventListener ('click', this.showImage);
	}

	create () {
		const placeCard = document.createElement('div');
		placeCard.classList.add('place-card');

		const placeCardImg = document.createElement('div');
		placeCardImg.classList.add('place-card__image');

		const btnDelete = document.createElement('button');
		btnDelete.classList.add('place-card__delete-icon');

		placeCardImg.appendChild(btnDelete);
		placeCard.appendChild(placeCardImg);
		
		const placeCardDescription = document.createElement('div');
		placeCardDescription.classList.add('place-card__description');
		
		const placeCardName = document.createElement('h3');
		placeCardName.classList.add('place-card__name');
		placeCardDescription.appendChild(placeCardName);
		
		const btnLike = document.createElement('button');
		btnLike.classList.add('place-card__like-icon');
		placeCard.appendChild(placeCardDescription);
		placeCardDescription.appendChild(btnLike);

		placeCardName.textContent = this.name;
		placeCardImg.setAttribute('style', `background-image: url(${this.link})`);

		this.placeCard = placeCard;
	}

	remove (e) {
		e.stopPropagation();
		this.placeCard.parentElement.removeChild(this.placeCard);
	}

	like () {
		this.placeCard.querySelector('.place-card__like-icon').classList.toggle('place-card__like-icon_liked');
	}

	showImage () {
		popupImage.setImage(this.link)
		popupImage.open()
	}
}