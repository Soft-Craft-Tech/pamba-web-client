"use client";
import { useState } from "react";
import TextField from '@mui/material/TextField';

export default function ChangePassword() {
    const [formData, setFormData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: ""
    });

    // Input Changes
    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => {return {...prev, [name]: value}});
    }
    return (
        <form className="flex flex-col gap-3">
            <TextField required id="oldpassword" label="Old Password" type="password" name="oldPassword" value={formData.oldPassword} onChange={handleChange} />
            <TextField required id="newpassword" label="New Password" type="password" name="newPassword" value={formData.newPassword} onChange={handleChange} />
            <TextField required id="confirmpassword" label="Confirm Password" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} />
            <button className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md">Submit</button>
        </form>
    )
}