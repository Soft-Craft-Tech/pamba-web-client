"use client";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useDispatch, useSelector } from "react-redux";
import { setQueuedServices, setService } from "@/store/completeProfileSlice";
import { ChangeEvent } from "react";

export default function AddServicesForm({ data }: { data: any }) {
  const dispatch = useDispatch();
  const service = useSelector((state: any) => state.completeProfile.service);
  const queuedServices = useSelector(
    (state: any) => state.completeProfile.queuedServices
  );

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    if (isChangeEvent(e)) {
      const { name, value } = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement;
      dispatch(setService({ ...service, [name]: value }));
    } else if (isSelectChangeEvent(e)) {
      const { name, value } = e.target;
      dispatch(setService({ ...service, [name]: value }));
    }
  };

  const isChangeEvent = (
    event: any
  ): event is ChangeEvent<HTMLInputElement | HTMLTextAreaElement> => {
    return (
      "target" in event &&
      (event.target instanceof HTMLInputElement ||
        event.target instanceof HTMLTextAreaElement)
    );
  };

  const isSelectChangeEvent = (event: any): event is SelectChangeEvent => {
    return "target" in event && event.target instanceof HTMLInputElement;
  };

  const addServices = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const exists = queuedServices.some(
      (item: { name: any }) => item.name === service.name
    );
    if (!exists) {
      dispatch(setQueuedServices([...queuedServices, service]));
    }
    dispatch(setService({ 
      category: "", 
      price: "",
      description: "",
      estimatedTime: "",
      name: ""
    }
    ));
  };

  return (
    <div className="flex flex-col gap-5 w-full  p-5 border bg-white shadow-sm lg:p-10 lg:min-w-96">
      <h3>What Services do you offer?</h3>
      <form onSubmit={addServices} className="flex flex-col gap-3">
        <FormControl fullWidth>
          <InputLabel id="service">Service Category</InputLabel>
          <Select
            labelId="service"
            id="category"
            value={service.id}
            name="category"
            label="Service Category"
            onChange={handleChange}
          >
            {data?.categories?.map((item: { id: number; category: string }) => (
              <MenuItem key={item.id} value={item.id}>
                {item.category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <TextField
          required
          id="service"
          label="Service Name"
          type="text"
          name="name"
          value={service.name}
          onChange={handleChange}
        />
        <TextField
          required
          id="description"
          label="Description"
          type="text"
          name="description"
          value={service.description}
          onChange={handleChange}
        />

        <TextField
          required
          id="time"
          label="Estimated Service Duration (in hrs)"
          type="number"
          name="estimatedTime"
          value={service.estimatedTime}
          onChange={handleChange}
        />
        <TextField
          required
          id="price"
          label="Price"
          type="number"
          name="price"
          value={service.price}
          onChange={handleChange}
        />
        <button
          className="py-3 px-10 bg-secondary text-white h-max rounded-md"
          type="submit"
        >
          Add
        </button>
      </form>
    </div>
  );
}
