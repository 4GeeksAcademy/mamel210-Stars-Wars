import React, { useContext } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { Context } from '../store/appContext.js'

export const DeleteContact = ({ show, handleClose, contact }) => {
  const { store, actions } = useContext(Context)
  const handleDelete = () => {
    actions.deleteContact(contact)
    handleClose()
  }
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Are you sure</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>If you delete this thing the entire universe will go down!</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">Oh no!</Button>
        <Button onClick={handleDelete} variant="primary">Yes baby!</Button>
      </Modal.Footer>
    </Modal>
  )
}
