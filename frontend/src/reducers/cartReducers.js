import { CART_ADD_ITEM } from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      // find out if the item already exists
      const itemExists = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (itemExists) {
        return {
          ...state,
          // if the item exists, loop through all the items in the cart and make sure this item does exist and return the item, else return whatever x is
          cartItems: state.cartItems.map((x) =>
            x.product === itemExists.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    default:
      return state;
  }
};
