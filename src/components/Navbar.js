import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { SearchIcon, CartIcon } from './Icons';

const categories = ['Electronics', 'Fashion', 'Home & Kitchen', 'Books'];

export default function Navbar() {
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('search') || '');

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (term.trim()) params.set('search', term.trim());
    navigate(params.toString() ? `/?${params.toString()}` : '/');
  };

  const goToCategory = (cat) => {
    navigate(`/?category=${encodeURIComponent(cat)}`);
  };

  return (
    <header className="nav">
      <div className="nav-row">
        <Link to="/" className="nav-logo">
          amazon<span>clone</span>
        </Link>

        <form className="nav-search" onSubmit={handleSearch} role="search">
          <input
            type="text"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            placeholder="Search products, brands and categories"
            aria-label="Search products"
          />
          <button type="submit" aria-label="Search">
            <SearchIcon />
          </button>
        </form>

        <div className="nav-right">
          <div className="nav-account">
            <span className="nav-account-greeting">Hello, sign in</span>
            <span className="nav-account-link">Account &amp; Lists</span>
          </div>
          <Link to="/checkout" className="nav-cart">
            <CartIcon />
            <span className="cart-count">{cartCount}</span>
            <span className="nav-cart-label">Cart</span>
          </Link>
        </div>
      </div>

      <nav className="sub-nav" aria-label="Categories">
        <Link to="/" className="sub-nav-link">
          All
        </Link>
        {categories.map((cat) => (
          <button key={cat} className="sub-nav-link" onClick={() => goToCategory(cat)}>
            {cat}
          </button>
        ))}
      </nav>
    </header>
  );
}
