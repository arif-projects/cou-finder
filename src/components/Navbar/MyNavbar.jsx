// src/components/Navbar/Navbar.jsx
import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase.config";

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
      bg="light"
      fixed="top"
      className={`shadow-sm ${
        showNavbar ? "top-0" : "-top-20"
      } transition-all duration-300`}
    >
      <Container>
        {/* Left side: Logo + Links */}
        <Navbar.Brand as={Link} to="/">
          <img
            src="/logo192.png"
            alt="CoU Finder"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          CoU Finder
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>
            <Nav.Link as={Link} to="/help">
              Help Center
            </Nav.Link>
            <Nav.Link as={Link} to="/all-items">
              All Items
            </Nav.Link>
            {user && (
              <Nav.Link as={Link} to="/dashboard">
                Dashboard
              </Nav.Link>
            )}
          </Nav>

          {/* Right side: Username + Logout / Login */}
          <Nav className="align-items-center gap-2">
            {user ? (
              <>
                <span className="text-dark fw-semibold">
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
