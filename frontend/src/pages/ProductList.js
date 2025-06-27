import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const navigate = useNavigate();
  const location = useLocation();

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/api/products")
      .then((res) => setProducts(res.data));
  };

  useEffect(() => {
    fetchProducts();

    if (location.state?.successMessage) {
      setSuccessMessage(location.state.successMessage);
      const timer = setTimeout(() => setSuccessMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:5000/api/products/${id}`);
    fetchProducts();
  };
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  return (
    <div>
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
          <h1 style={{ margin: 0, color: "white" }}>Products</h1>
        </div>
        <button
          onClick={() => navigate("/add-product")}
          style={addButtonStyle}
          onMouseOver={(e) => {
            e.target.style.background = "#570cd7";
            e.target.style.color = "#fff";
          }}
          onMouseOut={(e) => {
            e.target.style.background = "white";
            e.target.style.color = "#570cd7";
          }}
        >
          Add Product
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          marginTop: "16px",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          maxWidth: "1000px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#f2f2f2" }}>
              <th style={thTdStyle}>Name</th>
              <th style={thTdStyle}>Price (Rs.)</th>
              <th style={thTdStyle}>Quantity</th>
              <th style={thTdStyle}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((prod) => (
              <tr
                key={prod._id}
                style={{ transition: "background 0.3s" }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.backgroundColor = "#f9f9f9")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.backgroundColor = "transparent")
                }
              >
                <td style={thTdStyle}>{prod.name}</td>
                <td style={thTdStyle}>{prod.price}</td>
                <td style={thTdStyle}>{prod.quantity}</td>
                <td style={thTdStyle}>
                  <button
                    onClick={() => navigate(`/edit-product/${prod._id}`)}
                    style={{ ...actionButtonStyle, marginRight: "8px" }}
                    onMouseOver={(e) => {
                      e.target.style.background = "#570cd7";
                      e.target.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "white";
                      e.target.style.color = "#570cd7";
                    }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteProduct(prod._id)}
                    style={actionButtonStyle}
                    onMouseOver={(e) => {
                      e.target.style.background = "#570cd7";
                      e.target.style.color = "#fff";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = "white";
                      e.target.style.color = "#570cd7";
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              style={{
                ...paginationButtonStyle,
                fontWeight: currentPage === page ? "bold" : "normal",
                backgroundColor: currentPage === page ? "#570cd7" : "white",
                color: currentPage === page ? "white" : "#570cd7",
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
const thTdStyle = {
  border: "1px solid #ddd",
  padding: "12px 16px",
  textAlign: "left",
};

const actionButtonStyle = {
  padding: "6px 12px",
  cursor: "pointer",
  borderRadius: "4px",
  border: "1px solid #570cd7",
  backgroundColor: "white",
  color: "#570cd7",
  fontWeight: 600,
  transition: "all 0.3s ease",
};

const addButtonStyle = {
  background: "white",
  color: "#570cd7",
  border: "none",
  padding: "6px 12px",
  borderRadius: "5px",
  cursor: "pointer",
  fontWeight: "bold",
};

const paginationButtonStyle = {
  margin: "0 4px",
  padding: "6px 12px",
  border: "1px solid #570cd7",
  borderRadius: "4px",
  backgroundColor: "white",
  color: "#570cd7",
  cursor: "pointer",
};

export default ProductList;
