import { useSearchParams } from 'react-router-dom';
import Product from '../components/Product';
import products from '../data/products';

const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Books'];

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams();
  const search = (searchParams.get('search') || '').trim().toLowerCase();
  const category = searchParams.get('category') || 'All';

  const filtered = products.filter((p) => {
    const matchesCategory = category === 'All' || p.category === category;
    const matchesSearch = !search || p.title.toLowerCase().includes(search);
    return matchesCategory && matchesSearch;
  });

  const setCategory = (cat) => {
    const params = new URLSearchParams(searchParams);
    if (cat === 'All') {
      params.delete('category');
    } else {
      params.set('category', cat);
    }
    setSearchParams(params);
  };

  return (
    <main>
      <section className="hero">
        <h1>Great deals, every day.</h1>
        <p>Shop electronics, fashion, home essentials and books — all in one place.</p>
      </section>

      <div className="category-bar">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${category === cat ? 'active' : ''}`}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {search ? (
        <p className="results-info">
          {filtered.length} result{filtered.length !== 1 ? 's' : ''} for &ldquo;{search}&rdquo;
        </p>
      ) : null}

      {filtered.length === 0 ? (
        <div className="empty-state">
          <h3>No products found</h3>
          <p>Try a different search term or category.</p>
        </div>
      ) : (
        <div className="grid">
          {filtered.map((p) => (
            <Product key={p.id} item={p} />
          ))}
        </div>
      )}
    </main>
  );
}
