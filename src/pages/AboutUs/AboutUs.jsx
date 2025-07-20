import { motion } from "framer-motion";
import { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const AboutUs = () => {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // emailjs.sendForm(...) for EmailJS integration
  };

  return (
    <Container className="py-5 mt-5">
      {/* Heading Section */}
      <Row className="justify-content-center text-center mb-4">
        <Col md={8}>
          <h1 className="display-5 fw-bold">About CoU Finder</h1>
          <p className="lead text-muted">
            Making it easy for students to report, find, and reclaim lost items
            on campus.
          </p>
        </Col>
      </Row>

      {/* Our Mission Section */}
      <Row className="mb-5 align-items-center">
        <Col md={6}>
          <motion.img
            whileHover={{ scale: 1.03 }}
            src="https://i.ibb.co/mFyQVgMG/downloaded-image.png"
            alt="Mission"
            className="img-fluid rounded shadow"
            style={{ maxHeight: "300px", objectFit: "cover" }}
          />
        </Col>
        <Col md={6} className="mt-4 mt-md-0">
          <h2 className="fw-bold mb-3">Our Mission</h2>
          <p style={{ fontSize: "1.15rem" }}>
            At <strong>CoU Finder</strong>, our mission is to simplify the
            process of tracking and reclaiming lost items across the campus. We
            aim to create a tech-friendly environment that connects finders and
            seekers and encourages responsibility and collaboration.
          </p>
        </Col>
      </Row>

      {/* Features Section */}
      <Row className="text-center mb-5">
        <h2 className="fw-bold mb-1">Key Features</h2>
        <p className="text-muted mb-4">
          Powerful tools to simplify lost & found management
        </p>
        {[
          {
            icon: "🔍",
            title: "Smart Search",
            text: "Easily browse and search reported lost items with filters and tags.",
          },
          {
            icon: "🧾",
            title: "Claim System",
            text: "Submit a claim for an item you've lost and verify ownership details.",
          },
          {
            icon: "🛡️",
            title: "Admin Dashboard",
            text: "Admins can manage items, review claims, and monitor activities from a central hub.",
          },
        ].map((feature, idx) => (
          <Col md={4} className="mb-4" key={idx}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="h-100 shadow border-0 rounded p-4 bg-white"
              style={{ borderRadius: "20px", transition: "0.3s" }}
            >
              <div
                className="mb-3"
                style={{ fontSize: "2.5rem", transition: "0.3s" }}
              >
                <motion.span whileHover={{ rotate: 20 }}>
                  {feature.icon}
                </motion.span>
              </div>
              <h5 className="fw-semibold mb-2">{feature.title}</h5>
              <p className="text-muted">{feature.text}</p>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Team Section */}
      <Row className="text-center mb-5">
        <h2 className="fw-bold mb-1">Meet the Developer Team</h2>
        <p className="text-muted mb-4">Dedicated minds behind the platform</p>

        {[
          {
            name: "Dr. Mahmudul Hasan, SMIEEE",
            role: "Associate Professor",
            phone: "+88-01725-610125",
            email: "mh@cou.ac.bd",
            image: "https://i.ibb.co/pvmW4b4c/image.png",
          },
          {
            name: "Md. Ariful Haque",
            role: "Digital Advertising Executive, SEBPO | MERN Stack Developer",
            phone: "+88-01625-338665",
            email: "arifulhaque60332@gmail.com",
            image:
              "https://i.ibb.co/4y1xfHG/ea033bef-4f16-4568-be47-59cabb704b00.png",
          },
        ].map((member, idx) => (
          <Col md={6} className="mb-4" key={idx}>
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="shadow border-0 h-100 bg-white rounded"
              style={{ borderRadius: "20px" }}
            >
              <Card.Img
                variant="top"
                src={member.image}
                className="img-fluid rounded-top"
                style={{ height: "280px", objectFit: "cover" }}
              />
              <Card.Body>
                <h5 className="fw-bold mb-1">{member.name}</h5>
                <p className="mb-1 text-muted">{member.role}</p>
                <p className="mb-1 text-muted">Cell: {member.phone}</p>
                <p className="mb-0 text-muted">Email: {member.email}</p>
              </Card.Body>
            </motion.div>
          </Col>
        ))}
      </Row>

      {/* Contact Form Section */}
      <Row className="justify-content-center">
        <Col md={10}>
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="p-5 bg-light rounded shadow-sm"
            style={{ borderRadius: "20px" }}
          >
            <h2 className="fw-bold text-center mb-1">
              Want to collaborate or have suggestions?
            </h2>
            <p className="text-muted text-center mb-4">
              Share your thoughts or ideas with us — we’d love to hear from you!
            </p>
            <Form ref={form} onSubmit={handleSubmit}>
              <Row>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control
                      type="text"
                      name="user_name"
                      placeholder="Enter your name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      name="user_email"
                      placeholder="Enter your email"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group className="mb-3" controlId="formSubject">
                <Form.Label>Subject</Form.Label>
                <Form.Control
                  type="text"
                  name="subject"
                  placeholder="Write a subject"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formMessage">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  placeholder="Write your message here"
                  required
                />
              </Form.Group>

              <div className="text-center">
                <Button
                  type="submit"
                  variant="primary"
                  className="px-5 rounded-pill"
                >
                  Send Message
                </Button>
              </div>
            </Form>
          </motion.div>
        </Col>
      </Row>
    </Container>
  );
};

export default AboutUs;
