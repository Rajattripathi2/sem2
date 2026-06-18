import React, { useState } from "react";
import { CartProvider } from "./context/CartContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CartPage from "./pages/CartPage";
import ProductDetailPage from "./pages/ProductDetailPage";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCategoryFilter("All");
  };

  const handleCategoryFilter = (cat) => {
    setCategoryFilter(cat);
    setSearchQuery("");
    setCurrentPage("home");
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage("product");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const renderPage = () => {
    switch (currentPage) {
      case "cart":
        return <CartPage setCurrentPage={setCurrentPage} />;
      case "product":
        return selectedProduct
          ? <ProductDetailPage product={selectedProduct} setCurrentPage={setCurrentPage} />
          : null;
      default:
        return (
          <HomePage
            searchQuery={searchQuery}
            categoryFilter={categoryFilter}
            onCategoryFilter={handleCategoryFilter}
            onProductClick={handleProductClick}
          />
        );
    }
  };

  return (
    <CartProvider>
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <Navbar
          onSearch={handleSearch}
          onCategoryFilter={handleCategoryFilter}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <main style={{ flex: 1 }}>
          {renderPage()}
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default App;
