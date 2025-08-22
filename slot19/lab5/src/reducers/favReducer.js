export const favouriteReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVOURITE":
      return [...state, action.payload];
    case "REMOVE_FAVOURITE":
      return state.filter((id) => id !== action.payload);
    default:
      return state;
  }
};
