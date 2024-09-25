import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Cart.css';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => {
      setNotification('');
    }, 3000);
  };

  const handleAddToCart = (product) => {
    const productId = product.id;
    setCart(prevCart => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
    showNotification(`Item added to cart`);
  };

  const handleDeleteFromCart = (productId) => {
    const product = products.find(p => p.id === parseInt(productId));
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      delete updatedCart[productId];
      return updatedCart;
    });
    showNotification(`Item removed from cart`);
  };

  const handleIncreaseQuantity = (productId) => {
    setCart(prevCart => ({
      ...prevCart,
      [productId]: prevCart[productId] + 1,
    }));
  };

  const handleDecreaseQuantity = (productId) => {
    setCart(prevCart => {
      const updatedCart = { ...prevCart };
      if (prevCart[productId] === 1) {
        delete updatedCart[productId];
        showNotification(`${products.find(p => p.id === parseInt(productId)).title} removed from cart`);
      } else {
        updatedCart[productId] = prevCart[productId] - 1;
      }
      return updatedCart;
    });
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleCartVisibility = () => {
    setShowCart(!showCart);
  };

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateTotalMRP = () => {
    return Object.keys(cart).reduce((total, productId) => {
      const product = products.find((p) => p.id === parseInt(productId));
      return total + product.price * cart[productId];
    }, 0);
  };

  const totalMRP = calculateTotalMRP();
  const couponDiscount = 50;
  const platformFee = 10;
  const shippingCharges = 20;
  const totalAmount = totalMRP - couponDiscount + platformFee + shippingCharges;

  return (
    <div className="cart-main">
      {notification && <div className="cart-notify">{notification}</div>}
      <header className="cart-head">
        <h1 className="cart-title-right">E-Commerce Platform</h1>
        <input
          type="search"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search products"
          className="cart-search-large"
        />
        <div className="cart-icon-wrapper" onClick={toggleCartVisibility}>
          <FaShoppingCart size={32} />
          {Object.keys(cart).length > 0 && (
            <span className="cart-badge">{Object.keys(cart).length}</span>
          )}
        </div>
      </header>

      <div className="cart-products">
        {filteredProducts.map((product) => (
          <div key={product.id} className="cart-item-card">
            <img src={product.image} alt={product.title} className="cart-item-img" />
            <h3 className="cart-item-name">{product.title}</h3>
            <p className="cart-item-price">₹{product.price}</p>
            <button onClick={() => handleAddToCart(product)} className="cart-btn-add">
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {showCart && (
        <div className="cart-panel">
          <button className="cart-close-btn" onClick={toggleCartVisibility}>
            Close
          </button>
          <h2 className="cart-summary-title">Cart</h2>
          <div className="cart-summary-items">
            {Object.keys(cart).length > 0 ? (
              Object.keys(cart).map((productId) => {
                const product = products.find((p) => p.id === parseInt(productId));
                return (
                  <div key={productId} className="cart-summary-item">
                    <img src={product.image} alt={product.title} className="cart-summary-img" />
                    <div className="cart-summary-details">
                      <h4 className="cart-summary-name">{product.title}</h4>
                      <p className="cart-summary-price">₹{product.price}</p>
                      <div className="cart-quantity-wrapper">
                        <button onClick={() => handleDecreaseQuantity(productId)}>-</button>
                        <span className="cart-quantity">{cart[productId]}</span>
                        <button onClick={() => handleIncreaseQuantity(productId)}>+</button>
                      </div>
                    </div>
                    <button onClick={() => handleDeleteFromCart(productId)} className="cart-remove-btn">
                      X
                    </button>
                  </div>
                );
              })
            ) : (
              <p className="cart-empty-msg">Your cart is empty</p>
            )}
          </div>
          <div className="cart-price-info">
            <h3 className="cart-price-heading">Price Details</h3>
            <ul className="cart-price-breakdown">
              <li className="cart-price-line">
                <span className="cart-price-label">Total MRP:</span>
                <span className="cart-price-amount">₹{totalMRP}</span>
              </li>
              <li className="cart-price-line">
                <span className="cart-price-label">Coupon Discount:</span>
                <span className="cart-price-amount">-₹{couponDiscount}</span>
              </li>
              <li className="cart-price-line">
                <span className="cart-price-label">Platform Fee:</span>
                <span className="cart-price-amount">+₹{platformFee}</span>
              </li>
              <li className="cart-price-line">
                <span className="cart-price-label">Shipping Charges:</span>
                <span className="cart-price-amount">+₹{shippingCharges}</span>
              </li>
              <li className="cart-price-line">
                <span className="cart-price-label">Total Amount:</span>
                <span className="cart-price-amount">₹{totalAmount}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Cart;
