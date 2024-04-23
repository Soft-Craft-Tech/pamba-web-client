"use client";
import { useAppDispatch } from "@/hooks";
import { setActivePage } from "@/store/sideHamburgerSlice";
import { useEffect } from "react";

export default function InitialExpenseStates() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setActivePage("Expenses"));
  }, []);
  return <></>;
}
