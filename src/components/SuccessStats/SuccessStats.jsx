import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";
import { FaBoxOpen, FaClock, FaUndoAlt } from "react-icons/fa"; // Example icons
import "./SuccessStats.css";

const stats = [
  { label: "Items Reported", value: 128, icon: <FaBoxOpen /> },
  { label: "Items Returned", value: 89, icon: <FaUndoAlt /> },
  { label: "Pending Claims", value: 17, icon: <FaClock /> },
];

const SuccessStats = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      delay: 100,
    });
  }, []);

  return (
    <Container className="py-5 text-center bg-light success-score-container">
      <h2 className="section-heading animate-fade-in mb-5">
        Our Success Score
      </h2>
      <p className="section-subheading">
        Tracking our achievements and progress so far.
      </p>

      <Row>
        {stats.map((stat, index) => (
          <Col
            md={4}
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="mb-4"
          >
            <div className="stat-box hover-zoom">
              <div className="stat-icon">{stat.icon}</div>
              <h1 className="stat-number text-primary">
                <CountUp end={stat.value} duration={4} />
              </h1>
              <p className="stat-label">{stat.label}</p>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SuccessStats;
