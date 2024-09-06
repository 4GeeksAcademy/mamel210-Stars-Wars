import { element } from 'prop-types'
import React, { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import { BackToHome } from '../component/BackToHome.jsx'



export const EditContact = () => {
  const { store, actions } = useContext(Context)
  const [name, setName] = useState(store?.currentContact?.name);
  const [phone, setPhone] = useState(store?.currentContact?.phone);
  const [email, setEmail] = useState(store?.currentContact?.email);
  const [address, setAddress] = useState(store?.currentContact?.address);

  const navigate = useNavigate()

  const handleName = (element) => setName(element.target.value)
  const handlePhone = (element) => setPhone(element.target.value)
  const handleEmail = (element) => setEmail(element.target.value)
  const handleAddress = (element) => setAddress(element.target.value)


  const handleSubmit = (element) => {
    element.preventDefault()
    const formdata = {
      name,
      phone,
      email,
      address,
    }
    actions.editContact(formdata)
    navigate('/')
  }
  if (!store?.currentContact) {
    return (<Container className='d-flex bg-light w-100 h-50 p-5 justify-content-center align-items-center mt-5'><BackToHome text={"no tienes datos para editar, ir a Home"} /></Container>)
  }
  return (
    <Container className='bg-light p-5'>
      <h1 className='text-center '>Edit contact</h1>
      <form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control value={name} onChange={handleName} type="text" placeholder="Full Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Enter email</Form.Label>
          <Form.Control value={email} onChange={handleEmail} type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Enter phone</Form.Label>
          <Form.Control value={phone} onChange={handlePhone} type="text" placeholder="Enter phone" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Enter address</Form.Label>
          <Form.Control value={address} onChange={handleAddress} type="text" placeholder="Enter address" />
        </Form.Group>
        <Button className='w-100' onClick={handleSubmit} type='submit'>edit</Button>
      </form>
      <BackToHome text={"or get back to Contacts"} />
    </Container>
  )
}

