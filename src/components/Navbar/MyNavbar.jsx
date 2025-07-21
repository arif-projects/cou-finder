// src/components/Navbar/Navbar.jsx
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";
import "./Navbar.css";

const CustomNavbar = () => {
  const [user] = useAuthState(auth);
  const [showNavbar, setShowNavbar] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(window.scrollY);
  const navigate = useNavigate();

  // Hide/show navbar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setShowNavbar(prevScrollPos > currentScrollPos || currentScrollPos < 10);
      setPrevScrollPos(currentScrollPos);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        console.log("Logged out");
        navigate("/");
      })
      .catch((error) => console.error("Logout error:", error));
  };

  return (
    <Navbar
      expand="lg"
      fixed="top"
      bg="light"
      className={`shadow transition-navbar ${
        showNavbar ? "navbar-visible" : "navbar-hidden"
      }`}
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <Container>
        {/* Brand Name with Icon */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="fw-bold d-flex align-items-center gap-2"
          style={{ fontSize: "1.4rem", color: "#4B0082" }}
        >
          <FaSearch className="mb-1" />
          CoU Finder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {["/", "/all-items", "/about", "/help"].map((path, idx) => (
              <Nav.Link
                key={idx}
                as={Link}
                to={path}
                className="nav-link-custom"
              >
                {["Home", "All Items", "About Us", "Help Center"][idx]}
              </Nav.Link>
            ))}
            {user?.email === "admin@cou.edu" && (
              <Nav.Link as={Link} to="/dashboard" className="nav-link-custom">
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          {/* Right Side Auth Controls */}
          <Nav className="align-items-center gap-2">
            {user ? (
              <>
                <span className="fw-semibold text-dark">
                  {user.displayName || "User"}
                </span>
                <Button variant="outline-danger" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Button as={Link} to="/login" variant="outline-primary">
                Login
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
