import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";

const initialState = {
  items: {},
  totalAmount: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const productPrice = addedProduct.price;
      const productTitle = addedProduct.title;

      let updatedOrNewCartItem;

      if (state.items[addedProduct.id]) {
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          productPrice,
          productTitle,
          state.items[addedProduct.id].sum + productPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(
          1,
          productPrice,
          productTitle,
          productPrice
        );
      }
      return {
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + productPrice,
      };
    case REMOVE_FROM_CART:
      const oldItem = state.items[action.productId];
      const currentQuantity = oldItem.quantity;
      let updatedItems;
      if (currentQuantity > 1) {
        const updatedItem = new CartItem(
          oldItem.quantity - 1,
          oldItem.productPrice,
          oldItem.productTitle,
          oldItem.sum - oldItem.productPrice
        );
        updatedItems = { ...state.items, [action.productId]: updatedItem };
      } else {
        updatedItems = { ...state.items };
        delete updatedItems[action.productId];
      }
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - oldItem.productPrice,
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if(!state.items[action.pid]){
        return state;
      }
      const updatedItems2 = {...state.items};
      const itemTotal = state.items[action.pid].sum
      delete updatedItems2[action.pid]
      return {
        ...state,
        items: updatedItems2,
        totalAmount: state.totalAmount - itemTotal
      }
  }
  return state;
};
