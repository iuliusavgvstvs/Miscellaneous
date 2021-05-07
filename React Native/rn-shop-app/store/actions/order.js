export const ADD_ORDER = "ADD_ORDER";

export const AddOrder = (cartItems, totalAmount) => {
  return { type: ADD_ORDER, orderData: {items: cartItems, totalAmount: totalAmount}};
}