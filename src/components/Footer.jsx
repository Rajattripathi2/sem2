import React from "react";

const Footer = () => (
  <footer style={{ background: "#131921", color: "white", fontFamily: "Arial, sans-serif", marginTop: "40px" }}>
    {/* Back to top */}
    <div
      style={{ background: "#37475A", textAlign: "center", padding: "14px", cursor: "pointer", fontSize: "13px" }}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      Back to top
    </div>

    {/* Links */}
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 20px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "24px" }}>
      {[
        { heading: "Get to Know Us", links: ["About Amazon", "Careers", "Press Releases", "Amazon Cares", "Gift a Smile", "Amazon Science"] },
        { heading: "Connect with Us", links: ["Facebook", "Twitter", "Instagram"] },
        { heading: "Make Money with Us", links: ["Sell on Amazon", "Sell under Amazon Accelerator", "Amazon Associates", "Advertise Your Products", "Amazon Pay on Merchants"] },
        { heading: "Let Us Help You", links: ["COVID-19 and Amazon", "Your Account", "Returns Centre", "100% Purchase Protection", "Amazon App Download", "Help"] },
      ].map(section => (
        <div key={section.heading}>
          <h4 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px", color: "white" }}>{section.heading}</h4>
          {section.links.map(link => (
            <div key={link} style={{ fontSize: "13px", color: "#ddd", marginBottom: "6px", cursor: "pointer" }}
              onMouseEnter={e => e.currentTarget.style.textDecoration = "underline"}
              onMouseLeave={e => e.currentTarget.style.textDecoration = "none"}
            >{link}</div>
          ))}
        </div>
      ))}
    </div>

    {/* Logo + bottom */}
    <div style={{ borderTop: "1px solid #3a4553", padding: "20px", textAlign: "center" }}>
      <div style={{ fontSize: "28px", fontWeight: "900", letterSpacing: "-1px", marginBottom: "8px" }}>
        amazon
      </div>
      <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap", marginBottom: "8px" }}>
        {["Conditions of Use & Sale", "Privacy Notice", "Interest-Based Ads"].map(l => (
          <span key={l} style={{ fontSize: "12px", color: "#ddd", cursor: "pointer" }}>{l}</span>
        ))}
      </div>
      <p style={{ fontSize: "12px", color: "#999" }}>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
    </div>
  </footer>
);

export default Footer;
