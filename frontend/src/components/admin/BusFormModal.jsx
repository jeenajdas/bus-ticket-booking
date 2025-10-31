import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import BusForm from "./BusForm";

const BusFormModal = ({ show, onHide, formData, setFormData, onSave }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>{formData.id ? "Edit Bus" : "Add Bus"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <BusForm formData={formData} setFormData={setFormData} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Cancel
          </Button>
          <Button type="submit" variant="success">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default BusFormModal;
