import { Navigate } from "react-router-dom";


const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			host: 'https://playground.4geeks.com/contact',
			hostStar: 'https://www.swapi.tech/api',
			agend: 'Mamel210',
			contacts: [],
			number: 1,
			isLogin: false,
			contacts: [],
			currentContact: {},
			characters: [],
			currentCharacter: {},
			hasError: false,
			errorMessage: "",
			isLoading: false,
			favorites: []
		},
		actions: {
			getContacts: async () => {
				const uri = `${getStore().host}/agendas/${getStore().agend}/contacts`;
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);


				if (!response.ok) {
					if (response.status === 404) {
						// aca debo llamar la funcion que crea la agenda
						const res = await fetch(`${getStore().host}/agendas/${getStore().agend}`, { method: 'POST' });
						return res
					}
					return
				}
				const data = await response.json();
				setStore({ contacts: data.contacts });
			},
			addContact: async (formdata) => {
				const uri = `${getStore().host}/agendas/${getStore().agend}/contacts`
				const options = {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formdata),
				};
				const response = await fetch(uri, options);

				if (!response.ok) {
					return
				}

				const newContact = await response.json();
				const oldData = getStore();
				setStore({ contacts: [...oldData.contacts, newContact] });
			},
			editContact: async (formdata) => {
				const data = getStore();
				const currentId = data.currentContact.id;
				const uri = `${getStore().host}/agendas/${getStore().agend}/contacts/${currentId}`;
				const options = {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(formdata),
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					return
				}
				const editedContact = await response.json();
				const contactToEdit = data.contacts.map((contact) => {
					return contact.id === editedContact.id ? editedContact : contact;
				});

				setStore({ contacts: contactToEdit });
			},
			currentContact: (contact) => { setStore({ currentContact: contact }); },
			deleteContact: async (contact) => {
				const data = getStore();
				const uri = `${getStore().host}/agendas/${getStore().agend}/contacts/${contact.id}`;
				const options = {
					method: 'DELETE',
				};

				const response = await fetch(uri, options);
				if (!response.ok) {
					return
				}
				const remainContacts = data.contacts.filter(
					(value) => value.id !== contact.id
				);

				setStore({ contacts: remainContacts });
				return response;
			},
			getCharacters: async () => {
				const uri = `${getStore().hostStar}/people`
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ characters: data.results });
				if (!response.ok) {
					return
				}
			},
			getDetails: async (uid) => {
				const uri = `${getStore().hostStar}/people/${uid}`
				setStore({ isLoading: true })
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ details: data.result });
				if (!response.ok) {
					return
				}
				setStore({ isLoading: false })
			},
			addToFavorits: async (item, model) => {
				const data = { item, model }
				const favorites = getStore();
				const alreadyExist = favorites.favorites && favorites?.favorites?.some((fav) => fav.item.uid === data.item.uid)

				if (alreadyExist) {
					return
				}

				setStore({ favorites: [...favorites.favorites || [], data] })
			},
			getStarships: async () => {
				const uri = `${getStore().hostStar}/starships`
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ starships: data.results });
				if (!response.ok) {
					return
				}
			},
			getStarshipsDetails: async (uid) => {
				const uri = `${getStore().hostStar}/starships/${uid}`
				setStore({ isLoading: true })
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ starshipsDetails: data.result });
				if (!response.ok) {
					return
				}
				setStore({ isLoading: false })
			},
			getPlanets: async () => {
				const uri = `${getStore().hostStar}/planets`
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ planets: data.results });
				if (!response.ok) {
					return
				}
			},
			getPlanetsDetails: async (uid) => {
				const uri = `${getStore().hostStar}/planets/${uid}`
				setStore({ isLoading: true })
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ planetDetails: data.result });
				if (!response.ok) {
					return
				}
				setStore({ isLoading: false })
			},
			removeToFavorits: async (item) => {
				const favorites = getStore();
				const valeroToRemove = favorites.favorites.filter(fav => fav.item.uid !== item.item.uid)
				console.log(valeroToRemove);


				console.log(favorites, item, 'mamel');

				setStore({ favorites: valeroToRemove })
			},
		},
	};
};

export default getState;
