import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./signUpSlice";

// Combine your reducers
const rootReducer = combineReducers({
  steps: stepsReducer,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
