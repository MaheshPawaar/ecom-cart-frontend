import PropTypes from 'prop-types';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
} from '../store/slices/cartSlice';
import ConfirmationModal from './ConfirmationModal';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [modalInfo, setModalInfo] = useState({ show: false, action: null });

  const handleIncreaseQuantity = (productId, quantity) => {
    if (quantity < 10) {
      dispatch(increaseQuantity(productId));
    } else {
      toast.warn('Maximum quantity reached!');
    }
  };

  const handleDecreaseQuantity = (productId, quantity) => {
    if (quantity > 1) {
      dispatch(decreaseQuantity(productId));
    } else {
      toast.warn('Minimum quantity is 1!');
    }
  };

  const handleRemoveFromCart = (productId) => {
    setModalInfo({
      show: true,
      action: () => dispatch(removeFromCart(productId)),
      title: 'Confirm Removal',
      body: 'Are you sure you want to remove this product from the cart?',
      confirmText: 'Yes, remove it',
    });
  };

  const handleCloseModal = () => setModalInfo({ ...modalInfo, show: false });

  return (
    <li key={item.id} className="cart-item">
      <img src={item.image} alt={item.title} className="cart-item-thumbnail" />
      <div className="item-info">
        <h4>{item.title}</h4>
        <p>Price: ${item.price}</p>
        <p>
          Quantity:
          <button
            onClick={() => handleDecreaseQuantity(item.id, item.quantity)}
          >
            -
          </button>
          {item.quantity}
          <button
            onClick={() => handleIncreaseQuantity(item.id, item.quantity)}
          >
            +
          </button>
        </p>
      </div>
      <button
        onClick={() => handleRemoveFromCart(item.id)}
        className="remove-button"
      >
        Remove
      </button>
      <ConfirmationModal
        show={modalInfo.show}
        onHide={handleCloseModal}
        onConfirm={() => {
          modalInfo.action();
          handleCloseModal();
        }}
        title={modalInfo.title}
        body={modalInfo.body}
        confirmText={modalInfo.confirmText}
        cancelText="Cancel"
        confirmVariant="danger"
      />
    </li>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
