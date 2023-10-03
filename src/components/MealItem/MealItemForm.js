import React, { useRef, useState } from "react";
import Input from "../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(true);
  const amountInputRef = useRef();

  const submitHandlerForm = (event) => {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNUmber = +enteredAmount;
    if (
      enteredAmount.trim().length === 0 ||
      enteredAmountNUmber < 1 ||
      enteredAmountNUmber > 5
    ) {
      setAmountIsValid(false);
      return;
    }
    console.log('submitHandlerForm ' + enteredAmountNUmber);
    props.onAddToCart(enteredAmountNUmber);
  };
  return (
    <form className={classes.form} onSubmit={submitHandlerForm}>
      <Input
        label="Amount"
        ref={amountInputRef}
        input={{
          id: "amount_" + props.id,
          name: "amount",
          min: 1,
          max: 10,
          step: 1,
          defaultValue: 1,
        }}
      />
      <button onClick={submitHandlerForm}>+ Add</button>
      {!amountIsValid && <p>Please enter a valid amount(1-5).</p>}
    </form>
  );
};

export default MealItemForm;
