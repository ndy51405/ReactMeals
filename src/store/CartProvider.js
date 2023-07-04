import { useReducer } from 'react';
import CartContext from './cart-context';

const cartInitialState = {
    items: [],
    totalAmount: 0,
};

// The place where actually manage the state of cart
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount =
            state.totalAmount + action.item.price * action.item.amount;

        const index = state.items.findIndex(
            (item) => item.id === action.item.id
        ); // -1 if id not exists yet
        const existingItem = state.items[index]; // null if item not exists yet

        let updatedItems;
        if (existingItem) {
            // Add amount to an existing item
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount + action.item.amount,
            };
            updatedItems = [...state.items];
            updatedItems[index] = updatedItem;
        } else {
            // A new item added
            // Use concat() instead of push() to return a new array, keeping existing array(state.items) immutable
            updatedItems = state.items.concat(action.item);
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    if (action.type === 'REMOVE') {
        const index = state.items.findIndex((item) => item.id === action.id); // -1 if id not exists yet
        const existingItem = state.items[index]; // null if item not exists yet

        if (!existingItem) {
            return state; // edge case, item not exists
        }

        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            updatedItems = state.items.filter((item) => item.id !== action.id);
        } else {
            // Minus amount to an existing item
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1,
            };
            updatedItems = [...state.items];
            updatedItems[index] = updatedItem;
        }

        return { items: updatedItems, totalAmount: updatedTotalAmount };
    }

    return cartInitialState;
};

const CartProvider = (props) => {
    const [cart, dispatchCart] = useReducer(cartReducer, cartInitialState);

    const addItemToCartHandler = function (item) {
        dispatchCart({ type: 'ADD', item: item });
    };

    const removeItemFromCartHandler = function (id) {
        dispatchCart({ type: 'REMOVE', id: id });
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
