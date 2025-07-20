import { Container } from "react-bootstrap";
import "./CampusMapSection.css";

const CampusMapSection = () => {
  return (
    <Container className="py-5">
      <h2 className="section-heading text-center mb-4 animate-fade-in">
        📍 Campus Location
      </h2>
      <div className="map-responsive">
        <iframe
          title="Comilla University Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3661.1371318026745!2d91.13388507492508!3d23.41941297889765!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37547e78b6312e8d%3A0xa9c070c9b3e0d1b9!2sComilla%20University!5e0!3m2!1sen!2sbd!4v1752487995726!5m2!1sen!2sbd"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </Container>
  );
};

export default CampusMapSection;
