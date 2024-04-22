import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface StepsState {
  currentStep: number;
}

const initialState: StepsState = {
  currentStep: 1,
};

const stepsSlice = createSlice({
  name: "steps",
  initialState,
  reducers: {
    nextStep: (state) => {
      state.currentStep += 1;
    },
    prevStep: (state) => {
      state.currentStep -= 1;
    },
  },
});

export const { nextStep, prevStep } = stepsSlice.actions;

export const selectCurrentStep = (state: RootState) => state.steps.currentStep;

export default stepsSlice.reducer;
