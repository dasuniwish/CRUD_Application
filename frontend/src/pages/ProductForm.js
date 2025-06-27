import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Resize handler to update windowWidth
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (id) {
      axios
        .get(`http://localhost:5000/api/products/${id}`)
        .then((res) => setForm(res.data));
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await axios.put(`http://localhost:5000/api/products/${id}`, form);
    } else {
      await axios.post("http://localhost:5000/api/products", form);
    }
    navigate("/products");
  };

  // Responsive widths and margins
  const containerMaxWidth = windowWidth > 480 ? "400px" : "90%";
  const containerMarginTop = windowWidth > 480 ? "140px" : "60px";
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
          height: "50px",
          marginTop: "20px",
          marginRight: headerMarginLR,
          marginLeft: headerMarginLR,
          boxSizing: "border-box",
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
            {id ? "Edit Product" : "Add Products"}
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
          onMouseOver={(e) => {
            e.target.style.background = "#570cd7";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "#570cd7";
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
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <h2
            style={{
              textAlign: "center",
              fontSize: windowWidth > 480 ? "1.5rem" : "1.2rem",
            }}
          >
            {id ? "Edit" : "Add"} Product
          </h2>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: windowWidth > 480 ? "1rem" : "0.9rem",
            }}
          />
          <input
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: windowWidth > 480 ? "1rem" : "0.9rem",
            }}
          />
          <input
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              fontSize: windowWidth > 480 ? "1rem" : "0.9rem",
            }}
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
              transition: "background 0.2s",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#570cd7";
              e.target.style.color = "#fff";
            }}
            onMouseOut={(e) => {
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

export default ProductForm;
