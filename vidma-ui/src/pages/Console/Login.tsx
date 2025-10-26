import "../../common/main.css";
import "../../common/login.css";
import { useState } from "react";
import adminLogo from "../../assets/admin.png"
import Divider from "@mui/material/Divider";
import { login } from "../../services/auth-api";
import { useNavigate } from "react-router-dom";
import { showError } from "../../components/Toast";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const body = {
        username,
        password
    }

    try {
        const response = await login(body);
        sessionStorage.setItem("vidmaAuthToken", response.token);
        navigate("/vidma/console/hero-section");
    } catch (error) {
        showError("Invalid username or password");        
    }
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
