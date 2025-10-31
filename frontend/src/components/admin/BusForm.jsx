import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const BusForm = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleArrayChange = (name, value) => {
    setFormData({ ...formData, [name]: value.split(",") });
  };

  return (
    <>
      <Form.Group className="mb-3">
        <Form.Label>Bus Name</Form.Label>
        <Form.Control
          type="text"
          name="busName"
          value={formData.busName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Bus Type</Form.Label>
            <Form.Control
              type="text"
              name="busType"
              value={formData.busType}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Seat Type</Form.Label>
            <Form.Control
              type="text"
              name="seatType"
              value={formData.seatType}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Fare</Form.Label>
            <Form.Control
              type="number"
              name="fare"
              value={formData.fare}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Available Seats</Form.Label>
            <Form.Control
              type="number"
              name="availableSeats"
              value={formData.availableSeats}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Start Location</Form.Label>
            <Form.Control
              type="text"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>End Location</Form.Label>
            <Form.Control
              type="text"
              name="endLocation"
              value={formData.endLocation}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Start Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="startDateTime"
              value={formData.startDateTime}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>End Date & Time</Form.Label>
            <Form.Control
              type="datetime-local"
              name="endDateTime"
              value={formData.endDateTime}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Boarding Points (comma separated)</Form.Label>
        <Form.Control
          type="text"
          name="boardingPoints"
          value={formData.boardingPoints.join(",")}
          onChange={(e) => handleArrayChange("boardingPoints", e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Dropping Points (comma separated)</Form.Label>
        <Form.Control
          type="text"
          name="droppingPoints"
          value={formData.droppingPoints.join(",")}
          onChange={(e) => handleArrayChange("droppingPoints", e.target.value)}
        />
      </Form.Group>

      <Row>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recurring Start Date</Form.Label>
            <Form.Control
              type="date"
              name="startDate"
              value={formData.startDate || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Recurring End Date</Form.Label>
            <Form.Control
              type="date"
              name="endDate"
              value={formData.endDate || ""}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group className="mb-3">
            <Form.Label>Frequency</Form.Label>
            <Form.Select
              name="frequency"
              value={formData.frequency || ""}
              onChange={handleChange}
            >
              <option value="">Select Frequency</option>
              <option value="ONE_TIME">One Time</option>
              <option value="DAILY">Daily</option>
              <option value="WEEKENDS">Weekends</option>
              <option value="MONDAY,FRIDAY">Mon & Fri</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </>
  );
};

export default BusForm;
