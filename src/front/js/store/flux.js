const getState = ({ getStore, getActions, setStore }) => {
	return {
	  store: {
		host: 'https://playground.4geeks.com/contact',
		agend: 'Mamel210',
		contacts: []
	  },
	  actions: {
		getContacts: async () => {
		  const uri = `${getStore().host}/agendas/${getStore().agend}/contacts`;
		  const options = {
			method: 'GET',
		  };
		  const response = await fetch(uri, options);
		  if (!response.ok) {
			if (response.status === 404)  {
				// aca debo llamar la funcion que crea la agenda
			}
			return
		  }
		  const data = await response.json();
		  setStore({ contacts: data.contacts });
		},
		addContact: async (formdata) => {
		  const host = 'https://playground.4geeks.com/contact';
		  const agend = 'Mamel210';
		  const uri = `${host}/agendas/${agend}/contacts`;
		  const options = {
			method: 'POST',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formdata),
		  };
		  const response = await fetch(uri, options);
		  const newContact = await response.json();
		  const oldData = getStore();
		  setStore({ contacts: [...oldData.contacts, newContact] });
		},
		editContact: async (formdata) => {
		  const data = getStore();
		  const currentId = data.currentContact.id;
		  const host = 'https://playground.4geeks.com/contact';
		  const agend = 'Mamel210';
		  const uri = `${host}/agendas/${agend}/contacts/${currentId}`;
		  const options = {
			method: 'PUT',
			headers: {
			  'Content-Type': 'application/json',
			},
			body: JSON.stringify(formdata),
		  };
		  const response = await fetch(uri, options);
		  /* falta if response: ok */
		  const editedContact = await response.json();
		  const contactToEdit = data.contacts.map((contact) => {
			return contact.id === editedContact.id ? editedContact : contact;
		  });
  
		  setStore({ contacts: contactToEdit });
		},
		currentContact: (contact) => {setStore({ currentContact: contact });},
		deleteContact: async (contact) => {
		  const data = getStore();
		  const host = 'https://playground.4geeks.com/contact';
		  const agend = 'Mamel210';
		  const uri = `${host}/agendas/${agend}/contacts/${contact.id}`;
		  const options = {
			method: 'DELETE',
		  };
  
		  const response = await fetch(uri, options);
		  const remainContacts = data.contacts.filter(
			(value) => value.id !== contact.id
		  );
  
		  setStore({ contacts: remainContacts });
		  return response;
		},
	  },
	};
  };
  
  export default getState;
  