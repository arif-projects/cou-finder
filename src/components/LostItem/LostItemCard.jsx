import { Button, Card } from "react-bootstrap";

const LostItemCard = ({ item, onClaimClick }) => {
  return (
    <Card className="mb-4 shadow-sm">
      <Card.Img
        variant="top"
        src={item.image}
        alt={item.name}
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{item.name}</Card.Title>
        <Card.Text>
          <strong>Location:</strong> {item.location} <br />
          <strong>Category:</strong> {item.category}
        </Card.Text>
        <Button
          variant="warning"
          className="w-100"
          onClick={() => onClaimClick(item)}
        >
          Claim Item
        </Button>
      </Card.Body>
    </Card>
  );
};

export default LostItemCard;
