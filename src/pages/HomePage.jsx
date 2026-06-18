import React, { useState, useMemo } from "react";
import HeroBanner from "../components/HeroBanner";
import ProductCard from "../components/ProductCard";
import products from "../data/products";

const categoryIcons = {
  "All": "🛒",
  "Electronics": "📱",
  "Kitchen": "🍳",
  "Shoes": "👟",
  "Toys": "🧸",
  "Home": "🏠",
  "Computers": "💻",
  "Clothing": "👕",
};

const HomePage = ({ searchQuery, categoryFilter, onCategoryFilter, onProductClick }) => {
  const [sortBy, setSortBy] = useState("featured");
  const [priceRange, setPriceRange] = useState("all");

  const categories = ["All", ...new Set(products.map(p => p.category))];

  const filtered = useMemo(() => {
    let list = [...products];

    if (searchQuery) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (categoryFilter && categoryFilter !== "All" && categoryFilter !== "Today's Deals" && categoryFilter !== "Customer Service") {
      list = list.filter(p => p.category.toLowerCase() === categoryFilter.toLowerCase());
    }

    if (priceRange === "under500") list = list.filter(p => p.price * 83 < 500);
    else if (priceRange === "500-5000") list = list.filter(p => p.price * 83 >= 500 && p.price * 83 < 5000);
    else if (priceRange === "over5000") list = list.filter(p => p.price * 83 >= 5000);

    switch (sortBy) {
      case "price-low": list.sort((a, b) => a.price - b.price); break;
      case "price-high": list.sort((a, b) => b.price - a.price); break;
      case "rating": list.sort((a, b) => b.rating - a.rating); break;
      case "reviews": list.sort((a, b) => b.reviews - a.reviews); break;
      default: break;
    }

    return list;
  }, [searchQuery, categoryFilter, sortBy, priceRange]);

  const showBanner = !searchQuery && (!categoryFilter || categoryFilter === "All");

  return (
    <div style={{ background: "#EAEDED", minHeight: "100vh" }}>
      {showBanner && <HeroBanner onCategoryFilter={onCategoryFilter} />}

      <div style={{ maxWidth: "1500px", margin: "0 auto", padding: "16px" }}>
        {/* Category Chips */}
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "16px" }}>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onCategoryFilter(cat)}
              style={{
                background: categoryFilter === cat ? "#131921" : "white",
                color: categoryFilter === cat ? "white" : "#333",
                border: "1px solid " + (categoryFilter === cat ? "#131921" : "#ddd"),
                borderRadius: "20px",
                padding: "6px 14px",
                fontSize: "13px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s"
              }}
            >
              <span>{categoryIcons[cat] || "📦"}</span>
              {cat}
            </button>
          ))}
        </div>

        {/* Filters + Sort */}
        <div style={{
          background: "white",
          borderRadius: "8px",
          padding: "12px 16px",
          marginBottom: "16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          border: "1px solid #ddd"
        }}>
          <div style={{ fontSize: "14px", color: "#565959" }}>
            {searchQuery ? (
              <>Results for <strong style={{ color: "#0F1111" }}>"{searchQuery}"</strong>: {filtered.length} items</>
            ) : (
              <strong>{categoryFilter && categoryFilter !== "All" ? categoryFilter : "All Products"}</strong>
            )} — {filtered.length} results
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <label style={{ fontSize: "13px", color: "#565959" }}>Price:</label>
              <select value={priceRange} onChange={e => setPriceRange(e.target.value)}
                style={{ fontSize: "13px", padding: "4px 8px", border: "1px solid #aaa", borderRadius: "4px" }}>
                <option value="all">All Prices</option>
                <option value="under500">Under ₹500</option>
                <option value="500-5000">₹500 – ₹5,000</option>
                <option value="over5000">Over ₹5,000</option>
              </select>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <label style={{ fontSize: "13px", color: "#565959" }}>Sort:</label>
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                style={{ fontSize: "13px", padding: "4px 8px", border: "1px solid #aaa", borderRadius: "4px" }}>
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Avg. Customer Review</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", background: "white", borderRadius: "8px" }}>
            <div style={{ fontSize: "60px", marginBottom: "16px" }}>🔍</div>
            <h2 style={{ color: "#565959", fontWeight: "normal" }}>No results found for "{searchQuery}"</h2>
            <p style={{ color: "#888" }}>Try different keywords or browse our categories.</p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "16px"
          }}>
            {filtered.map(product => (
              <div key={product.id} style={{ position: "relative" }}>
                <ProductCard product={product} onClick={onProductClick} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
