import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import companyReducer from "./companySlice";
import userReducer from "./userSlilce";

const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companyReducer,
    users: userReducer,
  },
});

export default store;
