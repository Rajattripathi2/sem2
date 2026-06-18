import React from "react";
import { useCart } from "../context/CartContext";

const CartPage = ({ setCurrentPage }) => {
  const { items, removeFromCart, updateQty, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px", fontFamily: "Arial, sans-serif" }}>
        <img src="https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=200&h=200&fit=crop&auto=format" alt="empty" style={{ width: "120px", opacity: 0.3, borderRadius: "8px" }} />
        <h2 style={{ color: "#565959", fontWeight: "normal" }}>Your Amazon Cart is empty.</h2>
        <p style={{ color: "#888", fontSize: "14px" }}>Shop today's deals</p>
        <button
          onClick={() => setCurrentPage("home")}
          style={{ background: "#FFD814", border: "1px solid #FCD200", borderRadius: "20px", padding: "10px 24px", cursor: "pointer", fontWeight: "bold", fontSize: "14px" }}
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  const deliveryCharge = totalPrice * 83 > 499 ? 0 : 40;
  const finalTotal = totalPrice * 83 + deliveryCharge;

  return (
    <div style={{ maxWidth: "1200px", margin: "20px auto", padding: "0 16px", fontFamily: "Arial, sans-serif", display: "flex", gap: "20px", flexWrap: "wrap" }}>
      {/* Cart Items */}
      <div style={{ flex: "1 1 600px" }}>
        <div style={{ background: "white", borderRadius: "8px", padding: "20px", border: "1px solid #ddd" }}>
          <h1 style={{ fontSize: "24px", fontWeight: "normal", borderBottom: "1px solid #ddd", paddingBottom: "16px", marginBottom: "16px" }}>
            Shopping Cart
          </h1>
          {items.map(item => (
            <div key={item.id} style={{ display: "flex", gap: "16px", padding: "16px 0", borderBottom: "1px solid #f0f0f0" }}>
              <img
                src={item.image}
                alt={item.title}
                style={{ width: "100px", height: "100px", objectFit: "contain", background: "#f8f8f8", borderRadius: "4px", padding: "8px" }}
              />
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "15px", marginBottom: "8px", color: "#007185", cursor: "pointer" }}>{item.title}</p>
                <p style={{ color: "#5cb85c", fontSize: "13px", marginBottom: "8px" }}>In Stock</p>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  <select
                    value={item.qty}
                    onChange={e => updateQty(item.id, parseInt(e.target.value))}
                    style={{ padding: "4px 8px", border: "1px solid #aaa", borderRadius: "4px", fontSize: "13px" }}
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>Qty: {i + 1}</option>
                    ))}
                    <option value={0}>0 (Delete)</option>
                  </select>
                  <span style={{ color: "#888" }}>|</span>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    style={{ background: "none", border: "none", color: "#C45500", fontSize: "13px", cursor: "pointer", padding: 0 }}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <div style={{ fontWeight: "bold", fontSize: "16px", color: "#0F1111", whiteSpace: "nowrap" }}>
                ₹{(item.price * item.qty * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
              </div>
            </div>
          ))}
          <div style={{ textAlign: "right", fontSize: "18px", marginTop: "16px" }}>
            Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items):&nbsp;
            <strong>₹{(totalPrice * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
          </div>
        </div>
      </div>

      {/* Order Summary */}
      <div style={{ width: "280px", flexShrink: 0 }}>
        <div style={{ background: "white", borderRadius: "8px", padding: "20px", border: "1px solid #ddd" }}>
          <div style={{ color: "#5cb85c", fontSize: "14px", marginBottom: "12px" }}>
            ✓ Your order is eligible for FREE Delivery on orders over ₹499
          </div>
          <div style={{ fontSize: "18px", marginBottom: "16px" }}>
            Subtotal ({items.reduce((s, i) => s + i.qty, 0)} items):&nbsp;
            <strong>₹{(totalPrice * 83).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</strong>
          </div>
          {deliveryCharge > 0 && (
            <div style={{ fontSize: "14px", color: "#565959", marginBottom: "8px" }}>
              Delivery: ₹{deliveryCharge}
            </div>
          )}
          <div style={{ fontSize: "16px", fontWeight: "bold", borderTop: "1px solid #eee", paddingTop: "12px", marginBottom: "16px" }}>
            Total: ₹{finalTotal.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <button
            onClick={() => alert("🎉 Order placed successfully! Thank you for shopping.")}
            style={{
              background: "#FFD814",
              border: "1px solid #FCD200",
              borderRadius: "20px",
              padding: "10px",
              width: "100%",
              fontSize: "14px",
              fontWeight: "bold",
              cursor: "pointer"
            }}
          >
            Proceed to Buy
          </button>
          <button
            onClick={clearCart}
            style={{ background: "none", border: "1px solid #ddd", borderRadius: "20px", padding: "8px", width: "100%", fontSize: "13px", cursor: "pointer", marginTop: "8px", color: "#C45500" }}
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
