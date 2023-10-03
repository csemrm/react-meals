import { useContext, useEffect, useState } from "react";
import CartIcon from "../Cart/CartIcon";

import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) => {
  const [btnIsighlited, setBtnIsHighlited] = useState(false);
  const cartCxt = useContext(CartContext);
  const { items } = cartCxt;
  const numberOfCartItems = cartCxt.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const btnClasses = `${classes.button} ${btnIsighlited ? classes.bump : ""}`;
  useEffect(() => {
    if (cartCxt.items.length === 0) {
      return;
    }
    setBtnIsHighlited(true);
    const cleaner = setTimeout(() => {
      setBtnIsHighlited(false);
    }, 300);
    return () => {
      clearTimeout(cleaner);
    };
  }, [items]);
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}> {numberOfCartItems} </span>
    </button>
  );
};

export default HeaderCartButton;
