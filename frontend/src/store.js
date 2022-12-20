import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetalisReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
} from "./reducers/productReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetalis: productDetalisReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productUpdate: productUpdateReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
