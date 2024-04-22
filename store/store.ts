import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./signUpSlice";
import signUpSlice from "./createAccountSlice";
import toastSlice from "./toastSlice";

// Combine your reducers
const rootReducer = combineReducers({
  steps: stepsReducer,
  signUp: signUpSlice,
  toast: toastSlice
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
