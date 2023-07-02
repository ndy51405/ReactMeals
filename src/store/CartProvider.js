import CartContext from "./cart-context";

const CartProvider = (props) => {
  const addItemToCartHandler = function (item) {
    this.items.push(item);
    this.totalAmount = this.items.reduce((current, item) => {
      return current + item.price * item.amount;
    }, 0);
    console.log(this.items);
    console.log(this.items.length);
    console.log("total: " + this.totalAmount.toFixed(2));
  };

  const removeItemFromCartHandler = function (id) {
    for (let i in this.items) {
      if (this.items[i].id === id) {
        this.items.splice(i, 1);
      }
    }
  };

  const cartContext = {
    items: [],
    totalAmount: 0,
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
