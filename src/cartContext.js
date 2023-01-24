import React, {useReducer, useEffect} from "react";
import cartReducer from "./cartReducer";

let initialCart;

try {
  initialCart = JSON.parse(localStorage.getItem("cart")) ?? [];
} catch {
  console.error("The cart could not be parsed into JSON.");
  initialCart = [];
}

export const CartContext = React.createContext(null);

export function CartProvider(props) {
    const [cart, dispatch] = useReducer(cartReducer, initialCart);

    useEffect(() => localStorage.setItem("cart", JSON.stringify(cart)), [cart]);

    const contextValue = {
        cart,
        dispatch
    }

    return <CartContext.Provider value={contextValue}>{props.children}</CartContext.Provider>
}