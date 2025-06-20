// src/pages/Dashboard/Dashboard.jsx
import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Row,
  Tab,
  Table,
} from "react-bootstrap";

const dummyLostItems = [
  {
    id: 1,
    name: "Black Wallet",
    category: "Personal Item",
    location: "Library",
    date: "2025-06-01",
    description: "Black leather wallet with ID cards",
    image: "https://via.placeholder.com/100x60.png?text=Wallet",
    userEmail: "ariful@example.com",
    status: "pending",
  },
  {
    id: 2,
    name: "USB Drive",
    category: "Electronics",
    location: "CSE Lab",
    date: "2025-06-05",
    description: "8GB Kingston USB with project files",
    image: "https://via.placeholder.com/100x60.png?text=USB",
    userEmail: "nusrat@example.com",
    status: "claimed",
  },
  {
    id: 3,
    name: "Backpack",
    category: "Bags",
    location: "Playground",
    date: "2025-06-10",
    description: "Black backpack with notebooks",
    image: "https://via.placeholder.com/100x60.png?text=Backpack",
    userEmail: "admin@coufinder.com",
    status: "matched",
  },
];

const dummyClaims = [
  {
    id: 101,
    claimerName: "Ariful Haque",
    claimerEmail: "ariful@example.com",
    itemId: 1,
    itemName: "Black Wallet",
    claimText: "I lost this wallet near the library entrance.",
    claimDate: "2025-06-12",
    status: "pending",
  },
  {
    id: 102,
    claimerName: "Nusrat Jahan",
    claimerEmail: "nusrat@example.com",
    itemId: 2,
    itemName: "USB Drive",
    claimText: "My project files are inside this USB.",
    claimDate: "2025-06-13",
    status: "pending",
  },
];

const dummyMatchedItems = [
  {
    id: 3,
    ownerName: "Admin User",
    ownerEmail: "admin@coufinder.com",
    returnDate: "2025-06-15",
    itemName: "Backpack",
    itemCategory: "Bags",
    itemLocation: "Playground",
    itemDescription: "Black backpack with notebooks",
    claimerName: "Sakib",
    claimerEmail: "sakib@example.com",
    proof: "https://via.placeholder.com/150?text=Proof+Image",
  },
];

const dummyUsers = [
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
];

const dummyAdmins = [
  { email: "admin@coufinder.com" },
  { email: "superadmin@coufinder.com" },
];

