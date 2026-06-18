import React, { useState } from "react";
import { useCart } from "../context/CartContext";

const categories = [
  "All", "Today's Deals", "Customer Service", "Registry", "Gift Cards", "Sell",
  "Electronics", "Computers", "Smart Home", "Arts & Crafts", "Automotive",
  "Baby", "Beauty", "Books", "Fashion", "Garden", "Grocery", "Health",
  "Home", "Industrial", "Luggage", "Movies", "Music", "Pets", "Software",
  "Sports", "Toys", "Tools", "Video Games"
];

const searchCategories = [
  "All Departments", "Alexa Skills", "Amazon Devices", "Appliances",
  "Apps & Games", "Arts, Crafts & Sewing", "Automotive", "Baby",
  "Beauty & Personal Care", "Books", "CDs & Vinyl", "Cell Phones & Accessories",
  "Clothing", "Collectibles", "Computers", "Electronics", "Fashion",
  "Garden & Outdoor", "Gift Cards", "Grocery", "Handmade", "Health",
  "Home & Kitchen", "Industrial & Scientific", "Kindle Store",
  "Luggage & Travel", "Movies & TV", "Musical Instruments",
  "Office Products", "Pet Supplies", "Software", "Sports & Outdoors",
  "Tools & Home Improvement", "Toys & Games", "Video Games"
];

const Navbar = ({ onSearch, onCategoryFilter, currentPage, setCurrentPage }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchCat, setSearchCat] = useState("All Departments");
  const { totalItems } = useCart();

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    setCurrentPage("home");
  };

  return (
    <nav style={{ background: "#131921", position: "sticky", top: 0, zIndex: 1000, fontFamily: "Arial, sans-serif" }}>
      {/* Main navbar row */}
      <div style={{ display: "flex", alignItems: "center", padding: "8px 12px", gap: "8px", maxWidth: "1500px", margin: "0 auto" }}>

        {/* Logo */}
        <div
          onClick={() => { setCurrentPage("home"); onSearch(""); }}
          style={{ cursor: "pointer", border: "1px solid transparent", borderRadius: "2px", padding: "4px 6px", flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
        >
          <div style={{ color: "white", fontSize: "26px", fontWeight: "900", letterSpacing: "-1px", lineHeight: 1 }}>
            amazon
          </div>
          <div style={{ color: "#FF9900", fontSize: "10px", textAlign: "right", marginTop: "-2px", fontWeight: "bold" }}>
            .in ▸
          </div>
        </div>

        {/* Deliver to */}
        <div
          style={{ display: "flex", flexDirection: "column", cursor: "pointer", border: "1px solid transparent", borderRadius: "2px", padding: "4px 6px", flexShrink: 0 }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
        >
          <span style={{ color: "#ccc", fontSize: "11px" }}>Deliver to</span>
          <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
            <span style={{ fontSize: "16px" }}>📍</span>
            <span style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>India</span>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} style={{ flex: 1, display: "flex", maxWidth: "800px" }}>
          <select
            value={searchCat}
            onChange={e => setSearchCat(e.target.value)}
            style={{
              background: "#f3f3f3",
              border: "none",
              borderRadius: "4px 0 0 4px",
              padding: "0 8px",
              fontSize: "12px",
              color: "#333",
              cursor: "pointer",
              width: "90px",
              flexShrink: 0,
              height: "40px"
            }}
          >
            {searchCategories.map(c => <option key={c}>{c}</option>)}
          </select>
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Search Amazon.in"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              padding: "0 12px",
              fontSize: "14px",
              height: "40px"
            }}
          />
          <button
            type="submit"
            style={{
              background: "#FF9900",
              border: "none",
              borderRadius: "0 4px 4px 0",
              padding: "0 14px",
              cursor: "pointer",
              height: "40px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#e68a00"}
            onMouseLeave={e => e.currentTarget.style.background = "#FF9900"}
          >
            <svg width="18" height="18" fill="#333" viewBox="0 0 24 24">
              <path d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" stroke="#333" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
            </svg>
          </button>
        </form>

        {/* Right links */}
        <NavLink top="Hello, sign in" bottom="Account & Lists" icon="▾" />
        <NavLink top="Returns" bottom="& Orders" onClick={() => setCurrentPage("orders")} />

        {/* Cart */}
        <div
          onClick={() => setCurrentPage("cart")}
          style={{ display: "flex", alignItems: "center", gap: "4px", cursor: "pointer", border: "1px solid transparent", borderRadius: "2px", padding: "4px 6px", flexShrink: 0, position: "relative" }}
          onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
          onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
        >
          <div style={{ position: "relative" }}>
            <svg width="36" height="30" viewBox="0 0 36 30" fill="none">
              <path d="M3 3h2l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="9" cy="26" r="2" fill="white"/>
              <circle cx="20" cy="26" r="2" fill="white"/>
            </svg>
            <span style={{
              position: "absolute", top: "-4px", left: "18px",
              background: "#FF9900", color: "#111", borderRadius: "50%",
              width: "18px", height: "18px", fontSize: "12px", fontWeight: "bold",
              display: "flex", alignItems: "center", justifyContent: "center"
            }}>
              {totalItems}
            </span>
          </div>
          <span style={{ color: "white", fontSize: "13px", fontWeight: "bold" }}>Cart</span>
        </div>
      </div>

      {/* Secondary nav bar */}
      <div style={{ background: "#232F3E", padding: "0 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "2px", maxWidth: "1500px", margin: "0 auto", overflowX: "auto", scrollbarWidth: "none" }}>
          <NavBarLink bold>☰ All</NavBarLink>
          {categories.slice(0, 20).map(cat => (
            <NavBarLink key={cat} onClick={() => { onCategoryFilter(cat); setCurrentPage("home"); }}>
              {cat}
            </NavBarLink>
          ))}
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ top, bottom, icon, onClick }) => (
  <div
    onClick={onClick}
    style={{ color: "white", cursor: "pointer", border: "1px solid transparent", borderRadius: "2px", padding: "4px 6px", flexShrink: 0 }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
  >
    <div style={{ fontSize: "11px", color: "#ccc" }}>{top}</div>
    <div style={{ fontSize: "13px", fontWeight: "bold" }}>{bottom} {icon}</div>
  </div>
);

const NavBarLink = ({ children, bold, onClick }) => (
  <div
    onClick={onClick}
    style={{
      color: "white",
      fontSize: "13px",
      fontWeight: bold ? "bold" : "normal",
      padding: "8px 10px",
      cursor: "pointer",
      whiteSpace: "nowrap",
      border: "1px solid transparent",
      borderRadius: "2px",
      flexShrink: 0
    }}
    onMouseEnter={e => e.currentTarget.style.borderColor = "white"}
    onMouseLeave={e => e.currentTarget.style.borderColor = "transparent"}
  >
    {children}
  </div>
);

export default Navbar;
