import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => setForm(res.data))
        .catch(() => setError("Failed to load product"));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.price || !form.quantity) {
      setError("All fields are required.");
      return;
    }

    const payload = {
      name: form.name.trim(),
      price: Number(form.price),
      quantity: Number(form.quantity),
    };

    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/products/${id}`, payload);
      } else {
        await axios.post("http://localhost:5000/api/products", payload);
      }
      navigate("/products");
    } catch (err) {
      setError(err.response?.data?.error || "Submission failed");
    }
  };

  const containerMaxWidth = windowWidth > 480 ? "400px" : "90%";
  const containerMarginTop = windowWidth > 480 ? "120px" : "60px";
  const headerMarginLR = windowWidth > 480 ? "40px" : "10px";

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 20px",
          border: "2px solid blue",
          borderRadius: "15px",
          background: "#570cd7",
          height: "70px",
          marginTop: "20px",
          marginRight: headerMarginLR,
          marginLeft: headerMarginLR,
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1
            style={{
              margin: 0,
              color: "white",
              fontSize: windowWidth > 480 ? "1.8rem" : "1.3rem",
            }}
          >
            {id ? "Edit Product" : "Add Product"}
          </h1>
        </div>
        <button
          onClick={() => navigate("/products")}
          style={{
            background: "white",
            color: "#570cd7",
            border: "none",
            padding: "6px 12px",
            borderRadius: "5px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: windowWidth > 480 ? "1rem" : "0.8rem",
          }}
        >
          Back
        </button>
      </div>

      <div
        style={{
          maxWidth: containerMaxWidth,
          margin: `${containerMarginTop} auto`,
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#999696",
        }}
      >
        {error && (
          <div style={{ color: "red", marginBottom: "12px" }}>{error}</div>
        )}

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <label>Name</label>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            style={inputStyle(windowWidth)}
          />

          <label>Price</label>
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            required
            style={inputStyle(windowWidth)}
          />

          <label>Quantity</label>
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            required
            style={inputStyle(windowWidth)}
          />

          <button
            type="submit"
            style={{
              background: "white",
              color: "#570cd7",
              border: "1px solid #570cd7",
              padding: "10px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: windowWidth > 480 ? "1rem" : "0.9rem",
              marginTop: "10px",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#570cd7";
              e.target.style.color = "#fff";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "white";
              e.target.style.color = "#570cd7";
            }}
          >
            {id ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}

function inputStyle(windowWidth) {
  return {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: windowWidth > 480 ? "1rem" : "0.9rem",
  };
}

export default ProductForm;
