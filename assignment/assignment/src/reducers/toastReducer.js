export const initialToastState = {
  visible: false,
  message: "",
  type: "success",
};

export const toastReducer = (state, action) => {
  switch (action.type) {
    case "SHOW_TOAST":
      return {
        visible: true,
        message: action.payload.message,
        type: action.payload.type || "success",
      };
    case "HIDE_TOAST":
      return { ...state, visible: false };
    default:
      return state;
  }
};
