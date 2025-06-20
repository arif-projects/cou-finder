import { Col, Container, Row } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>CoU Finder</h5>
            <p>Smart Lost & Found system for Comilla University campus.</p>
          </Col>
          <Col md={4}>
            <h6>Quick Links</h6>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-white text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/about" className="text-white text-decoration-none">
                  About Us
                </a>
              </li>
              <li>
                <a href="/help" className="text-white text-decoration-none">
                  Help Center
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h6>Contact</h6>
            <p>Email: support@coufinder.com</p>
            <p>Phone: +880-1234-567890</p>
          </Col>
        </Row>
        <hr className="border-light" />
        <div className="text-center">
          &copy; {new Date().getFullYear()} CoU Finder. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
