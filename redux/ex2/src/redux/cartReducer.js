const initialState = { cart: [] };

export default function cartReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return { cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { cart: state.cart.filter((_, i) => i !== action.index) };
    default:
      return state;
  }
}
