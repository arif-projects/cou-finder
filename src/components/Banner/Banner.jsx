import axios from "axios"; // Added Axios import
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Toast,
} from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import bannerImg from "../../media/banner.jpg";

const Banner = () => {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleReportClick = () => {
    if (!user) {
      navigate("/login");
    } else {
      setShow(true);
    }
  };

  const handleClose = () => setShow(false);

  // Updated handleSubmit with Axios POST
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const item = {
      name: form.name.value,
      category: form.category.value,
      date: form.date.value,
      location: form.location.value,
      description: form.description.value,
      image: form.image.value,
      userEmail: user.email,
      userName: user.displayName || "Anonymous",
      status: "pending", // Added default status
    };

    try {
      // POST to backend API
      await axios.post("http://localhost:5000/api/lost-items", item);

      setShow(false);
      setShowToast(true);
    } catch (error) {
      console.error("Failed to submit item:", error);
      alert("Failed to submit item. Please try again.");
    }
  };

  return (
    <>
      <div style={{ backgroundColor: "#f0f8ff", padding: "60px 0" }}>
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <h1 className="mb-4">Welcome to CoU Finder</h1>
              <p className="mb-4">
                A Smart Campus Lost & Found Management System to help you
                recover your lost belongings.
              </p>
              <Button
                variant="primary"
                className="me-3"
                onClick={handleReportClick}
              >
                Found an Item?
              </Button>
              <Button
                variant="outline-primary"
                onClick={() =>
                  document
                    .getElementById("lost-items")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                Browse Lost Items
              </Button>
            </Col>
            <Col md={6}>
              <img
                src={bannerImg}
                alt="Lost and Found"
                className="img-fluid rounded"
              />
            </Col>
          </Row>
        </Container>

        {/* Report Modal (No changes) */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Report Found Item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label>Item Name</Form.Label>
                <Form.Control type="text" name="name" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" name="category" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Date Found</Form.Label>
                <Form.Control type="date" name="date" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Found Location</Form.Label>
                <Form.Control type="text" name="location" required />
              </Form.Group>

              <Form.Group className="mb-2">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" name="description" rows={2} />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image URL</Form.Label>
                <Form.Control type="text" name="image" />
              </Form.Group>

              <Button type="submit" variant="success" className="w-100">
                Submit Report
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
      </div>

      {/* Success Toast (No changes) */}
      <Toast
        onClose={() => setShowToast(false)}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: "fixed",
          top: 20,
          right: 20,
          minWidth: "250px",
          zIndex: 9999,
        }}
      >
        <Toast.Body>✔️ Report Submitted Successfully!</Toast.Body>
      </Toast>
    </>
  );
};

export default Banner;
