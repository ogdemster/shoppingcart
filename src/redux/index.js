import { combineReducers } from "redux";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cartSlice";
import userReducer from "./reducers/userSlice";
import authReducer from "./reducers/authSlice";
import shoppingTracksReducer from "./reducers/shoppingTracksSlice";
import shoppingItemsReducer from "./reducers/shoppingItemsSlice";

import authReducer2 from "./reducers/authCookieSlice";

export default combineReducers({
  products: productReducer,
  cart: cartReducer,
  users: userReducer,
  auth: authReducer,
  shoopingTracks: shoppingTracksReducer,
  shoppingItems: shoppingItemsReducer,
  auht2: authReducer2,
});
