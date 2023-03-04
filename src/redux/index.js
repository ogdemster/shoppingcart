import { combineReducers } from "redux";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import authReducer from "./reducers/authSlice";
import shoppingTracksReducer from "./reducers/shoppingTracksSlice";

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  users: userReducer,
  auth: authReducer,
  shoopingTracks: shoppingTracksReducer,
});
