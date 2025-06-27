import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        form
      );
      navigate("/products", {
        state: { successMessage: res.data.message || "Login successful!" },
      });
    } catch (err) {
      setErrorMessage("Invalid credentials");
    }
  };

  // Responsive container width
  const containerWidth = windowWidth > 600 ? "350px" : "90%";

  return (
    <div
      style={{
        minHeight: "90vh",
        display: "flex",
        backgroundColor: "azure",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          background: "#222",
          color: "#fff",
          padding: "32px 40px",
          borderRadius: "8px",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
          width: containerWidth,
          fontFamily: "sans-serif",
          maxWidth: "450px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "24px" }}>Login</h2>

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
            Login
          </button>
        </form>

        <div style={{ paddingTop: 12 }}>
          <p style={{ margin: 0 }}>
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/register")}
              style={{
                color: "#fff",
                cursor: "pointer",
                textDecoration: "underline",
              }}
            >
              Register here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
