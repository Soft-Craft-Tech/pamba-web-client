import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface HamburgerSlice {
  showMenu: boolean;
  activePage: string;
}

const initialState: HamburgerSlice = {
  showMenu: false,
  activePage: "Dashboard",
};
const hamburgerSlice = createSlice({
  name: "hamburger",
  initialState,
  reducers: {
    setMobileSidebar: (state, action: PayloadAction<boolean>) => {
      state.showMenu = action.payload;
    },
    setActivePage: (state, action: PayloadAction<string>) => {
      state.activePage = action.payload;
    },
    resetMenu: (state) => {
      state.showMenu = false;
      state.activePage = "Dashboard";
    },
  },
});

export const { setMobileSidebar, setActivePage, resetMenu } =
  hamburgerSlice.actions;

export default hamburgerSlice.reducer;
