import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TabsState {
  activeTab: string;
}

const initialState: TabsState = {
  activeTab: "edit",
};

const tabSlice = createSlice({
  name: "settingsTab",
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    resetActiveTab: (state) => {
      state.activeTab = "";
    },
  },
});

export const { setActiveTab, resetActiveTab } = tabSlice.actions;

export default tabSlice.reducer;
