// src/components/Banner/Banner.jsx
import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal, Toast } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaBoxes, FaSearchPlus } from "react-icons/fa"; // ✅ New import
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import bgImage from "../../media/cou.png";
import "./Banner.css";

const Banner = () => {
  const [show, setShow] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const handleReportClick = () => {
    if (!user) navigate("/login");
    else setShow(true);
  };

  const handleClose = () => setShow(false);

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
      status: "pending",
    };
    try {
      await axios.post("https://cou-finder.onrender.com/api/lost-items", item);
      setShow(false);
      setShowToast(true);
    } catch (error) {
      console.error("Failed to submit item:", error);
      alert("Failed to submit item. Please try again.");
    }
  };

  return (
    <>
      <div
        className="d-flex justify-content-center align-items-center text-center banner-section"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          position: "relative",
        }}
      >
        <div className="overlay"></div>
        <div className="content text-white position-relative px-3">
          <h1 className="display-4 fw-bold animate__animated animate__fadeInDown">
            Lost It? Found It? Let CoU Finder Help.
          </h1>
          <p className="lead mb-4 animate__animated animate__fadeInUp">
            A smarter way to handle{" "}
            <span className="highlight-word">lost & found</span> on campus.
          </p>
          <div className="d-flex flex-column flex-md-row justify-content-center gap-3 animate__animated animate__fadeInUp">
            <Button
              variant="light"
              className="btn-cta shadow-sm d-flex align-items-center gap-2"
              onClick={handleReportClick}
            >
              <FaSearchPlus />
              Found an Item?
            </Button>
            <Button
              variant="outline-light"
              className="btn-cta d-flex align-items-center gap-2"
              onClick={() =>
                document
                  .getElementById("lost-items")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <FaBoxes />
              Browse Lost Items
            </Button>
          </div>
        </div>
      </div>

      {/* Modal */}
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
