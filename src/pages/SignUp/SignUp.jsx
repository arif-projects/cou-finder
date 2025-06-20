// src/pages/SignUp/SignUp.jsx
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import app from "../../firebase/firebase.config";

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
        // Update Firebase user profile with name
        updateProfile(result.user, {
          displayName: name,
        }).then(() => {
          console.log("Profile updated");

          // TODO: Send user info to MongoDB via backend later
          // You’ll need axios + your API here

          navigate("/");
        });
      })
      .catch((error) => {
        console.error(error);
        setError(error.message);
      });
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4 text-center">Sign Up</h2>
      <form onSubmit={handleSignUp}>
        <div className="mb-3">
          <label className="form-label">Full Name</label>
          <input type="text" name="name" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email address</label>
          <input type="email" name="email" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            name="password"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" name="phone" className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Student ID</label>
          <input
            type="text"
            name="studentId"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Department</label>
          <input
            type="text"
            name="department"
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Batch</label>
          <input type="text" name="batch" className="form-control" required />
        </div>
        {error && <div className="alert alert-danger">{error}</div>}
        <button type="submit" className="btn btn-success w-100">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
