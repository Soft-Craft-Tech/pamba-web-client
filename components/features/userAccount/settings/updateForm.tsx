import { useUpdateProfile } from "@/app/api/auth";
import { IUser } from "@/components/types";
import { profileUpdateSchema } from "@/utils/zodSchema/index";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import LabelledFormField from "@/ui/LabelledFormField";

type FormValues = z.infer<typeof profileUpdateSchema>;

export default function ProfileUpdateForm({ client }: { client: IUser }) {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(profileUpdateSchema),
  });

  const { mutateAsync, isPending } = useUpdateProfile();

  const onSubmit = async (data: FormValues) => {
    await mutateAsync(data);
    reset()
  };

  return (
    <div className="w-full h-auto">
      <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
        <LabelledFormField
          type="text"
          placeholder="Business Name"
          name="name"
          register={register}
          defaultValue={client?.business_name}
          error={errors.name}
        />
        <LabelledFormField
          type="email"
          placeholder="Email"
          name="email"
          register={register}
          defaultValue={client?.email}
          error={errors.email}
        />
        <LabelledFormField
          type="text"
          placeholder="Phone Number"
          name="phone"
          register={register}
          error={errors.phone}
          defaultValue={client?.phone}
        />
        <LabelledFormField
          type="text"
          placeholder="City"
          name="city"
          register={register}
          error={errors.city}
          defaultValue={client?.city}
        />
        <LabelledFormField
          type="text"
          placeholder="Location"
          name="location"
          register={register}
          error={errors.location}
          defaultValue={client?.location}
        />

        <LabelledFormField
          type="text"
          placeholder="Map Url"
          name={"mapUrl"}
          register={register}
          error={errors.mapUrl}
          defaultValue={client?.google_map}
        />

        <LabelledFormField
          type="text"
          placeholder="Description"
          name="description"
          register={register}
          error={errors.description}
          defaultValue={client?.description}
        />
        <LabelledFormField
          type="text"
          placeholder="Enter your Password"
          name="password"
          register={register}
          error={errors.password}
        />

        <p className="text-xs text-secondary">
          * Enter your password to confirm you are the one updating details
          here.
        </p>
        <button
          type="submit"
          disabled={isPending}
          className="w-max py-2 px-5 bg-primary text-white font-semibold rounded-md"
        >
          {isPending ? "Saving" : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
