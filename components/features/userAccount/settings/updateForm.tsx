"use client";
import TextField from "@mui/material/TextField";
import { useState } from "react";

export default function ProfileUpdateForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    location: "",
    mapUrl: "",
    description: "",
    password: "",
  });

  // Input Changes
  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="w-full h-auto">
      <form className="flex flex-col gap-3">
        <TextField
          required
          id="business_name"
          label="Business Name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          required
          id="email"
          label="Email"
          type="text"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          required
          id="phone"
          label="Phone Number"
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
        />
        <TextField
          required
          id="city"
          label="City"
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          required
          id="location"
          label="Location"
          type="text"
          name="location"
          value={formData.location}
          onChange={handleChange}
        />
        <TextField
          required
          id="mapUrl"
          label="Map Url"
          type="text"
          name="mapUrl"
          value={formData.mapUrl}
          onChange={handleChange}
        />
        <TextField
          required
          id="description"
          label="Business Description"
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={3}
        />
        <TextField
          required
          id="password"
          label="Enter your Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
}
