import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="empty-state">
      <h2>Page not found</h2>
      <p>We couldn&rsquo;t find the page you were looking for.</p>
      <Link to="/" className="continue-link">
        Go to homepage
      </Link>
    </main>
  );
}
