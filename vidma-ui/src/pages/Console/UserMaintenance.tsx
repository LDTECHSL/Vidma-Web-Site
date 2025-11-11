import { useState } from "react";
import "../../common/admin.css";

interface User {
  id: number;
  username: string;
}

export default function UserMaintenance() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, username: "john_doe" },
    { id: 2, username: "admin01" },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((u) => u.id !== id));
    }
  };

  const handleOpenModal = (user: User) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Password changed successfully!");
    handleCloseModal();
  };

  return (
    <div className="admin-user-container">
      <h2 className="admin-header">Admin Users Maintenance</h2>

      {/* Create Form */}
      <div className="admin-form">
        <h3>Create New User</h3>
        <form>
          <div className="form-row">
            <label>Username:</label>
            <input type="text" placeholder="Enter username" required />
          </div>
          <div className="form-row">
            <label>Password:</label>
            <input type="password" placeholder="Enter password" required />
          </div>
          <button type="submit" className="btn btn-primary">
            Create
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="admin-table">
        <h3>Existing Users</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.username}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>
                    Delete
                  </button>
                  <button className="btn btn-secondary" onClick={() => handleOpenModal(u)}>
                    Change Password
                  </button>
                  <button className="btn btn-warning">Reset Password</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Change Password Modal */}
      {showModal && selectedUser && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Change Password</h3>
            <form onSubmit={handleChangePassword}>
              <div className="form-row">
                <label>Username:</label>
                <input type="text" value={selectedUser.username} readOnly />
              </div>
              <div className="form-row">
                <label>Current Password:</label>
                <input type="password" required />
              </div>
              <div className="form-row">
                <label>New Password:</label>
                <input type="password" required />
              </div>
              <div className="form-row">
                <label>Confirm Password:</label>
                <input type="password" required />
              </div>
              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">Change</button>
                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
