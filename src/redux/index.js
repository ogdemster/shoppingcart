import { combineReducers } from "redux";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
});
