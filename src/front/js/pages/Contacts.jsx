import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../store/appContext.js';
import '../../styles/home.css';
import { NewContactButton } from '../component/NewContactButton.jsx';
import { Contact } from '../component/Contact.jsx';

export const Contacts = () => {
	const { store, actions } = useContext(Context);

	return (
		<div className='bg-light p-5 rounded container mt-5'>
			<NewContactButton />
			<h1>{store.contact}</h1>
			<div className='profiles'>
				{store.contacts.length == 0 ? <div>no tiene registros para mostrar </div> : null}
				{store.contacts.map((contact, index) => {
					return (
						<Contact key={index} contact={contact} />
					)
				})}
			</div>
		</div>
	);
};
