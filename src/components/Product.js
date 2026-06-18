import { useCart } from '../context/CartContext';

export default function Product({ item }) {
  const { cart, addToCart, updateQty } = useCart();
  const inCart = cart.find((c) => c.id === item.id);
  const discount = item.mrp ? Math.round(((item.mrp - item.price) / item.mrp) * 100) : 0;
  const fullStars = Math.round(item.rating || 0);

  return (
    <div className="card">
      <img src={item.image} alt={item.title} loading="lazy" />
      <h3 className="card-title">{item.title}</h3>

      <div className="rating">
        <span className="stars" aria-hidden="true">
          {'★'.repeat(fullStars)}
          {'☆'.repeat(5 - fullStars)}
        </span>
        <span className="reviews">({item.reviews.toLocaleString('en-IN')})</span>
      </div>

      <div className="price-row">
        <span className="price">₹{item.price.toLocaleString('en-IN')}</span>
        {item.mrp ? <span className="mrp">₹{item.mrp.toLocaleString('en-IN')}</span> : null}
        {discount > 0 ? <span className="discount">{discount}% off</span> : null}
      </div>

      {inCart ? (
        <div className="qty-stepper">
          <button onClick={() => updateQty(item.id, inCart.qty - 1)} aria-label={`Decrease quantity of ${item.title}`}>
            −
          </button>
          <span>{inCart.qty}</span>
          <button onClick={() => updateQty(item.id, inCart.qty + 1)} aria-label={`Increase quantity of ${item.title}`}>
            +
          </button>
        </div>
      ) : (
        <button className="add-btn" onClick={() => addToCart(item)}>
          Add to Cart
        </button>
      )}
    </div>
  );
}
