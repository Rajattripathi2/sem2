import React, { useState, useEffect } from "react";

const banners = [
  {
    id: 1,
    title: "Electronics Sale",
    subtitle: "Up to 60% off on Top Brands",
    bg: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
    color: "white",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&h=400&fit=crop&auto=format",
    cta: "Shop Electronics"
  },
  {
    id: 2,
    title: "Great Indian Festival",
    subtitle: "Millions of deals — new deals every day",
    bg: "linear-gradient(135deg, #FF6B35 0%, #FF9F1C 100%)",
    color: "white",
    image: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&h=400&fit=crop&auto=format",
    cta: "Explore Deals"
  },
  {
    id: 3,
    title: "Fashion Week",
    subtitle: "Trending styles at amazing prices",
    bg: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: "white",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop&auto=format",
    cta: "Shop Fashion"
  },
  {
    id: 4,
    title: "Home & Kitchen",
    subtitle: "Transform your living space",
    bg: "linear-gradient(135deg, #11998e 0%, #38ef7d 100%)",
    color: "white",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=400&fit=crop&auto=format",
    cta: "Shop Home"
  }
];

const HeroBanner = ({ onCategoryFilter }) => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const banner = banners[current];

  return (
    <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
      <div style={{
        background: banner.bg,
        minHeight: "380px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "40px 60px",
        transition: "background 0.6s ease",
        position: "relative",
        overflow: "hidden"
      }}>
        {/* Left content */}
        <div style={{ zIndex: 1, maxWidth: "45%" }}>
          <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.8)", marginBottom: "8px", letterSpacing: "2px", textTransform: "uppercase" }}>
            Limited Time Offer
          </div>
          <h1 style={{ color: banner.color, fontSize: "42px", fontWeight: "900", margin: "0 0 12px", lineHeight: "1.1", fontFamily: "Arial, sans-serif" }}>
            {banner.title}
          </h1>
          <p style={{ color: "rgba(255,255,255,0.9)", fontSize: "18px", margin: "0 0 24px" }}>
            {banner.subtitle}
          </p>
          <button
            onClick={() => onCategoryFilter("All")}
            style={{
              background: "#FFD814",
              border: "none",
              borderRadius: "4px",
              padding: "12px 28px",
              fontSize: "15px",
              fontWeight: "bold",
              cursor: "pointer",
              color: "#0F1111",
              transition: "background 0.2s, transform 0.1s"
            }}
            onMouseEnter={e => { e.currentTarget.style.background = "#F7CA00"; e.currentTarget.style.transform = "scale(1.03)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "#FFD814"; e.currentTarget.style.transform = "scale(1)"; }}
          >
            {banner.cta} →
          </button>
        </div>

        {/* Right image */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <img
            src={banner.image}
            alt={banner.title}
            style={{
              width: "420px",
              height: "280px",
              objectFit: "cover",
              borderRadius: "12px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)"
            }}
          />
        </div>

        {/* Decorative circles */}
        <div style={{
          position: "absolute", right: "-80px", top: "-80px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", zIndex: 0
        }} />
        <div style={{
          position: "absolute", left: "30%", bottom: "-100px",
          width: "250px", height: "250px", borderRadius: "50%",
          background: "rgba(255,255,255,0.05)", zIndex: 0
        }} />
      </div>

      {/* Dots */}
      <div style={{
        position: "absolute", bottom: "16px", left: "50%",
        transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 2
      }}>
        {banners.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: i === current ? "white" : "rgba(255,255,255,0.5)",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "width 0.3s, background 0.3s"
            }}
          />
        ))}
      </div>

      {/* Arrows */}
      <button
        onClick={() => setCurrent((current - 1 + banners.length) % banners.length)}
        style={{
          position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
          width: "40px", height: "40px", cursor: "pointer", color: "white",
          fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >‹</button>
      <button
        onClick={() => setCurrent((current + 1) % banners.length)}
        style={{
          position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)",
          background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
          width: "40px", height: "40px", cursor: "pointer", color: "white",
          fontSize: "18px", display: "flex", alignItems: "center", justifyContent: "center"
        }}
      >›</button>
    </div>
  );
};

export default HeroBanner;
