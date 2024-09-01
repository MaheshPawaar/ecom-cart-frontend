import { createSlice } from '@reduxjs/toolkit';

// Load initial cart state from localStorage
const savedCart = JSON.parse(localStorage.getItem('cartItems')) || [];

const initialState = {
  cartItems: savedCart,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add Product to Cart
    addToCart: (state, action) => {
      const { id, title, price, images } = action.payload;
      const image = images.length > 0 ? images[0] : '';
      const existingProduct = state.cartItems.find((item) => item.id === id);

      if (existingProduct) {
        if (existingProduct.quantity < 10) {
          existingProduct.quantity += 1;
        }
      } else {
        state.cartItems.push({ id, title, price, image, quantity: 1 });
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Increase qunatity
    increaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);

      if (product && product.quantity < 10) {
        product.quantity += 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Decrease Quantity
    decreaseQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find((item) => item.id === productId);

      if (product && product.quantity > 1) {
        product.quantity -= 1;
      }
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // Remove from cart
    removeFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item.id !== productId);
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },

    // clear cart
    clearCart: (state) => {
      state.cartItems = [];
      localStorage.removeItem('cartItems');
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
