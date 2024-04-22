import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./signUpSlice";
import signUpSlice from "./createAccountSlice";

// Combine your reducers
const rootReducer = combineReducers({
  steps: stepsReducer,
  signUp: signUpSlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
