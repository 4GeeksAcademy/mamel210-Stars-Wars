import React, { useContext, useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { Context } from '../store/appContext.js'
import { BackToHome } from '../component/BackToHome.jsx'

export const AddContact = () => {
  const { store, actions } = useContext(Context)
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');

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
    actions.addContact(formdata)
    navigate('/')
  }

  return (
    <Container className='bg-light p-5'>
      <h1 className='text-center'>Add new contact</h1>
      <form>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control onChange={handleName} type="text" placeholder="Full Name" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Enter email</Form.Label>
          <Form.Control onChange={handleEmail} type="text" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="phone">
          <Form.Label>Enter phone</Form.Label>
          <Form.Control onChange={handlePhone} type="text" placeholder="Enter phone" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="address">
          <Form.Label>Enter address</Form.Label>
          <Form.Control onChange={handleAddress} type="text" placeholder="Enter address" />
        </Form.Group>
        <Button className='w-100' onClick={handleSubmit} type='submit'>save</Button>
      </form>
      <BackToHome text={"or get back to Contacts"} />
    </Container>
  )
}

