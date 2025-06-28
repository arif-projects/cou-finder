import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import LostItemCard from "./LostItemCard";

const LostItemSection = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/lost-items")
      .then((res) => setItems(res.data))
      .catch((err) => console.error("Error fetching lost items:", err));
  }, []);

  const handleClaimClick = (item) => {
    if (!user) {
      navigate("/login");
    } else {
      setSelectedItem(item);
      setShowClaimModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowClaimModal(false);
    setSelectedItem(null);
  };

  const handleSubmitClaim = async (e) => {
    e.preventDefault();
    const form = e.target;

    const claimData = {
      itemId: selectedItem._id,
      itemName: selectedItem.name,
      claimerName: user.displayName || "Anonymous",
      claimerEmail: user.email,
      claimDetails: form.claimDetails.value,
    };

    try {
      await axios.post("http://localhost:5000/api/claim", claimData);
      alert("Claim submitted successfully!");
      handleCloseModal();
    } catch (err) {
      console.error("Error submitting claim:", err);
      alert("Failed to submit claim.");
    }
  };

  const recentItems = items.slice(0, 6);

  return (
    <Container className="py-5">
      <h2 id="lost-items" className="mb-4">
        Recently Found Items
      </h2>
      <Row>
        {recentItems.map((item) => (
          <Col md={4} key={item._id}>
            <LostItemCard item={item} onClaimClick={handleClaimClick} />
          </Col>
        ))}
      </Row>

      <div className="text-center mt-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate("/all-items")}
        >
          Browse More Items
        </Button>
      </div>

      <Modal show={showClaimModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Claim Lost Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Form onSubmit={handleSubmitClaim}>
              <p>
                <strong>Item:</strong> {selectedItem.name}
              </p>
              <p>
                <strong>Lost Location:</strong> {selectedItem.location}
              </p>
              <Form.Group className="mb-3" controlId="claimDetails">
                <Form.Label>Claim Details</Form.Label>
                <Form.Control
                  as="textarea"
                  name="claimDetails"
                  rows={3}
                  required
                />
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100">
                Submit Claim
              </Button>
            </Form>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default LostItemSection;
