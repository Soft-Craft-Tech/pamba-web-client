import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DisplayToast {
  showComponent: boolean;
}

const initialState: DisplayToast = {
  showComponent: false,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setShowComponent: (state, action: PayloadAction<boolean>) => {
      state.showComponent = action.payload;
    },
    resetComponent: (state) => {
      state.showComponent = false;
    },
  },
});

export const { setShowComponent, resetComponent } = displaySlice.actions;

export default displaySlice.reducer;
