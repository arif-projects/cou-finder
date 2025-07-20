import { Badge, Button, Card, Col, Container, Row } from "react-bootstrap";
import "./BlogTipsSection.css";

const tips = [
  {
    title: "Top 5 Tips to Never Lose Your Stuff",
    excerpt:
      "From labeling your items to keeping things in a designated bag, small habits make a big difference.",
    image:
      "https://i.ibb.co/Q38pJH9G/Firefly-An-illustration-or-digital-art-showing-top-5-tips-to-prevent-losing-items-a-student-177018.jpg",
    tag: "#Tips",
  },
  {
    title: "Most Common Lost Items in Campus",
    excerpt:
      "ID cards, pendrives, calculators, and water bottles top the list. Read why!",
    image:
      "https://i.ibb.co/F43vfdf7/Firefly-An-illustration-or-digital-art-showing-top-5-tips-to-prevent-losing-items-a-student-312210.jpg",
    tag: "#LostItems",
  },
  {
    title: "How to Write a Proper Claim Request",
    excerpt:
      "Clearly describe your item, provide specific location, and attach proof if available.",
    image:
      "https://i.ibb.co/Kps751mJ/Firefly-An-illustration-or-digital-art-showing-top-5-tips-to-prevent-losing-items-a-student-853703.jpg",
    tag: "#ClaimHelp",
  },
];

const BlogTipsSection = () => {
  return (
    <Container className="py-6 mt-5">
      <h2 className="section-heading text-center mb-2 animate-fade-in">
        📚 Blog & Helpful Tips
      </h2>
      <p className="text-center text-muted mb-5">
        Tips, tricks, and advice to help you keep your things safe on campus.
      </p>
      <Row>
        {tips.map((tip, idx) => (
          <Col md={4} key={idx} className="d-flex">
            <Card className="mb-4 blog-card flex-fill">
              <div className="blog-image-wrapper">
                <Card.Img variant="top" src={tip.image} alt={tip.title} />
                <Badge className="blog-tag">{tip.tag}</Badge>
              </div>
              <Card.Body className="d-flex flex-column justify-content-between">
                <div>
                  <Card.Title>{tip.title}</Card.Title>
                  <Card.Text>{tip.excerpt}</Card.Text>
                </div>
                <div className="text-center mt-3">
                  <Button
                    className="animated-read-more-btn"
                    variant="outline-primary"
                    size="sm"
                  >
                    Read More
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default BlogTipsSection;
