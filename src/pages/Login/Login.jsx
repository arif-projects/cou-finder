import "animate.css";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import app from "../../firebase/firebase.config";
import axiosInstance from "../../utils/axiosInstance";
import "./Login.css";

const auth = getAuth(app);

const Login = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const response = await axiosInstance.post("/auth/generate-token", {
        email: user.email,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      navigate(from, { replace: true });
    } catch (err) {
      if (err.code && err.code.startsWith("auth/")) {
        let firebaseErrorMessage =
          "Firebase login failed. Please check your credentials.";
        if (err.code === "auth/user-not-found") {
          firebaseErrorMessage = "No user found with this email.";
        } else if (err.code === "auth/wrong-password") {
          firebaseErrorMessage = "Incorrect password.";
        } else if (err.code === "auth/invalid-email") {
          firebaseErrorMessage = "Invalid email format.";
        }
        setError(firebaseErrorMessage);
      } else if (
        err.response &&
        err.response.data &&
        err.response.data.message
      ) {
        setError(err.response.data.message);
      } else {
        setError("An unexpected error occurred during login.");
      }
    }
  };

  return (
    <div className="login-page d-flex">
      {/* Left Image Section */}
      <div className="login-image-section d-none d-md-block mt-5"></div>

      {/* Right Form Section */}
      <div className="login-form-section d-flex align-items-center justify-content-center w-100">
        <div className="login-form-container animate__animated animate__fadeInUp">
          <h2 className="login-heading animate__animated animate__zoomIn">
            Login
          </h2>
          <form onSubmit={handleLogin} className="mt-4">
            <div className="form-group mb-3 animate__animated animate__fadeInUp animate__delay-1s">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control login-input"
                required
              />
            </div>
            <div className="form-group mb-3 animate__animated animate__fadeInUp animate__delay-1s">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control login-input"
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="btn login-btn w-100">
              Login
            </button>
          </form>
          <p className="mt-3 text-center text-muted">
            Don’t have an account? <a href="/signup">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
