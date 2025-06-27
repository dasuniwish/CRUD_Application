import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

function ProductForm() {
  const [form, setForm] = useState({ name: "", price: "", quantity: "" });
  const { id } = useParams();
  const navigate = useNavigate();

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

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "5px 40px",
          border: "2px solid blue",
          borderRadius: "15px",
          background: "#570cd7",
          height: "50px",
          marginTop: "20px",
          marginRight: "40px",
          marginLeft: "40px",
        }}
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          <h1 style={{ margin: 0, color: "white" }}>Add Products</h1>
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
          maxWidth: "400px",
          margin: "140px auto",
          padding: "20px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
          backgroundColor: "#999696",
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        >
          <h2 style={{ textAlign: "center" }}>{id ? "Edit" : "Add"} Product</h2>

          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            style={{
              padding: "8px",
              borderRadius: "5px",
              border: "1px solid #ccc",
              marginBottom: "20px",
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
              marginBottom: "20px",
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
              marginBottom: "20px",
            }}
          />

          <button
            type="submit"
            style={{
              background: "white",
              color: "#570cd7",
              border: "1px solid #570cd7",
              padding: "6px 12px",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
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
