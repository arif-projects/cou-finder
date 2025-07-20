import { useEffect } from "react";
import {
  Accordion,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { FaPhoneAlt, FaSearch } from "react-icons/fa";
import "./HelpCenter.css";

const HelpCenter = () => {
  useEffect(() => {
    document.title = "Help Center";
  }, []);

  return (
    <div className="help-center-container">
      {/* Introduction */}
      <Container className="section">
        <div className="neu-card">
          <Row className="align-items-center">
            <Col md={6}>
              <h2 className="section-title">Welcome to the Help Center</h2>
              <p>
                Need assistance with reporting or claiming a lost item? Find all
                the guidance you need here.
              </p>
            </Col>
            <Col md={6}>
              <div className="placeholder-image">Image Here</div>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Search Bar */}
      <Container className="section">
        <div className="neu-card">
          <Form>
            <Form.Group className="d-flex align-items-center">
              <FaSearch className="me-2" />
              <Form.Control
                type="text"
                className="search-bar"
                placeholder="Search Help Topics..."
              />
            </Form.Group>
          </Form>
        </div>
      </Container>

      {/* FAQs */}
      <Container className="section">
        <div className="neu-card">
          <h3 className="section-title">Frequently Asked Questions</h3>
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>How do I report a lost item?</Accordion.Header>
              <Accordion.Body>
                Go to the Lost Item form and fill out the required fields with
                details of the item.
              </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey="1">
              <Accordion.Header>How can I claim a found item?</Accordion.Header>
              <Accordion.Body>
                If you find a matched item, you can submit a claim request. The
                admin will verify and contact you.
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>

      {/* Step-by-step Guide */}
      <Container className="section">
        <div className="neu-card">
          <h3 className="section-title">Step-by-Step Guide</h3>
          <Row>
            <Col md={4} className="mb-4">
              <Card className="guide-card">
                <Card.Body>
                  <Card.Title>1. Login</Card.Title>
                  <Card.Text>Login using your student credentials.</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="guide-card">
                <Card.Body>
                  <Card.Title>2. Report</Card.Title>
                  <Card.Text>
                    Submit details of your lost item in the form.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className="mb-4">
              <Card className="guide-card">
                <Card.Body>
                  <Card.Title>3. Track & Claim</Card.Title>
                  <Card.Text>
                    Track updates and submit a claim if needed.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>

      {/* Contact Form */}
      <Container className="section">
        <div className="neu-card">
          <h3 className="section-title">Contact Us</h3>
          <Form className="contact-form">
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your name"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Message</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                placeholder="Your message..."
                required
              />
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Attach File (optional)</Form.Label>
              <Form.Control type="file" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </div>
      </Container>

      {/* Policy Section */}
      <Container className="section">
        <div className="neu-card">
          <h3 className="section-title">Campus Lost & Found Policy</h3>
          <p>
            Our campus encourages honesty and community effort in handling lost
            and found items. All items reported are reviewed by the admin team.
          </p>
        </div>
      </Container>

      {/* Emergency Banner */}
      <Container fluid className="emergency-banner">
        <p>
          <FaPhoneAlt className="me-2" />
          For urgent support call: <strong>+880123456789</strong>
        </p>
      </Container>
    </div>
  );
};

export default HelpCenter;
