import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import colors from "../utils/Colors";
import { IconButton, Typography } from "@material-ui/core";

const useStyles = makeStyles({
  quantityContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  quantity: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  quantityInput: {
    padding: "5px 10px",
    fontSize: 14,
    width: 45,
    border: `1px solid ${colors.main}`,
    outline: 0,
    textAlign: "center",
    margin: "0 7px",
  },
  label: {
    fontSize: 14,
    marginRight: 5,
  },
  quantityBtn: {
    color: colors.main,

    "&:hover": {
      backgroundColor: colors.main,
      color: colors.primary,
    },
    /*
    Ripple effect help from 
    https://stackoverflow.com/questions/56169750/change-ripple-color-on-click-of-material-ui-button 
    */
    "& .MuiTouchRipple-root span": {
      backgroundColor: `${colors.main} !important`,
      opacity: 0.3,
    },
  },
});
const Quantity = (props) => {
  const classes = useStyles();

  let qty = 1;
  let [quantity, setQuantity] = useState(props.quantity);
  const handleQuantityChange = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      if (value < 1) {
        setQuantity(1);
        props.index >= 0
          ? props.handleNewQuantity(1, props.index)
          : props.handleNewQuantity(1);
      } else if (value > props.product.countInStock) {
        setQuantity(props.product.countInStock);
        props.product.quantity = props.product.countInStock;
        props.index >= 0
          ? props.handleNewQuantity(props.product.countInStock, props.index)
          : props.handleNewQuantity(props.product.countInStock);
      } else {
        setQuantity(value);
        props.index >= 0
          ? props.handleNewQuantity(value, props.index)
          : props.handleNewQuantity(value);
      }
    }
  };
  const handleIncrement = () => {
    setQuantity(quantity++);
    setQuantity(quantity++);
    qty = quantity - 1;
    setQuantity(qty);
    props.index >= 0
      ? props.handleNewQuantity(qty, props.index)
      : props.handleNewQuantity(qty);
  };
  const handleDecrement = () => {
    setQuantity(quantity--);
    setQuantity(quantity--);
    qty = quantity + 1;
    setQuantity(qty);
    props.index >= 0
      ? props.handleNewQuantity(qty, props.index)
      : props.handleNewQuantity(qty);
  };

  return (
    <div className={classes.quantityContainer}>
      {props.label && (
        <Typography className={classes.label}>Quantity:</Typography>
      )}
      <div className={classes.quantity}>
        <IconButton
          className={classes.quantityBtn}
          onClick={handleDecrement}
          disabled={quantity === 1}
          size="small"
        >
          <ChevronLeft fontSize="small" />
        </IconButton>
        <input
          type="number"
          min="1"
          max={props.product.countInStock}
          value={quantity}
          className={classes.quantityInput}
          onChange={handleQuantityChange}
          disabled
        />
        <IconButton
          className={classes.quantityBtn}
          onClick={handleIncrement}
          disabled={quantity === props.product.countInStock}
          size="small"
        >
          <ChevronRight fontSize="small" />
        </IconButton>
      </div>
    </div>
  );
};

export default Quantity;
