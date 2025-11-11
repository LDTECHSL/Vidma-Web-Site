import { useEffect, useState } from "react";
import "../../common/admin.css";
import { changePassword, createUser, deleteUser, getUsers } from "../../services/auth-api";
import { showError, showSuccess } from "../../components/Toast";

interface User {
    id: number;
    userName: string;
}

export default function UserMaintenance() {
    const [users, setUsers] = useState<User[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            handleDeleteUser(id);
        }
    };

    const handleGetUsers = async () => {
        try {
            const res = await getUsers();
            setUsers(res);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        handleGetUsers();
    }, []);

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
        handleChangePasswordSubmit(e);
    };

    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();

        const body = {
            userName: username,
            password: password
        };

        try {
            await createUser(body);
            handleGetUsers();
            setUsername("");
            setPassword("");
        } catch (error) {
            showError("Failed to create user.");
        }
    }

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUser(id);
            showSuccess("User deleted successfully.");
            handleGetUsers();
        } catch (error) {
            showError("Failed to delete user.");
        }
    }

    const handleChangePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            showError("Passwords do not match.");
            return;
        }
        if (!selectedUser) {
            showError("No user selected.");
            return;
        }

        const body = {
            id: selectedUser.id,
            username: selectedUser.userName,
            oldPassword: "",
            newPassword: newPassword
        };
        try {
            await changePassword(body);
            showSuccess("Password changed successfully.");
            handleCloseModal();
        } catch (error) {
            showError("Failed to change password.");
        } finally {
            setNewPassword("");
            setConfirmNewPassword("");
            handleCloseModal();
        }
    }

    return (
        <div className="admin-user-container">
            <h2 className="admin-header">Admin Users Maintenance</h2>

            {/* Create Form */}
            <div className="admin-form">
                <h3>Create New User</h3>
                <form onSubmit={handleCreateUser} autoComplete="off">
                    <div className="form-row">
                        <label>Username:</label>
                        <input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            type="text"
                            placeholder="Enter username"
                            required
                            autoComplete="off"
                        />
                    </div>
                    <div className="form-row">
                        <label>Password:</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="Enter password"
                            required
                            autoComplete="new-password"
                        />
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
                                <td>{u.userName}</td>
                                <td>
                                    <button className="btn btn-danger" onClick={() => handleDelete(u.id)}>
                                        Delete
                                    </button>
                                    <button className="btn btn-secondary" onClick={() => handleOpenModal(u)}>
                                        Change Password
                                    </button>
                                    {/* <button className="btn btn-warning">Reset Password</button> */}
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
                                <input type="text" value={selectedUser.userName} readOnly />
                            </div>
                            <div className="form-row">
                                <label>New Password:</label>
                                <input value={newPassword} onChange={(e) => setNewPassword(e.target.value)} type="password" required />
                            </div>
                            <div className="form-row">
                                <label>Confirm Password:</label>
                                <input value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" required />
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
