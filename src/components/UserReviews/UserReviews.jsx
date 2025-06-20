import { Carousel, Container } from "react-bootstrap";

const reviews = [
  {
    name: "Arefin",
    text: "I lost my calculator and found it through this platform. Amazing!",
    photo: "https://via.placeholder.com/300x200",
  },
  {
    name: "Fatima",
    text: "Very helpful system for students. Love it!",
    photo: "https://via.placeholder.com/300x200",
  },
  {
    name: "Tanvir",
    text: "Easy to use and very effective. Highly recommended.",
    photo: "https://via.placeholder.com/300x200",
  },
];

const UserReviews = () => {
  return (
    <Container className="py-5 text-center">
      <h2 className="mb-4">What Users Say</h2>
      <Carousel indicators={false} controls={true} interval={4000}>
        {reviews.map((review, index) => (
          <Carousel.Item key={index}>
            <div className="d-flex flex-column align-items-center">
              <img
                src={review.photo}
                alt="User"
                className="rounded-circle mb-3"
                style={{ width: "120px", height: "120px", objectFit: "cover" }}
              />
              <h5>{review.name}</h5>
              <p className="text-muted w-75 mx-auto">{review.text}</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default UserReviews;
