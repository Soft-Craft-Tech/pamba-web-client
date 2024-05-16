import { combineReducers, configureStore } from "@reduxjs/toolkit";
import stepsReducer from "./signUpSlice";
import signUpSlice from "./createAccountSlice";
import toastSlice from "./toastSlice";
import hamburgerSlice from "./sideHamburgerSlice";
import completeProfileSlice from "./completeProfileSlice";
import tabSlice from "./settingsTabSlice";
import loadingSlice from "./loadingSlice";
import searchSlice from "./searchSlice";
import displaySlice from "./displaySlice";

const rootReducer = combineReducers({
  steps: stepsReducer,
  signUp: signUpSlice,
  toast: toastSlice,
  hamburger: hamburgerSlice,
  completeProfile: completeProfileSlice,
  settingsTab: tabSlice,
  loading: loadingSlice,
  search: searchSlice,
  display: displaySlice,
});

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
