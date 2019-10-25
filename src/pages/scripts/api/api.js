import {newPopupEdit} from '../index';

export default class Api {

	constructor(url, token) {
		this.url = url;
		this.token = token;
    }

	getUser() {
		return fetch (`${this.url}/cohort3/users/me`, {
			method: 'GET',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			}	
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);

		})
		.catch(err => { 
			console.log(err); 
		});
	}
			
	getInitialCards() {
		return fetch (`${this.url}/cohort3/cards`, {
			method: 'GET',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			}	
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
	
		.catch(err => { 
			console.log(err); 
		});
	}

	getInitialEdit() {
		return fetch(`${this.url}/cohort3/users/me`, {
			method: 'PATCH',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: newPopupEdit.popupFormEditInputName.value,
				about: newPopupEdit.popupFormEditInputAbout.value
			})
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			} 
			return Promise.reject(res.status);
		})
		.catch(err => { console.log(err); });	
	}

	addCard(nameInput, urlInput) {
		return fetch(`${this.url}/cohort3/cards`, {
			method: 'POST',
			headers: {
				authorization: `${this.token}`,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				name: nameInput,
				link: urlInput
			})
		})
		.then(res => {
			if(res.ok) {
				return res.json();
			}
			return Promise.reject(res.status);
		})
		.catch(err => { console.log(err); });
	}
}