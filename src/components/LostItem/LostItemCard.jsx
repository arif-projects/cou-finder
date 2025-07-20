import { Button, Card } from "react-bootstrap";
import { FaMapMarkerAlt, FaTags } from "react-icons/fa"; // ✅ Icon import
import "./LostItemStyle.css";

const LostItemCard = ({ item, onClaimClick }) => {
  return (
    <Card className="lost-item-card mb-4 animate__animated animate__fadeInUp">
      <div className="card-img-wrapper">
        <Card.Img
          variant="top"
          src={item.image}
          alt={item.name}
          className="card-img"
        />
      </div>
      <Card.Body>
        <Card.Title className="card-title">{item.name}</Card.Title>
        <Card.Text className="card-text">
          <FaMapMarkerAlt className="me-2 text-muted" />
          <strong>Location:</strong> {item.location} <br />
          <FaTags className="me-2 text-muted" />
          <strong>Category:</strong> {item.category}
        </Card.Text>
        <Button
          variant="light"
          className="claim-btn pastel-blue-btn"
          onClick={() => onClaimClick(item)}
        >
          Claim Item
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LostItemCard;
