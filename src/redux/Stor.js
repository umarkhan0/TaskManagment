import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "../redux/Features/auth/signUp"
import loginUpReducer from "../redux/Features/auth/login"
export const store = configureStore({
  reducer: {
   signUp: signUpReducer,
   login: loginUpReducer
  },
});
