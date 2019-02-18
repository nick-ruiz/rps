import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import profileReducer from "./profileReducer";
import invoiceReducer from "./invoiceReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  invoice: invoiceReducer,
  errors: errorReducer
});
