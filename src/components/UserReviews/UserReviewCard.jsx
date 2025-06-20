import { Card } from "react-bootstrap";

const UserReviewCard = ({ review }) => {
  return (
    <Card className="h-100 shadow-sm">
      <Card.Img
        variant="top"
        src={review.photo}
        alt="User"
        style={{ height: "200px", objectFit: "cover" }}
      />
      <Card.Body>
        <Card.Title>{review.name}</Card.Title>
        <Card.Text>{review.text}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default UserReviewCard;
