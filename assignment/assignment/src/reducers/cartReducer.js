export const cartReducer = (state, action) => {
  switch (action.type) {
    case "INIT_CART":
      return action.payload;
    case "ADD_TO_CART":
      return [...state, action.payload];
    case "UPDATE_QUANTITY":
      return state.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload);
    case "CLEAR_CART":
      return [];
    default:
      return state;
  }
};
