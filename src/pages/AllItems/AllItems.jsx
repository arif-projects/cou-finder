import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import LostItemCard from "../../components/LostItem/LostItemCard";
import { auth } from "../../firebase/firebase.config";

const AllItems = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  const [categoryFilter, setCategoryFilter] = useState(
    () => localStorage.getItem("categoryFilter") || "All Categories"
  );
  const [locationFilter, setLocationFilter] = useState(
    () => localStorage.getItem("locationFilter") || "All Locations"
  );
  const [startDate, setStartDate] = useState(
    () => localStorage.getItem("startDate") || ""
  );
  const [endDate, setEndDate] = useState(
    () => localStorage.getItem("endDate") || ""
  );

  const [showClaimModal, setShowClaimModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/lost-items");
        setItems(res.data);
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
    fetchItems();
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
    } catch (error) {
      console.error("Failed to submit claim:", error);
      alert("Failed to submit claim.");
    }
  };

  const resetFilters = () => {
    setCategoryFilter("All Categories");
    setLocationFilter("All Locations");
    setStartDate("");
    setEndDate("");
  };

  useEffect(() => {
    localStorage.setItem("categoryFilter", categoryFilter);
    localStorage.setItem("locationFilter", locationFilter);
    localStorage.setItem("startDate", startDate);
    localStorage.setItem("endDate", endDate);
  }, [categoryFilter, locationFilter, startDate, endDate]);

  // 🔄 Filter Logic from Old Code (EXACTLY COPIED)
  const categories = [
    "All Categories",
    ...new Set(items.map((item) => item.category)),
  ];
  const locations = [
    "All Locations",
    ...new Set(items.map((item) => item.location)),
  ];

  const filteredItems = items.filter((item) => {
    const itemDate = new Date(item.date);
    const matchCategory =
      categoryFilter === "All Categories" || item.category === categoryFilter;
    const matchLocation =
      locationFilter === "All Locations" || item.location === locationFilter;
    const matchStartDate = startDate ? itemDate >= new Date(startDate) : true;
    const matchEndDate = endDate ? itemDate <= new Date(endDate) : true;
    return matchCategory && matchLocation && matchStartDate && matchEndDate;
  });

  return (
    <Container className="py-5">
      <h2 className="mb-4">All Lost Items</h2>
      <Form className="mb-4 d-flex flex-wrap align-items-end gap-3">
        {/* Filters */}
        <Form.Group controlId="categoryFilter" style={{ minWidth: "200px" }}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="dateFrom" style={{ minWidth: "150px" }}>
          <Form.Label>Date From</Form.Label>
          <Form.Control
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="dateTo" style={{ minWidth: "150px" }}>
          <Form.Label>Date To</Form.Label>
          <Form.Control
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="locationFilter" style={{ minWidth: "200px" }}>
          <Form.Label>Location</Form.Label>
          <Form.Select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            {locations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="outline-secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Form>

      <Row>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Col md={4} key={item._id} className="mb-4">
              <LostItemCard item={item} onClaimClick={handleClaimClick} />
            </Col>
          ))
        ) : (
          <p className="text-center text-muted">No items match your filters.</p>
        )}
      </Row>

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

export default AllItems;
