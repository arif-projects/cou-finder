import { Col, Container, Row } from "react-bootstrap";
import {
  FaEnvelope,
  FaFacebook,
  FaGithub,
  FaLinkedin,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer-bg text-white pt-5 pb-3 mt-5">
      <Container>
        <Row>
          {/* Logo + Description */}
          <Col md={4} className="mb-4 mb-md-0">
            <h5 className="footer-logo">🔍 CoU Finder</h5>
            <p>Smart Lost & Found system for Comilla University campus.</p>
            <div className="social-icons mt-3">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">
                <FaFacebook />
              </a>
              <a href="https://github.com" target="_blank" rel="noreferrer">
                <FaGithub />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer">
                <FaLinkedin />
              </a>
            </div>
          </Col>

          {/* Quick Links */}
          <Col md={4} className="mb-4 mb-md-0">
            <h6 className="mb-3">Quick Links</h6>
            <ul className="list-unstyled footer-links">
              <li>
                <Link to="/" className="footer-link">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/help" className="footer-link">
                  Help Center
                </Link>
              </li>
            </ul>
          </Col>

          {/* Contact */}
          <Col md={4}>
            <h6 className="mb-3">Contact</h6>
            <p>
              <FaEnvelope className="me-2" /> support@coufinder.com
            </p>
            <p>
              <FaPhoneAlt className="me-2" /> +880-1234-567890
            </p>
            <p>
              <FaMapMarkerAlt className="me-2" /> Cumilla University, Cumilla
            </p>
          </Col>
        </Row>

        <hr className="border-secondary mt-4" />
        <div className="text-center small">
          &copy; {new Date().getFullYear()} <strong>CoU Finder</strong>. All
          Rights Reserved.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
