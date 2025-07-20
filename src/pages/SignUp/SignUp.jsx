// src/pages/SignUp/SignUp.jsx
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../firebase/firebase.config";
import "./SignUp.css"; // 👈 Import styling

const auth = getAuth(app);

const SignUp = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;
    const phone = form.phone.value;
    const studentId = form.studentId.value;
    const department = form.department.value;
    const batch = form.batch.value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        updateProfile(result.user, {
          displayName: name,
        }).then(() => {
          navigate("/");
        });
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div className="signup-page d-flex flex-column flex-md-row mt-5">
      {/* Left image section */}
      <div className="signup-image d-none d-md-block">
        {/* Background image applied via CSS */}
      </div>

      {/* Right form section */}
      <div className="signup-form-wrapper d-flex align-items-center justify-content-center ">
        <div className="signup-form-container">
          <h2 className="form-heading mb-4 text-center">Sign Up</h2>
          <form onSubmit={handleSignUp}>
            <div className="form-group mb-3">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Email address</label>
              <input
                type="email"
                name="email"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Phone Number</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Student ID</label>
              <input
                type="text"
                name="studentId"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Department</label>
              <input
                type="text"
                name="department"
                className="form-control"
                required
              />
            </div>
            <div className="form-group mb-3">
              <label>Batch</label>
              <input
                type="text"
                name="batch"
                className="form-control"
                required
              />
            </div>
            {error && <div className="alert alert-danger">{error}</div>}
            <button type="submit" className="login-btn">
              Sign Up
            </button>
          </form>
          <p className="mt-3 text-center">
            Already have an account? <a href="/login">Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
