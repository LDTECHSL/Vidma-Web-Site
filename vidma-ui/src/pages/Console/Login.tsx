import "../../common/main.css";
import "../../common/login.css";
import { useState } from "react";
import logo from "../../assets/vidma-logo.png"
import adminLogo from "../../assets/admin.png"
import Divider from "@mui/material/Divider";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Username:", username);
    console.log("Password:", password);
    // 🔐 TODO: Call your login API here
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px' }}>
            {/* <img className="vidma-logo" src={logo} alt="Vidma Logo" />
            <span>+</span> */}
            <img className="vidma-logo" src={adminLogo} alt="Admin Logo" />
        </div>

        <h1 className="login-title">Vidma Super Console</h1>

        <Divider style={{ margin: '10px 0 20px 0' }} />

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}
