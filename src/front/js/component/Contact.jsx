import React, { useContext, useEffect, useState } from 'react';
import '../../styles/card.css';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Context } from '../store/appContext.js';
import { DeleteContact } from './DeleteContact.jsx';
export const Contact = ({ contact }) => {
    const { actions } = useContext(Context)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);

    const navigate = useNavigate()
    const handleEdit = () => {
        navigate("edit-contact")
        actions.currentContact(contact)
    }
    const handleDelete = () => {
        setShow(true)
        actions.currentContact(contact)
    }

    return (
        <div className='container cardProfileContainer bg-white'>
            <div className='cardProfileImgContainer'>
                <img
                    className='cardProfileImage'
                    alt={'imagen'}
                    src='https://images.unsplash.com/photo-1721332149267-ef9b10eaacd9?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
                />
            </div>
            <div className='cardContent'>
                <div className='cardProfileDescription'>
                    <span className='cardDescriptionItems'>
                        <h3>{contact.name}</h3>
                    </span>
                    <span className='cardDescriptionItems'>
                        <i className='fas fa-map-marker-alt fs-5'></i>
                        <div>{contact.address}</div>
                    </span>
                    <span className='cardDescriptionItems'>
                        <i className='fas fa-phone fs-5'></i>
                        <div>{contact.phone}</div>
                    </span>
                    <span className='cardDescriptionItems'>
                        <i className='fas fa-envelope fs-5'></i>
                        <div>{contact.email}</div>
                    </span>
                </div>
                <div className='cardProfileButtonGroup'>
                    <Button onClick={handleEdit} variant='success'>
                        <i className='fas fa-pencil-alt cardProfileButtonGroup-edit'></i>
                    </Button>
                    <Button onClick={handleDelete} variant='danger'>
                        <i className='fas fa-trash-alt cardProfileButtonGroup-delete'></i>
                    </Button>
                </div>
            </div>
            <DeleteContact show={show} handleClose={handleClose} contact={contact} />
        </div>
    );
};
