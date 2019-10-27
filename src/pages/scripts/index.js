import Popup from './popup/popup';
import PopupImage from './popup/__image/popupImage';
import CardList from './cardList/cardList';
import PopupInput from './popup/__input/popupInput';
import PopupEdit from './popup/__edit/popupEdit';
import Api from './api/api';

export {api, popupImage, newPopupEdit};

const serverUrl = NODE_ENV === 'development' ? 'http://praktikum.tk' : 'https://praktikum.tk'

const placesList = document.body.querySelector('.places-list');
const popupImg = document.querySelector('.popup__image');
const popup = document.querySelector('.popup');

const popupButton = document.querySelector('.button');

const newPopup = new Popup(popup, popupButton);

const popupImage = new PopupImage(popupImg);	

const newPopupInput = new PopupInput (popup, popupButton);

const popupEdit = document.querySelector('#edit');
const EditButton = document.querySelector('.button__edit');

const newPopupEdit = new PopupEdit (popupEdit, EditButton);

const api = new Api(serverUrl, '26f2ac9c-9424-47a9-8a05-2d6b493d73bc'); //'http://95.216.175.5'

api.getUser().then(res => { console.log(res); })
api.getInitialCards().then(data => { new CardList(placesList, data); })
api.getUser()
	.then(res => { userName.textContent = res.name; });
api.getUser()
	.then(res => { userJob.textContent = res.about; });

const userName = document.querySelector('.user-info__name');
const userJob = document.querySelector('.user-info__job');

