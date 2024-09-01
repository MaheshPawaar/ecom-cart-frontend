import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Cart from '../components/Cart';
import ProductList from '../components/ProductList';

const Homepage = () => {
  const [showCart, setShowCart] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/cart') {
      setShowCart(true);
    } else {
      setShowCart(false);
    }
  }, [location.pathname]);

  const toggleCartView = () => {
    if (showCart) {
      navigate('/');
    } else {
      navigate('/cart');
    }
  };

  return (
    <div className="app-container">
      <div className="header">
        <h1>E-Commerce Store</h1>
        <button className="cart-button" onClick={toggleCartView}>
          {showCart ? '🔙 Back to Products' : '🛒 View Cart'}
        </button>
      </div>

      <div className="main-content">
        {showCart ? <Cart /> : <ProductList />}
      </div>
    </div>
  );
};

export default Homepage;
