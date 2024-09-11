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
			isLoading: false
		},
		actions: {
			getContacts: async () => {
				const uri = `${getStore().host}/agendas/${getStore().agend}/contacts`;
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				if (!response.ok) {
					if (response.status === '404') {
						// aca debo llamar la funcion que crea la agenda
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
				setStore({isLoading: true})
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ details: data.result });
				if (!response.ok) {
					return
				}
                setStore({isLoading: false})
			},
			addToFavorits: async () => {
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
				setStore({isLoading: true})
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ starshipsDetails: data.result });
				if (!response.ok) {
					return
				}
                setStore({isLoading: false})
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
				setStore({isLoading: true})
				const options = {
					method: 'GET',
				};
				const response = await fetch(uri, options);
				const data = await response.json();
				setStore({ planetDetails: data.result });
				if (!response.ok) {
					return
				}
                setStore({isLoading: false})
			},
		},
	};
};

export default getState;
