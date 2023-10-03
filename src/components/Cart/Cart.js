import React, { useContext } from "react";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";

import classes from "./Cart.module.css";

const Cart = (props) => {
  const cartCxt = useContext(CartContext);

  const items = cartCxt.items; //[{ id: "c1", name: "Sushi", amount: 2, price: 12.03 }];

  const totalAmount = `$${cartCxt.totalAmount.toFixed(2)}`;
  const hasItems = cartCxt.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCxt.removeItem(id);
  };
  const cartItemAddHandler = (item) => {
    cartCxt.addItem({ ...item, amount: 1 });
  };
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {items.map((item) => {
        return (
          <CartItem
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            onAdd={cartItemAddHandler.bind(null, item)}
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
          />
        );
      })}
    </ul>
  );
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
