import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpState {
  email: string;
  password: string;
  acceptedTerms: boolean;
}

const initialState: SignUpState = {
  email: "",
  password: "",
  acceptedTerms: false,
};

const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    setAcceptedTerms: (state, action: PayloadAction<boolean>) => {
      state.acceptedTerms = action.payload;
    },
    resetSignUp: (state) => {
      state.email = "";
      state.password = "";
      state.acceptedTerms = false;
    },
  },
});

export const { setEmail, setPassword, setAcceptedTerms, resetSignUp } =
  signUpSlice.actions;

export default signUpSlice.reducer;
