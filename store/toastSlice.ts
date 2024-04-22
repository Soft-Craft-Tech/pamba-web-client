import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ToastState {
  showToast: boolean,
  toastMessage: string
}

const initialState: ToastState = {
  showToast: false,
  toastMessage: ""
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string>) => {
      state.toastMessage = action.payload;
    },
    setShowToast: (state, action: PayloadAction<boolean>) => {
      state.showToast = action.payload;
    },
    resetToast: (state) => {
      state.toastMessage = "";
      state.showToast = false;
    },
  },
});

export const { setMessage, setShowToast, resetToast } =
  toastSlice.actions;

export default toastSlice.reducer;
