// src/pages/AboutUs/ReviewForm.jsx
import { useState } from "react";
import { Button, Form } from "react-bootstrap";

const defaultAvatars = [
  "/media/avatar1.jpg",
  "/media/avatar2.png",
  "/media/avatar3.png",
  "/media/avatar4.png",
];

const ReviewForm = () => {
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [rating, setRating] = useState(0);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setUploadedImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;

    const reviewData = {
      name: form.name.value,
      comment: form.comment.value,
      rating,
      image: uploadedImage || selectedAvatar,
    };

    console.log("Review submitted:", reviewData);
    alert("Review submitted successfully!");
    form.reset();
    setRating(0);
    setUploadedImage(null);
    setSelectedAvatar(null);
  };

  return (
    <Form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
      <Form.Group className="mb-3 mt-5">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" name="name" required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Comment</Form.Label>
        <Form.Control as="textarea" name="comment" rows={3} required />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Rating</Form.Label>
        <div>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              style={{
                fontSize: "24px",
                color: star <= rating ? "gold" : "gray",
                cursor: "pointer",
              }}
            >
              ★
            </span>
          ))}
        </div>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Upload Photo (optional)</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Or Choose a Default Avatar</Form.Label>
        <div className="d-flex gap-3 flex-wrap">
          {defaultAvatars.map((avatar, idx) => (
            <img
              key={idx}
              src={avatar}
              alt={`Avatar ${idx + 1}`}
              onClick={() => setSelectedAvatar(avatar)}
              className={selectedAvatar === avatar ? "border-primary" : ""}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                cursor: "pointer",
                border:
                  selectedAvatar === avatar
                    ? "3px solid #007bff"
                    : "1px solid #ccc",
              }}
            />
          ))}
        </div>
      </Form.Group>

      <Button type="submit" variant="success" className="w-100">
        Submit Review
      </Button>
    </Form>
  );
};

export default ReviewForm;
