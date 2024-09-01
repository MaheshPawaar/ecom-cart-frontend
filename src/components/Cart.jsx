import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from './CartItem';
import CheckoutModal from './Checkout';
import { clearCart } from '../store/slices/cartSlice';
import { toast } from 'react-toastify';

const Cart = () => {
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    setShowCheckoutModal(true);
  };

  const handlePlaceOrder = async (userData) => {
    console.log('Received user data:', userData);
    const orderData = {
      user: userData,
      cartItems,
    };
    try {
      const responseMessage = await handleOrder(orderData);
      dispatch(clearCart());
      toast.success(responseMessage);
      navigate('/');
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error(error.message || 'Failed to place order. Please try again.');
    }
  };

  const handleOrder = async (orderData) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to place order');
    }

    const data = await response.json();
    return data.message;
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {cartItems.length > 0 ? (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="cart-total">
            <h3>Total Amount: ${totalAmount}</h3>
          </div>
          <button onClick={handleCheckout} className="checkout-button">
            Checkout
          </button>
          <CheckoutModal
            show={showCheckoutModal}
            onHide={() => setShowCheckoutModal(false)}
            onPlaceOrder={handlePlaceOrder}
          />
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
