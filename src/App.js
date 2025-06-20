import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import MyNavbar from "./components/Navbar/MyNavbar";
import AboutUs from "./pages/AboutUs/AboutUs";
import AllItems from "./pages/AllItems/AllItems";
import Dashboard from "./pages/Dashboard/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import PrivateRoute from "./routes/PrivateRoute";

function App() {
  return (
    <Router>
      <MyNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/all-items" element={<AllItems />} />
        <Route path="/about" element={<AboutUs />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
