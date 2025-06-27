import React, { useState } from "react";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
if (form.password.length < 8) {
    setErrorMessage("Password must be at least 8 characters long.");
    return;
  }
    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/register",
        form
      );
      const message = res.data.message || "Registered successfully!";
      navigate("/products", { state: { successMessage: message } });
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response && err.response.data?.error) {
        setErrorMessage(err.response.data.error);
      } else {
        setErrorMessage("Registration failed. Try again.");
      }
    }
  };

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        backgroundColor: "azure",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          background: "#222",
          color: "#fff",
          padding: "32px 40px",
          borderRadius: "8px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          minWidth: "350px",
          fontFamily: "sans-serif",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Register</h2>

        {errorMessage && (
          <div style={{ color: "red", marginBottom: 12 }}>{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit}>
          <label
            style={{
              display: "block",
              marginTop: "16px",
              marginBottom: "4px",
            }}
          >
            Email address
          </label>
          <input
            type="text"
            placeholder="John"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
            style={{
              width: "100%",
              padding: "10px",
              paddingRight: "40px",
              borderRadius: "4px",
              border: "none",
              marginBottom: "8px",
              height: "40px",
              fontSize: "16px",
              boxSizing: "border-box",
            }}
          />

          <label
            style={{
              display: "block",
              marginTop: "16px",
              marginBottom: "4px",
            }}
          >
            Password
          </label>
          <div style={{ position: "relative", width: "100%" }}>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              style={{
                width: "100%",
                padding: "10px",
                paddingRight: "40px",
                borderRadius: "4px",
                border: "none",
                marginBottom: "8px",
                height: "40px",
                fontSize: "16px",
                boxSizing: "border-box",
              }}
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              style={{
                position: "absolute",
                top: "50%",
                right: "10px",
                transform: "translateY(-50%)",
                cursor: "pointer",
                color: "#aaa",
                display: "flex",
                alignItems: "center",
              }}
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </span>
          </div>

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "16px",
              background: "#999696",
              color: "#570cd7",
              border: "1px solid #570cd7",
              borderRadius: "4px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#570cd7";
              e.target.style.color = "#222";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#999696";
              e.target.style.color = "#570cd7";
            }}
          >
            Register
          </button>
        </form>
        <div style={{ paddingTop: 12 }}>
          <p style={{ margin: 0 }}>
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              style={{
                color: "#fff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Login here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
