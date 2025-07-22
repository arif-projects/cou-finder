import { useEffect } from "react";
import { Accordion, Card, Col, Container, Form, Row } from "react-bootstrap";
import {
  FaArrowRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaSearch,
  FaTools,
} from "react-icons/fa"; // Added relevant React Icons
import "./HelpCenter.css";

const HelpCenter = () => {
  useEffect(() => {
    document.title = "Help Center";
  }, []);

  return (
    <div className="help-center-container mt-5">
      {/* Introduction */}
      <Container className="section intro-section">
        <Row className="align-items-center">
          <Col md={6}>
            <h2 className="section-title">Welcome to the Help Center</h2>
            <p className="section-subheading">
              Need assistance with reporting or claiming a lost item? Find all
              the guidance you need here.
            </p>
          </Col>
          <Col md={6}>
            <div className="help-center-image">
              <img
                src="https://i.ibb.co/yFgCCHSq/Chat-GPT-Image-Jul-22-2025-04-39-51-PM.png"
                alt="Help Center Image"
                className="img-fluid"
              />
            </div>
          </Col>
        </Row>
      </Container>

      {/* Search Bar */}
      <Container className="section">
        <div className="search-card">
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
      <Container className="section faq-section">
        <h3 className="section-title text-center">
          Frequently Asked Questions
        </h3>
        <Row className="align-items-center">
          <Col md={6}>
            <div className="faq-image">
              <img
                src="https://i.ibb.co/spdWrQ4R/Chat-GPT-Image-Jul-22-2025-05-05-40-PM.png"
                alt="FAQs Image"
                className="img-fluid"
              />
            </div>
          </Col>
          <Col md={6}>
            <Accordion defaultActiveKey="0">
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  How do I report a lost item?
                </Accordion.Header>
                <Accordion.Body>
                  Go to the Lost Item form and fill out the required fields with
                  details of the item.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  How can I claim a found item?
                </Accordion.Header>
                <Accordion.Body>
                  If you find a matched item, you can submit a claim request.
                  The admin will verify and contact you.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  Can I modify my reported item details?
                </Accordion.Header>
                <Accordion.Body>
                  Once submitted, your report can be edited by the admin.
                  Contact us for assistance if needed.
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="3">
                <Accordion.Header>
                  How long does it take for a claim to be processed?
                </Accordion.Header>
                <Accordion.Body>
                  Processing usually takes between 2-5 business days, depending
                  on the complexity of the claim.
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </Col>
        </Row>
      </Container>

      {/* Step-by-step Guide */}
      <Container className="section guide-section">
        <h3 className="section-title text-center">Step-by-Step Guide</h3>
        <Row>
          <Col md={4} className="mb-4">
            <Card className="guide-card">
              <Card.Body>
                <Card.Title>
                  <FaCheckCircle className="me-2" />
                  1. Login
                </Card.Title>
                <Card.Text>Login using your student credentials.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="guide-card">
              <Card.Body>
                <Card.Title>
                  <FaTools className="me-2" />
                  2. Report
                </Card.Title>
                <Card.Text>
                  Submit details of your lost item in the form.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4} className="mb-4">
            <Card className="guide-card">
              <Card.Body>
                <Card.Title>
                  <FaArrowRight className="me-2" />
                  3. Track & Claim
                </Card.Title>
                <Card.Text>Track updates,submit a claim if needed.</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Campus Lost & Found Policy */}
      <Container className="section">
        <div className="policy-card">
          <h3 className="section-title text-center">
            Campus Lost & Found Policy
          </h3>
          <p>
            Our campus encourages honesty and community effort in handling lost
            and found items. All items reported are reviewed by the admin team.
          </p>
          <p>
            For any lost items, please ensure accurate information is provided.
            Items will be held for up to 30 days before being disposed of or
            donated.
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
