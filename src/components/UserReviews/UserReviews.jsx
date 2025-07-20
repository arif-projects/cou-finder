import { Carousel, Container } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./UserReviews.css";

const reviews = [
  {
    name: "Arefin",
    role: "3rd Year CSE Student",
    text: "I lost my calculator and found it through this platform. Amazing!",
    photo: "https://i.ibb.co/zTwf4Fmk/image.png",
    rating: 5,
  },
  {
    name: "Fatima",
    role: "Final Year EEE Student",
    text: "Very helpful system for students. Love it!",
    photo: "https://i.ibb.co/JjTvK55w/image.png",
    rating: 4,
  },
  {
    name: "Tanvir",
    role: "2nd Year BBA Student",
    text: "Easy to use and very effective. Highly recommended.",
    photo: "https://i.ibb.co/3D5VVL4/image.png",
    rating: 5,
  },
];

const UserReviews = () => {
  return (
    <Container className="py-5 position-relative review-section">
      <h2 className="section-heading mb-4 animate-fade-in">What Users Say</h2>

      <Carousel
        indicators={false}
        controls={true}
        interval={6000}
        fade
        touch
        pause="hover" // ✅ Pause on hover
        className="testimonial-carousel"
      >
        {reviews.map((review, index) => (
          <Carousel.Item key={index}>
            <div
              className="d-flex flex-column align-items-center review-card neumorphic-card"
              data-aos="zoom-in"
            >
              <img
                src={review.photo}
                alt={review.name}
                className="user-avatar"
              />
              <h5 className="mt-3">{review.name}</h5>
              <p className="review-role">{review.role}</p>

              <div className="stars mb-2">
                {[...Array(5)].map((_, i) =>
                  i < review.rating ? (
                    <FaStar key={i} className="star" />
                  ) : (
                    <FaRegStar key={i} className="star empty" />
                  )
                )}
              </div>

              <p className="review-text w-75 mx-auto">❝ {review.text} ❞</p>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default UserReviews;