const Dashboard = () => {
  const [lostItems, setLostItems] = useState(dummyLostItems);
  const [filterStatus, setFilterStatus] = useState("");
  const [claims, setClaims] = useState(dummyClaims);
  const [matchedItems, setMatchedItems] = useState(dummyMatchedItems);
  const [users, setUsers] = useState(dummyUsers);
  const [admins, setAdmins] = useState(dummyAdmins);

  // Filter lost items by status
  const filteredLostItems = lostItems.filter((item) =>
    filterStatus ? item.status === filterStatus : true
  );

  // --- Lost Items Handlers ---
  const updateLostItemStatus = (id, newStatus) => {
    setLostItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, status: newStatus } : item
      )
    );
    console.log(`Lost Item ${id} marked as ${newStatus}`);
  };

  // --- Claims Handlers ---
  const verifyClaim = (claimId) => {
    setClaims((claims) =>
      claims.map((claim) =>
        claim.id === claimId ? { ...claim, status: "matched" } : claim
      )
    );
    // Also update lost item status to matched
    const claim = claims.find((c) => c.id === claimId);
    if (claim) updateLostItemStatus(claim.itemId, "matched");
    console.log(`Claim ${claimId} verified and marked matched`);
  };

  const rejectClaim = (claimId) => {
    setClaims((claims) =>
      claims.map((claim) =>
        claim.id === claimId ? { ...claim, status: "rejected" } : claim
      )
    );
    console.log(`Claim ${claimId} rejected`);
  };

  // --- User Role Management ---
  const promoteUser = (uid) => {
    setUsers((users) =>
      users.map((user) =>
        user.uid === uid ? { ...user, role: "Admin" } : user
      )
    );
    console.log(`User ${uid} promoted to Admin`);
  };

  const demoteUser = (uid) => {
    setUsers((users) =>
      users.map((user) => (user.uid === uid ? { ...user, role: "User" } : user))
    );
    console.log(`User ${uid} demoted to User`);
  };

  // --- Admin Settings Handlers ---
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const addAdmin = (e) => {
    e.preventDefault();
    if (newAdminEmail && !admins.find((a) => a.email === newAdminEmail)) {
      setAdmins((prev) => [...prev, { email: newAdminEmail }]);
      setNewAdminEmail("");
      console.log(`Admin added: ${newAdminEmail}`);
    } else {
      console.log("Admin email is invalid or already exists");
    }
  };

  const removeAdmin = (email) => {
    setAdmins((prev) => prev.filter((a) => a.email !== email));
    console.log(`Admin removed: ${email}`);
  };

  return (
    <Container fluid className="py-4">
      <h2 className="text-center mb-4">Admin Dashboard</h2>

      <Tab.Container defaultActiveKey="lostItems">
        <Row>
          {/* Sidebar */}
          <Col md={3}>
            <Nav variant="pills" className="flex-column">
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

          {/* Content */}
          <Col md={9}>
            <Tab.Content>
              {/* 1️⃣ All Lost Items */}
              <Tab.Pane eventKey="lostItems">
                <h5 className="mb-3">All Reported Lost Items</h5>

                <Form.Group className="mb-3" controlId="statusFilter">
                  <Form.Label>Status Filter:</Form.Label>
                  <Form.Select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="pending">Pending</option>
                    <option value="claimed">Claimed</option>
                    <option value="matched">Matched</option>
                  </Form.Select>
                </Form.Group>

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
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLostItems.map((item) => (
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
                            {item.status}
                          </span>
                        </td>
                        <td>
                          {item.status !== "matched" && (
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
                          )}
                          {item.status === "matched" && <em>Completed</em>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* 2️⃣ Claim Requests */}
              <Tab.Pane eventKey="claims">
                <h5 className="mb-3">Claim Requests</h5>

                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Claimer Name</th>
                      <th>Email</th>
                      <th>Item ID/Name</th>
                      <th>Claim Text</th>
                      <th>Claim Date</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {claims.map((claim) => (
                      <tr key={claim.id}>
                        <td>{claim.claimerName}</td>
                        <td>{claim.claimerEmail}</td>
                        <td>
                          {claim.itemId} / <strong>{claim.itemName}</strong>
                        </td>
                        <td>{claim.claimText}</td>
                        <td>{claim.claimDate}</td>
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
                          {claim.status === "pending" ? (
                            <>
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
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* 3️⃣ Matched Items */}
              <Tab.Pane eventKey="matched">
                <h5 className="mb-3">Matched Items</h5>

                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Owner Name</th>
                      <th>Owner Email</th>
                      <th>Return Date</th>
                      <th>Item Name</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Description</th>
                      <th>Claimer Name</th>
                      <th>Claimer Email</th>
                      <th>Proof</th>
                    </tr>
                  </thead>
                  <tbody>
                    {matchedItems.map((item) => (
                      <tr key={item.id}>
                        <td>{item.ownerName}</td>
                        <td>{item.ownerEmail}</td>
                        <td>{item.returnDate}</td>
                        <td>{item.itemName}</td>
                        <td>{item.itemCategory}</td>
                        <td>{item.itemLocation}</td>
                        <td>{item.itemDescription}</td>
                        <td>{item.claimerName}</td>
                        <td>{item.claimerEmail}</td>
                        <td>
                          {item.proof ? (
                            <a
                              href={item.proof}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View Proof
                            </a>
                          ) : (
                            "N/A"
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* 4️⃣ All Users */}
              <Tab.Pane eventKey="users">
                <h5 className="mb-3">All Users</h5>

                <Table striped bordered hover responsive>
                  <thead className="table-dark">
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Role</th>
                      <th>UID</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user.uid}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                          <span
                            className={`badge ${
                              user.role === "Admin"
                                ? "bg-success"
                                : "bg-secondary"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td>{user.uid}</td>
                        <td>
                          {user.role === "User" ? (
                            <Button
                              size="sm"
                              variant="success"
                              onClick={() => promoteUser(user.uid)}
                            >
                              Promote to Admin
                            </Button>
                          ) : (
                            <Button
                              size="sm"
                              variant="warning"
                              onClick={() => demoteUser(user.uid)}
                            >
                              Demote to User
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Tab.Pane>

              {/* 5️⃣ Admin Settings */}
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

                <h6>Current Admins:</h6>
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
              </Tab.Pane>
            </Tab.Content>
          </Col>
        </Row>
      </Tab.Container>
    </Container>
  );
};

export default Dashboard;
