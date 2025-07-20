// src/pages/Dashboard/Dashboard.jsx
import { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Spinner,
  Tab,
  Table,
} from "react-bootstrap";
// Import the pre-configured axios instance
import axiosInstance from "../../utils/axiosInstance";

const Dashboard = () => {
  // Lost items tab state
  const [lostItems, setLostItems] = useState([]);
  const [filterStatus, setFilterStatus] = useState("");
  const [loadingLostItems, setLoadingLostItems] = useState(false);
  const [errorLostItems, setErrorLostItems] = useState(null);

  // Claims tab state
  const [claims, setClaims] = useState([]);
  const [loadingClaims, setLoadingClaims] = useState(false);
  const [errorClaims, setErrorClaims] = useState(null);

  // Matched items (filtered lost items)
  const [matchedItems, setMatchedItems] = useState([]);
  const [loadingMatched, setLoadingMatched] = useState(false);
  const [errorMatched, setErrorMatched] = useState(null);

  // Users tab state (still dummy as no backend info was provided for fetching users)
  // This part remains unchanged as per your instruction to not touch other parts.
  const [users, setUsers] = useState([
    {
      uid: "u1",
      name: "Ariful Haque",
      email: "ariful@example.com",
      role: "User",
    },
    {
      uid: "u2",
      name: "Nusrat Jahan",
      email: "nusrat@example.com",
      role: "User",
    },
    {
      uid: "admin1",
      name: "Admin User",
      email: "admin@coufinder.com",
      role: "Admin",
    },
  ]);

  // Admin settings tab state
  const [admins, setAdmins] = useState([]); // Will be fetched from backend
  const [loadingAdmins, setLoadingAdmins] = useState(false);
  const [errorAdmins, setErrorAdmins] = useState(null);
  const [newAdminEmail, setNewAdminEmail] = useState("");

  // --- Fetch Lost Items (Public endpoint, but can be protected if needed) ---
  const fetchLostItems = async () => {
    setLoadingLostItems(true);
    setErrorLostItems(null);

    try {
      // Using axiosInstance, which is configured with BASE_URL/api
      const res = await axiosInstance.get("/lost-items");
      if (Array.isArray(res.data)) {
        setLostItems(
          res.data.map((item) => ({
            id: item._id,
            name: item.itemName,
            category: item.category,
            location: item.location,
            date: new Date(item.date).toLocaleDateString(),
            description: item.description,
            image: item.image,
            userEmail: item.userEmail,
            status: item.status,
          }))
        );
      } else {
        setErrorLostItems("Unexpected response format from /api/lost-items");
      }
    } catch (error) {
      console.error("Fetch lost items error:", error);
      let message = "Failed to fetch lost items";
      if (error.response?.data?.message) message = error.response.data.message;
      else if (error.message) message = error.message;
      setErrorLostItems(message);
    } finally {
      setLoadingLostItems(false);
    }
  };

  // --- Fetch Claims (Admin-Protected) ---
  const fetchClaims = async () => {
    setLoadingClaims(true);
    setErrorClaims(null);

    try {
      // ✅ Adjusted to hit the admin-protected /api/claims endpoint
      const res = await axiosInstance.get("/claims");
      if (Array.isArray(res.data)) {
        setClaims(
          res.data.map((claim) => ({
            id: claim._id,
            claimerName: claim.claimerName,
            claimerEmail: claim.claimerEmail,
            itemId: claim.itemId,
            itemName: claim.itemName,
            claimDetails: claim.claimDetails,
            status: claim.status,
            createdAt: claim.createdAt,
          }))
        );
      } else {
        setErrorClaims("Unexpected response format from /api/claims");
      }
    } catch (error) {
      console.error("Fetch claims error:", error);
      let message = "Failed to fetch claims";
      if (error.response?.status === 401 || error.response?.status === 403) {
        message = "Unauthorized: Please ensure you are logged in as an admin.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      setErrorClaims(message);
    } finally {
      setLoadingClaims(false);
    }
  };

  // --- Fetch Admins (Admin-Protected) ---
  const fetchAdmins = async () => {
    setLoadingAdmins(true);
    setErrorAdmins(null);

    try {
      const res = await axiosInstance.get("/admins");
      if (Array.isArray(res.data)) {
        setAdmins(res.data);
      } else {
        setErrorAdmins("Unexpected response format from /api/admins");
      }
    } catch (error) {
      console.error("Fetch admins error:", error);
      let message = "Failed to fetch admins";
      if (error.response?.status === 401 || error.response?.status === 403) {
        message = "Unauthorized: Please ensure you are logged in as an admin.";
      } else if (error.response?.data?.message) {
        message = error.response.data.message;
      } else if (error.message) {
        message = error.message;
      }
      setErrorAdmins(message);
    } finally {
      setLoadingAdmins(false);
    }
  };

  // --- Update Lost Item Status (Admin-Protected) ---
  const updateLostItemStatus = async (id, newStatus) => {
    try {
      await axiosInstance.put(`/lost-items/${id}`, { status: newStatus });
      setLostItems((items) =>
        items.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (error) {
      console.error("Update lost item status error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to update lost item status"
      );
    }
  };

  // --- Verify Claim (Admin-Protected) ---
  const verifyClaim = async (claimId) => {
    try {
      await axiosInstance.put(`/claims/${claimId}`, { status: "matched" }); // ✅ Adjusted to use /claims
      setClaims((prev) =>
        prev.map((claim) =>
          claim.id === claimId ? { ...claim, status: "matched" } : claim
        )
      );
      // Also update lost item status in UI
      const claim = claims.find((c) => c.id === claimId);
      if (claim) {
        await updateLostItemStatus(claim.itemId, "matched");
      }
    } catch (error) {
      console.error("Verify claim error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to verify claim"
      );
    }
  };

  // --- Reject Claim (Admin-Protected) ---
  const rejectClaim = async (claimId) => {
    try {
      await axiosInstance.put(`/claims/${claimId}`, { status: "rejected" }); // ✅ Adjusted to use /claims
      setClaims((prev) =>
        prev.map((claim) =>
          claim.id === claimId ? { ...claim, status: "rejected" } : claim
        )
      );
    } catch (error) {
      console.error("Reject claim error:", error);
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to reject claim"
      );
    }
  };

  // --- Add Admin (Admin-Protected) ---
  const addAdmin = async (e) => {
    e.preventDefault();
    if (!newAdminEmail.trim()) {
      alert("Please enter a valid email");
      return;
    }

    try {
      await axiosInstance.post("/admins", { email: newAdminEmail.trim() });
      alert("Admin added successfully!");
      setNewAdminEmail("");
      fetchAdmins(); // Re-fetch the list of admins to show the update
    } catch (error) {
      console.error("Error adding admin:", error);
      alert(
        error.response?.data?.message || error.message || "Failed to add admin"
      );
    }
  };

  // --- Remove Admin (Admin-Protected) ---
  const removeAdmin = async (emailToRemove) => {
    if (
      window.confirm(
        `Are you sure you want to remove ${emailToRemove} as an admin?`
      )
    ) {
      try {
        await axiosInstance.delete(`/admins/${emailToRemove}`);
        alert("Admin removed successfully!");
        // Update state directly for immediate UI feedback
        setAdmins((prev) => prev.filter((a) => a.email !== emailToRemove));
      } catch (error) {
        console.error("Error removing admin:", error);
        alert(
          error.response?.data?.message ||
            error.message ||
            "Failed to remove admin"
        );
      }
    }
  };

  // --- Filter Lost Items ---
  const filteredLostItems = lostItems.filter((item) =>
    filterStatus ? item.status === filterStatus : true
  );

  // --- Matched items filtered from lostItems ---
  useEffect(() => {
    setLoadingMatched(true);
    setErrorMatched(null);
    try {
      const matched = lostItems.filter((item) => item.status === "matched");
      setMatchedItems(matched);
    } catch (error) {
      setErrorMatched("Failed to filter matched items");
      console.error("Error filtering matched items:", error);
    } finally {
      setLoadingMatched(false);
    }
  }, [lostItems]);

  // --- Load initial data on first mount ---
  useEffect(() => {
    fetchLostItems();
    fetchClaims();
    fetchAdmins(); // Fetch admins on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container fluid className="py-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <Tab.Container defaultActiveKey="lostItems">
        <Row>
          {" "}
          {/* Sidebar */}
          <Col md={3}>
            <Nav variant="pills" className="flex-column" role="tablist">
              <Nav.Item>
                <Nav.Link eventKey="lostItems">📦 All Lost Items</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="claims">📥 Claim Requests</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="matched">✅ Matched Items</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="users">👥 All Users</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="admins">⚙️ Admin Settings</Nav.Link>
              </Nav.Item>
            </Nav>
          </Col>
          {/* Tab content */}
          <Col md={9}>
            <Tab.Content>
              {/* All Lost Items */}
              <Tab.Pane eventKey="lostItems">
                <h5 className="mb-3">All Reported Lost Items</h5>
                <Form.Group controlId="statusFilter" className="mb-3">
                  <Form.Label>Status Filter:</Form.Label>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    disabled={loadingLostItems}
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="claimed">Claimed</option>
                    <option value="matched">Matched</option>
                  </Form.Select>
                </Form.Group>
                {loadingLostItems && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />{" "}
                  </div>
                )}{" "}
                {errorLostItems && (
                  <Alert variant="danger">{errorLostItems}</Alert>
                )}
                {!loadingLostItems && !errorLostItems && (
                  <Table striped bordered hover responsive>
                    <thead className="table-dark">
                      <tr>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Location</th>
                        <th>Category</th>
                        <th>Date Reported</th>
                        <th>Description</th>
                        <th>Reported By</th>
                        <th>Status</th> <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredLostItems.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center">
                            No lost items found.
                          </td>
                        </tr>
                      ) : (
                        filteredLostItems.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <img
                                src={item.image}
                                alt={item.name}
                                style={{
                                  width: "80px",
                                  height: "50px",
                                  objectFit: "cover",
                                }}
                              />
                            </td>
                            <td>{item.name}</td>
                            <td>{item.location}</td>
                            <td>{item.category}</td>
                            <td>{item.date}</td>
                            <td>{item.description}</td>
                            <td>{item.userEmail}</td>
                            <td>
                              <span
                                className={`badge text-capitalize ${
                                  item.status === "pending"
                                    ? "bg-warning"
                                    : item.status === "claimed"
                                    ? "bg-info"
                                    : "bg-success"
                                }`}
                              >
                                {item.status}{" "}
                              </span>
                            </td>
                            <td>
                              {item.status !== "matched" ? (
                                <>
                                  {item.status !== "claimed" && (
                                    <Button
                                      variant="info"
                                      size="sm"
                                      className="me-2"
                                      onClick={() =>
                                        updateLostItemStatus(item.id, "claimed")
                                      }
                                    >
                                      Mark as Claimed
                                    </Button>
                                  )}
                                  <Button
                                    variant="success"
                                    size="sm"
                                    onClick={() =>
                                      updateLostItemStatus(item.id, "matched")
                                    }
                                  >
                                    Mark as Matched
                                  </Button>
                                </>
                              ) : (
                                <em>Completed</em>
                              )}
                            </td>{" "}
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                )}
              </Tab.Pane>

              {/* Claims Tab */}
              <Tab.Pane eventKey="claims">
                <h5 className="mb-3">Claim Requests</h5>
                {loadingClaims && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}
                {errorClaims && <Alert variant="danger">{errorClaims}</Alert>}
                {!loadingClaims && !errorClaims && (
                  <Table striped bordered hover responsive>
                    <thead className="table-dark">
                      <tr>
                        {" "}
                        <th>Claimer Name</th>
                        <th>Email</th>
                        <th>Item ID / Name</th>
                        <th>Claim Text</th>
                        <th>Claim Date</th> <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {" "}
                      {claims.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="text-center">
                            No claim requests found.
                          </td>
                        </tr>
                      ) : (
                        claims.map((claim) => (
                          <tr key={claim.id}>
                            <td>{claim.claimerName}</td>
                            <td>{claim.claimerEmail}</td>
                            <td>
                              {claim.itemId} / <strong>{claim.itemName}</strong>
                            </td>
                            <td>{claim.claimDetails}</td>
                            <td>
                              {new Date(claim.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                              <span
                                className={`badge text-capitalize ${
                                  claim.status === "pending"
                                    ? "bg-warning"
                                    : claim.status === "matched"
                                    ? "bg-success"
                                    : "bg-danger"
                                }`}
                              >
                                {claim.status}
                              </span>
                            </td>
                            <td>
                              {" "}
                              {claim.status === "pending" ? (
                                <>
                                  {" "}
                                  <Button
                                    variant="success"
                                    size="sm"
                                    className="me-2"
                                    onClick={() => verifyClaim(claim.id)}
                                  >
                                    Verify & Match
                                  </Button>
                                  <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => rejectClaim(claim.id)}
                                  >
                                    Reject
                                  </Button>
                                </>
                              ) : (
                                <em>No actions</em>
                              )}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                )}{" "}
              </Tab.Pane>

              {/* Matched Items Tab */}
              <Tab.Pane eventKey="matched">
                <h5 className="mb-3">Matched Items</h5>

                {loadingMatched && (
                  <div className="text-center my-3">
                    <Spinner animation="border" />
                  </div>
                )}
                {errorMatched && <Alert variant="danger">{errorMatched}</Alert>}

                {!loadingMatched && !errorMatched && (
                  <Table striped bordered hover responsive>
                    <thead className="table-dark">
                      <tr>
                        <th>Owner Email</th>
                        <th>Return Date</th>
                        <th>Item Name</th> <th>Category</th>
                        <th>Location</th>
                        <th>Description</th>
                        <th>Claimer Name</th>
                        <th>Claimer Email</th>
                        <th>Proof</th>
                      </tr>
                    </thead>
                    <tbody>
                      {matchedItems.length === 0 ? (
                        <tr>
                          <td colSpan={9} className="text-center">
                            No matched items found.
                          </td>
                        </tr>
                      ) : (
                        matchedItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.userEmail}</td>
                            <td>-</td>
                            <td>{item.name}</td>
                            <td>{item.category}</td>
                            <td>{item.location}</td>
                            <td>{item.description}</td>
                            <td>-</td> <td>-</td>
                            <td>N/A</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </Table>
                )}
              </Tab.Pane>

              {/* Users Tab (Dummy) */}
              <Tab.Pane eventKey="users">
                <h5 className="mb-3">All Users</h5>
                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan={4} className="text-center">
                          No users found.
                        </td>
                      </tr>
                    ) : (
                      users.map((user) => (
                        <tr key={user.uid}>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.role}</td>
                          <td>
                            {user.role === "User" ? (
                              <Button
                                size="sm"
                                variant="success"
                                onClick={() =>
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u.uid === user.uid
                                        ? { ...u, role: "Admin" }
                                        : u
                                    )
                                  )
                                }
                              >
                                Promote to Admin
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="warning"
                                onClick={() =>
                                  setUsers((prev) =>
                                    prev.map((u) =>
                                      u.uid === user.uid
                                        ? { ...u, role: "User" }
                                        : u
                                    )
                                  )
                                }
                              >
                                Demote to User
                              </Button>
                            )}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* Admin Settings Tab (LIVE API INTEGRATION) */}
              <Tab.Pane eventKey="admins">
                <h5 className="mb-3">Admin Settings</h5>
                <Form onSubmit={addAdmin} className="mb-3">
                  <Form.Group controlId="formAdminEmail" className="mb-2">
                    <Form.Label>Add New Admin by Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter admin email"
                      value={newAdminEmail}
                      onChange={(e) => setNewAdminEmail(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Add Admin
                  </Button>
                </Form>

                {loadingAdmins && (
                  <div className="text-center my-3">
                    {" "}
                    <Spinner animation="border" />
                  </div>
                )}
                {errorAdmins && <Alert variant="danger">{errorAdmins}</Alert>}

                {!loadingAdmins && !errorAdmins && (
                  <>
                    {admins.length === 0 ? (
                      <Alert variant="info">No admins added yet.</Alert>
                    ) : (
                      <Table striped bordered hover responsive>
                        <thead className="table-dark">
                          <tr>
                            <th>Email</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {admins.map((admin) => (
                            <tr key={admin.email}>
                              <td>{admin.email}</td>
                              <td>
                                <Button
                                  size="sm"
                                  variant="danger"
                                  onClick={() => removeAdmin(admin.email)}
                                >
                                  Remove Admin
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    )}
                  </>
                )}
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};
export default Dashboard;
