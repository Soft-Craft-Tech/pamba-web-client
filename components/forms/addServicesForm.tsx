"use client";
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import uniqid from "uniqid";
import { useContext } from "react";
import { CompleteProfileContext } from '@/app/context/completeProfile/completeProfileContext';

export default function AddServicesForm({data}) {
    const {service, setService, setQueuedServices, queuedServices} = useContext(CompleteProfileContext);

    // Handle Input Change
    const handleChange = (e) => {
        const {name, value} = e.target;
        if (service.id) {
            data
        }
        setService(prev => {return {...prev, [name]: value}});
    }

    // Queue service
    const addServices = (e) => {
        e.preventDefault();
        // Check if the service has already been queued
        const exists = queuedServices.some(item => {
            return item.id === service.id;
        });

        // 
        if (!exists) {
            setQueuedServices(prev => {return [...prev, service]});
        }
        setService({id: "", price: ""});
    }
    return (
        <div className="flex flex-col gap-5 w-full max-h-96 p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
                    <h3>What Services do you offer?</h3>
                    <form onSubmit={addServices} className="flex flex-col gap-3">
                        <FormControl fullWidth>
                            <InputLabel id="service">Service</InputLabel>
                            <Select
                                labelId="service"
                                id="service"
                                value={service.id}
                                name="id"
                                label="Service"
                                onChange={handleChange}
                            >
                                {data?.services?.map(item => {
                                    return <MenuItem key={uniqid()} value={item.id}>{item.service}</MenuItem>
                                })}
                            </Select>
                        </FormControl>
                        <TextField
                            required
                            id="price"
                            label="Price"
                            type="number"
                            name="price"
                            value={service.price}
                            onChange={handleChange}
                        />
                        <button className="py-3 px-10 bg-secondary text-white h-max rounded-md">Add</button>
                    </form>
                </div>
    )
}