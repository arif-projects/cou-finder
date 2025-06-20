import { Col, Container, Row } from "react-bootstrap";
import CountUp from "react-countup";

const stats = [
  { label: "Items Reported", value: 128 },
  { label: "Items Returned", value: 89 },
  { label: "Pending Claims", value: 17 },
];

const SuccessStats = () => {
  return (
    <Container className="py-5 text-center bg-light">
      <h2 className="mb-4">Our Success Score</h2>
      <Row>
        {stats.map((stat, index) => (
          <Col md={4} key={index}>
            <h1 className="text-primary">
              <CountUp end={stat.value} duration={2.5} />
            </h1>
            <p className="fw-bold">{stat.label}</p>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SuccessStats;
