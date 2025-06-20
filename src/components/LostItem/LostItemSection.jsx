import { useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import LostItemCard from "./LostItemCard";

// Dummy data for now
const dummyItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200.png?text=Wallet",
    name: "Black Wallet",
    location: "Library",
    category: "Personal Item",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200.png?text=USB+Drive",
    name: "USB Drive",
    location: "Computer Lab",
    category: "Electronics",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200.png?text=Keys",
    name: "House Keys",
    location: "CSE Building",
    category: "Accessories",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200.png?text=Notebook",
    name: "Math Notebook",
    location: "Classroom 104",
    category: "Stationery",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200.png?text=Bag",
    name: "Black Backpack",
    location: "Bus Stand",
    category: "Bags",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x200.png?text=Watch",
    name: "Digital Watch",
    location: "Cafeteria",
    category: "Electronics",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300x200.png?text=Glasses",
    name: "Sunglasses",
    location: "Playground",
    category: "Accessories",
  },
];

const LostItemSection = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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

  const handleSubmitClaim = (e) => {
    e.preventDefault();
    const form = e.target;

    const claimData = {
      userName: user.displayName || "Anonymous",
      userEmail: user.email,
      userId: user.uid,
      itemId: selectedItem.id,
      claimDetails: form.claimDetails.value,
      claimDate: new Date().toISOString(),
    };

    console.log("Claim submitted:", claimData);
    // TODO: backend call to submit claim

    handleCloseModal();
    alert("Claim submitted successfully!");
  };

  // 👇 Homepage এ শুধুমাত্র ৬টি আইটেম দেখাবে
  const recentItems = dummyItems.slice(0, 6);

  return (
    <Container className="py-5">
      <h2 id="lost-items" className="mb-4">
        Recently Found Items
      </h2>
      <Row>
        {recentItems.map((item) => (
          <Col md={4} key={item.id}>
            <LostItemCard item={item} onClaimClick={handleClaimClick} />
          </Col>
        ))}
      </Row>

      {/* Browse More Button */}
      <div className="text-center mt-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate("/all-items")}
        >
          Browse More Items
        </Button>
      </div>

      {/* Claim Modal */}
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
                  placeholder="Write any details to support your claim"
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
