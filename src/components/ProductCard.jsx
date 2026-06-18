import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const StarRating = ({ rating }) => {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;

  for (let i = 0; i < 5; i++) {
    if (i < fullStars) {
      stars.push(<span key={i} style={{ color: "#FF9900", fontSize: "14px" }}>★</span>);
    } else if (i === fullStars && hasHalf) {
      stars.push(<span key={i} style={{ color: "#FF9900", fontSize: "14px" }}>½</span>);
    } else {
      stars.push(<span key={i} style={{ color: "#ddd", fontSize: "14px" }}>★</span>);
    }
  }
  return <span>{stars}</span>;
};

const ProductCard = ({ product, onClick }) => {
  const { addToCart } = useCart();
  const [imgError, setImgError] = useState(false);
  const [added, setAdded] = useState(false);

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const badgeColors = {
    "Best Seller": { bg: "#FF6900", color: "white" },
    "Deal": { bg: "#CC0C39", color: "white" },
    "Limited Deal": { bg: "#CC0C39", color: "white" },
    "Amazon's Choice": { bg: "#006400", color: "white" },
  };

  return (
    <div
      onClick={() => onClick(product)}
      style={{
        background: "white",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        border: "1px solid #e0e0e0",
        transition: "box-shadow 0.2s, transform 0.2s",
        display: "flex",
        flexDirection: "column",
        height: "100%"
      }}
      onMouseEnter={e => {
        e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.15)";
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {/* Badge */}
      {product.badge && (
        <div style={{
          position: "absolute",
          top: "8px",
          left: "8px",
          background: badgeColors[product.badge]?.bg || "#FF6900",
          color: badgeColors[product.badge]?.color || "white",
          fontSize: "11px",
          fontWeight: "bold",
          padding: "2px 8px",
          borderRadius: "3px",
          zIndex: 1
        }}>
          {product.badge}
        </div>
      )}

      {/* Image Container */}
      <div style={{
        position: "relative",
        background: "#f8f8f8",
        padding: "20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "220px",
        overflow: "hidden"
      }}>
        {product.badge && (
          <div style={{
            position: "absolute",
            top: "8px",
            left: "8px",
            background: badgeColors[product.badge]?.bg || "#FF6900",
            color: "white",
            fontSize: "11px",
            fontWeight: "bold",
            padding: "3px 8px",
            borderRadius: "3px",
            zIndex: 1
          }}>
            {product.badge}
          </div>
        )}
        <img
          src={imgError ? `https://via.placeholder.com/300x300/f8f8f8/333?text=${encodeURIComponent(product.title.slice(0,15))}` : product.image}
          alt={product.title}
          onError={() => setImgError(true)}
          style={{
            maxWidth: "100%",
            maxHeight: "180px",
            objectFit: "contain",
            transition: "transform 0.3s"
          }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        />
        {discount > 0 && (
          <div style={{
            position: "absolute",
            bottom: "8px",
            right: "8px",
            background: "#CC0C39",
            color: "white",
            fontSize: "12px",
            fontWeight: "bold",
            padding: "2px 6px",
            borderRadius: "3px"
          }}>
            -{discount}%
          </div>
        )}
      </div>

      {/* Product Info */}
      <div style={{ padding: "12px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <h3 style={{
          fontSize: "14px",
          fontWeight: "normal",
          color: "#0F1111",
          margin: 0,
          lineHeight: "1.4",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden"
        }}>
          {product.title}
        </h3>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          <StarRating rating={product.rating} />
          <span style={{ fontSize: "13px", color: "#007185" }}>{product.reviews.toLocaleString()}</span>
        </div>

        {/* Price */}
        <div style={{ marginTop: "auto" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "6px", flexWrap: "wrap" }}>
            <span style={{ fontSize: "11px", color: "#CC0C39", fontWeight: "bold" }}>
              {discount > 0 ? `-${discount}%` : ""}
            </span>
            <span style={{ fontSize: "20px", fontWeight: "bold", color: "#0F1111" }}>
              <sup style={{ fontSize: "13px" }}>₹</sup>
              {(product.price * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </span>
          </div>
          {product.originalPrice && (
            <div style={{ fontSize: "12px", color: "#565959" }}>
              M.R.P.: <span style={{ textDecoration: "line-through" }}>
                ₹{(product.originalPrice * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </span>
            </div>
          )}
          {product.prime && (
            <div style={{ display: "flex", alignItems: "center", gap: "4px", marginTop: "4px" }}>
              <span style={{
                background: "#00A8E0",
                color: "white",
                fontSize: "10px",
                fontWeight: "900",
                padding: "1px 5px",
                borderRadius: "3px",
                letterSpacing: "0.5px"
              }}>prime</span>
              <span style={{ fontSize: "11px", color: "#565959" }}>FREE Delivery</span>
            </div>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          style={{
            background: added ? "#5cb85c" : "#FFD814",
            border: "1px solid " + (added ? "#4cae4c" : "#FCD200"),
            borderRadius: "20px",
            padding: "8px",
            fontSize: "13px",
            fontWeight: "bold",
            cursor: "pointer",
            width: "100%",
            marginTop: "8px",
            transition: "background 0.2s",
            color: added ? "white" : "#0F1111"
          }}
          onMouseEnter={e => { if (!added) e.currentTarget.style.background = "#F7CA00"; }}
          onMouseLeave={e => { if (!added) e.currentTarget.style.background = "#FFD814"; }}
        >
          {added ? "✓ Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
