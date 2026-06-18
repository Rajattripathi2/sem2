import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const StarRating = ({ rating, size = 16 }) => {
  const stars = [];
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  for (let i = 0; i < 5; i++) {
    if (i < full) stars.push(<span key={i} style={{ color: "#FF9900", fontSize: size }}>★</span>);
    else if (i === full && half) stars.push(<span key={i} style={{ color: "#FF9900", fontSize: size }}>½</span>);
    else stars.push(<span key={i} style={{ color: "#ddd", fontSize: size }}>★</span>);
  }
  return <span>{stars}</span>;
};

const ProductDetailPage = ({ product, setCurrentPage }) => {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
  const priceINR = (product.price * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const origINR = (product.originalPrice * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 16px", fontFamily: "Arial, sans-serif" }}>
      <button
        onClick={() => setCurrentPage("home")}
        style={{ background: "none", border: "none", color: "#007185", cursor: "pointer", fontSize: "14px", marginBottom: "16px", padding: 0 }}
      >
        ← Back to results
      </button>

      <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {/* Image */}
        <div style={{ width: "400px", flexShrink: 0 }}>
          <div style={{ background: "#f8f8f8", borderRadius: "8px", padding: "30px", display: "flex", alignItems: "center", justifyContent: "center", height: "400px", border: "1px solid #eee" }}>
            <img
              src={imgError ? `https://via.placeholder.com/350x350/f8f8f8/333?text=Product` : product.image}
              alt={product.title}
              onError={() => setImgError(true)}
              style={{ maxWidth: "100%", maxHeight: "340px", objectFit: "contain" }}
            />
          </div>
        </div>

        {/* Details */}
        <div style={{ flex: 1, minWidth: "300px" }}>
          <h1 style={{ fontSize: "22px", fontWeight: "normal", lineHeight: "1.4", marginBottom: "8px" }}>
            {product.title}
          </h1>
          <p style={{ color: "#565959", fontSize: "13px", marginBottom: "8px" }}>{product.category}</p>

          <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
            <StarRating rating={product.rating} size={18} />
            <span style={{ color: "#007185", fontSize: "14px" }}>{product.reviews.toLocaleString()} ratings</span>
          </div>

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />

          {/* Price */}
          <div style={{ marginBottom: "16px" }}>
            <span style={{ color: "#CC0C39", fontSize: "14px", fontWeight: "bold" }}>-{discount}% </span>
            <span style={{ fontSize: "28px", fontWeight: "bold" }}>
              <sup style={{ fontSize: "14px" }}>₹</sup>{priceINR}
            </span>
            <div style={{ fontSize: "13px", color: "#565959", marginTop: "4px" }}>
              M.R.P.: <span style={{ textDecoration: "line-through" }}>₹{origINR}</span>
            </div>
            <div style={{ fontSize: "13px", color: "#007600", marginTop: "4px" }}>
              You save: ₹{((product.originalPrice - product.price) * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} ({discount}%)
            </div>
          </div>

          {product.prime && (
            <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "12px" }}>
              <span style={{ background: "#00A8E0", color: "white", fontSize: "11px", fontWeight: "900", padding: "2px 6px", borderRadius: "3px" }}>prime</span>
              <span style={{ fontSize: "13px" }}>FREE Delivery by Tomorrow</span>
            </div>
          )}

          <hr style={{ border: "none", borderTop: "1px solid #eee", margin: "12px 0" }} />

          <p style={{ fontSize: "14px", color: "#5cb85c", fontWeight: "bold", marginBottom: "12px" }}>In Stock</p>

          <p style={{ fontSize: "14px", color: "#333", marginBottom: "16px", lineHeight: "1.6" }}>
            {product.description}
          </p>

          {/* Qty + Add to cart */}
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "280px" }}>
            <select
              value={qty}
              onChange={e => setQty(parseInt(e.target.value))}
              style={{ padding: "8px 12px", border: "1px solid #aaa", borderRadius: "8px", fontSize: "14px" }}
            >
              {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>Qty: {n}</option>)}
            </select>
            <button
              onClick={handleAdd}
              style={{
                background: added ? "#5cb85c" : "#FFD814",
                border: "1px solid " + (added ? "#4cae4c" : "#FCD200"),
                borderRadius: "20px",
                padding: "10px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                color: added ? "white" : "#0F1111",
                transition: "background 0.2s"
              }}
            >
              {added ? "✓ Added to Cart!" : "Add to Cart"}
            </button>
            <button
              onClick={() => { handleAdd(); setCurrentPage("cart"); }}
              style={{
                background: "#FF9900",
                border: "1px solid #e08600",
                borderRadius: "20px",
                padding: "10px",
                fontSize: "14px",
                fontWeight: "bold",
                cursor: "pointer",
                color: "#0F1111"
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
