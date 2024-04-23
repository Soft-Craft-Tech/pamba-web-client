"use client";
import { useContext, useEffect } from "react";
import { UserContext } from "@/app/context/userAccount/userAccountSharedContext";

export default function InitialExpenseStates() {
    const {setActivePage} = useContext(UserContext);
    useEffect(() => {
        setActivePage("Expenses")
    }, []);
    return (
        <></>
    )
}