import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';

const FREE_SHIPPING_THRESHOLD = 499;
const SHIPPING_FEE = 49;

export default function Checkout() {
  const { cart, removeFromCart, updateQty, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handlePlaceOrder = () => {
    const id = 'ORD' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
    setOrderPlaced(true);
    clearCart();
  };

  if (orderPlaced) {
    return (
      <main className="order-success">
        <h2>Order placed!</h2>
        <p>
          Your order <strong>{orderId}</strong> has been placed successfully. A confirmation would normally be
          emailed to you.
        </p>
        <Link to="/" className="continue-link">
          Continue shopping
        </Link>
      </main>
    );
  }

  if (cart.length === 0) {
    return (
      <main className="empty-state">
        <h2>Your cart is empty</h2>
        <p>Looks like you haven&rsquo;t added anything yet.</p>
        <Link to="/" className="continue-link">
          Continue shopping
        </Link>
      </main>
    );
  }

  const shipping = cartTotal > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = cartTotal + shipping;

  return (
    <main className="checkout-page">
      <h2>Checkout ({cart.length} item{cart.length !== 1 ? 's' : ''})</h2>
      <div className="checkout-layout">
        <div className="checkout-items">
          {cart.map((item) => (
            <div key={item.id} className="checkout-item">
              <img src={item.image} alt={item.title} />
              <div className="checkout-item-info">
                <h4>{item.title}</h4>
                <p className="price">₹{item.price.toLocaleString('en-IN')}</p>
                <div className="qty-stepper">
                  <button onClick={() => updateQty(item.id, item.qty - 1)} aria-label={`Decrease quantity of ${item.title}`}>
                    −
                  </button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQty(item.id, item.qty + 1)} aria-label={`Increase quantity of ${item.title}`}>
                    +
                  </button>
                </div>
                <button className="remove-link" onClick={() => removeFromCart(item.id)}>
                  Remove
                </button>
              </div>
              <div className="checkout-item-subtotal">₹{(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>

        <aside className="order-summary">
          <h3>Order summary</h3>
          <div className="summary-row">
            <span>Items</span>
            <span>₹{cartTotal.toLocaleString('en-IN')}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
          </div>
          {shipping > 0 ? (
            <p className="free-shipping-hint">
              Add ₹{(FREE_SHIPPING_THRESHOLD + 1 - cartTotal).toLocaleString('en-IN')} more for free delivery
            </p>
          ) : null}
          <div className="summary-row total">
            <span>Order total</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
          <button className="place-order-btn" onClick={handlePlaceOrder}>
            Place your order
          </button>
        </aside>
      </div>
    </main>
  );
}
