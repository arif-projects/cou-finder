// src/pages/AllItems/AllItems.jsx
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import LostItemCard from "../../components/LostItem/LostItemCard";

// Dummy data
const allItems = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200.png?text=Wallet",
    name: "Black Wallet",
    location: "Library",
    category: "Personal Item",
    date: "2025-06-01",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200.png?text=USB+Drive",
    name: "USB Drive",
    location: "Computer Lab",
    category: "Electronics",
    date: "2025-06-10",
  },
  {
    id: 3,
    image: "https://via.placeholder.com/300x200.png?text=Keys",
    name: "House Keys",
    location: "CSE Building",
    category: "Accessories",
    date: "2025-05-15",
  },
  {
    id: 4,
    image: "https://via.placeholder.com/300x200.png?text=Notebook",
    name: "Math Notebook",
    location: "Classroom 104",
    category: "Stationery",
    date: "2025-06-05",
  },
  {
    id: 5,
    image: "https://via.placeholder.com/300x200.png?text=Bag",
    name: "Black Backpack",
    location: "Bus Stand",
    category: "Bags",
    date: "2025-06-08",
  },
  {
    id: 6,
    image: "https://via.placeholder.com/300x200.png?text=Watch",
    name: "Digital Watch",
    location: "Cafeteria",
    category: "Electronics",
    date: "2025-06-12",
  },
  {
    id: 7,
    image: "https://via.placeholder.com/300x200.png?text=Glasses",
    name: "Sunglasses",
    location: "Playground",
    category: "Accessories",
    date: "2025-05-20",
  },
];

const categories = [
  "All Categories",
  "Personal Item",
  "Electronics",
  "Accessories",
  "Stationery",
  "Bags",
];

const locations = [
  "All Locations",
  "Library",
  "Computer Lab",
  "CSE Building",
  "Classroom 104",
  "Bus Stand",
  "Cafeteria",
  "Playground",
];

const AllItems = () => {
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [locationFilter, setLocationFilter] = useState("All Locations");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  // Filter logic
  const filteredItems = allItems.filter((item) => {
    const itemDate = new Date(item.date);

    // Category filter
    if (
      categoryFilter !== "All Categories" &&
      item.category !== categoryFilter
    ) {
      return false;
    }

    // Location filter
    if (
      locationFilter !== "All Locations" &&
      item.location !== locationFilter
    ) {
      return false;
    }

    // Date range filter
    if (dateFrom && itemDate < new Date(dateFrom)) {
      return false;
    }
    if (dateTo && itemDate > new Date(dateTo)) {
      return false;
    }

    return true;
  });

  const resetFilters = () => {
    setCategoryFilter("All Categories");
    setLocationFilter("All Locations");
    setDateFrom("");
    setDateTo("");
  };

  return (
    <Container className="py-5">
      <h2 className="mb-4">All Lost & Found Items</h2>

      {/* Filter Section */}
      <Form className="mb-4 d-flex flex-wrap align-items-end gap-3">
        {/* Category */}
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

        {/* Date From */}
        <Form.Group controlId="dateFrom" style={{ minWidth: "150px" }}>
          <Form.Label>Date From</Form.Label>
          <Form.Control
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </Form.Group>

        {/* Date To */}
        <Form.Group controlId="dateTo" style={{ minWidth: "150px" }}>
          <Form.Label>Date To</Form.Label>
          <Form.Control
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
          />
        </Form.Group>

        {/* Location */}
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

        {/* Reset Button */}
        <Button variant="secondary" onClick={resetFilters}>
          Reset Filters
        </Button>
      </Form>

      {/* Items */}
      <Row>
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <Col md={4} key={item.id} className="mb-4">
              <LostItemCard item={item} />
            </Col>
          ))
        ) : (
          <p>No items found matching the selected filters.</p>
        )}
      </Row>
    </Container>
  );
};

export default AllItems;
