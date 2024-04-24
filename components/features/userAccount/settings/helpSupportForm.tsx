"use client";
import { TextField } from "@mui/material";
import { useRef } from "react";
export default function HelpSupportForm() {
    const ref = useRef();
    return (
        <form className="flex flex-col gap-3">
            <TextField required id="description" label="How can we help?" type="text" name="message" multiline rows={4} inputRef={ref} />
            <button className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md">Submit</button>
        </form>
    )
}