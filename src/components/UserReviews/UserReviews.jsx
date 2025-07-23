import axios from "axios"; // Import Axios to make API requests
import { useEffect, useState } from "react";
import { Button, Carousel, Container, Form, Modal } from "react-bootstrap";
import { FaRegStar, FaStar } from "react-icons/fa";
import "./UserReviews.css";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
    role: "",
    rating: 5,
    text: "",
  });

  // Fetch reviews from the backend
  useEffect(() => {
    axios
      .get("https://cou-finder.onrender.com/api/reviews") // Correct backend URL
      .then((response) => {
        setReviews(response.data); // Update state with data from backend
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  }, []);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://cou-finder.onrender.com/api/reviews", formData) // Correct backend URL
      .then((response) => {
        setReviews([...reviews, response.data]); // Add the new review to the list
        setShowModal(false); // Close modal after submission
        setFormData({ name: "", photo: "", role: "", rating: 5, text: "" }); // Reset form fields
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value, // Update the form data state
    }));
  };

  return (
    <Container className="py-5 position-relative review-section">
      <h2 className="section-heading mb-4 animate-fade-in">What Users Say</h2>

      {/* Subheading with anchor link for modal trigger */}
      <div className="text-center">
        <h4>
          <a
            href="#submitReview"
            onClick={() => setShowModal(true)}
            className="leave-review-link"
          >
            Leave A Review
          </a>
        </h4>
        <p className="review-subheading">
          Be part of our journey—your feedback is important to us.
        </p>
      </div>

      {/* Carousel for displaying reviews */}
      <Carousel
        indicators={false}
        controls={true}
        interval={6000}
        fade
        touch
        pause="hover"
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

      {/* Modal for submitting review */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Submit Your Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formPhoto">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="text"
                placeholder="Image URL"
                name="photo"
                value={formData.photo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formRole">
              <Form.Label>Profession</Form.Label>
              <Form.Control
                type="text"
                placeholder="Your Profession"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formRating">
              <Form.Label>Rating</Form.Label>
              <Form.Control
                as="select"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
              >
                {[...Array(5)].map((_, i) => (
                  <option key={i} value={i + 1}>
                    {i + 1}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formText">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Your Comment"
                name="text"
                value={formData.text}
                onChange={handleChange}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit Review
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserReviews;
