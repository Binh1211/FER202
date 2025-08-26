import { LOGIN, LOGOUT } from "./authActions";

const initialState = {
  user: null, // chưa đăng nhập
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, user: action.payload };
    case LOGOUT:
      return { ...state, user: null };
    default:
      return state;
  }
}
