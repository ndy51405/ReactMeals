import { useReducer } from "react";
import CartContext from "./cart-context";

const cartInitialState = {
  items: [],
  totalAmount: 0,
};

// The place where actually manage the state of cart
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD':
      // Use concat() instead of push() to return a new array, keeping existing array(state.items) immutable
      const updatedItems = state.items.concat(action.item); 
      const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;
      return {items: updatedItems, totalAmount: updatedTotalAmount};
    case 'REMOVE':
      break;
    default:
      break;
  }
};

const CartProvider = (props) => {
  const [cart, dispatchCart] = useReducer(cartReducer, cartInitialState);

  const addItemToCartHandler = function (item) {
    dispatchCart({type: 'ADD', item: item});
  };

  const removeItemFromCartHandler = function (id) {
    dispatchCart({type: 'REMOVE', id: id});
  };

  // the actual object that should pass through context and accessed by components that need it
  const cartContext = {
    items: cart.items,
    totalAmount: cart.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
