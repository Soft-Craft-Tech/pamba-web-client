import { useSignUpMutation } from "@/app/api/auth";
import { useGetCategories } from "@/app/api/businesses";
import { cities } from "@/data/cities";
import { useAppDispatch } from "@/hooks";
import { prevStep } from "@/store/signUpSlice";
import { RootState } from "@/store/store";
import Button from "@/ui/button";
import FormField from "@/ui/FormField";
import ReactSelectComponent from "@/ui/Select";
import { businessInfoSchema } from "@/utils/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { parsePhoneNumber } from "libphonenumber-js";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import * as z from "zod";
const categories = [
  { value: "Technology", label: "Technology" },
  { value: "Health", label: "Health" },
  { value: "Finance", label: "Finance" },
];
type FormValues = z.infer<typeof businessInfoSchema>;

const BusinessInfo = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(businessInfoSchema),
  });
  const {
    signUp: { email, password, acceptedTerms },
  } = useSelector((state: RootState) => state);

  const {
    mutateAsync,
    isPending,
    isSuccess,
    data: signUpData,
  } = useSignUpMutation();

  const { data } = useGetCategories();

  const onSubmit = async (formData: FormValues) => {
    const { name, category, phone, city, mapUrl, location } = formData;

    const businessData = {
      email,
      password,
      acceptedTerms,
      name,
      category: category.value,
      phone: parsePhoneNumber(phone, "KE").number,
      city: city.value,
      mapUrl,
      location,
    };

    await mutateAsync(businessData);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(signUpData?.message);
      toast.warning("Please verify your email to continue", {
        autoClose: false,
        closeButton: true,
        closeOnClick: false,
      });
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    }
  }, [isSuccess, router, signUpData?.message]);

  return (
    <div className="w-full flex flex-col items-center gap-8 lg:gap-5 ">
      <h3 className="font-medium w-full text-lg text-center">
        Business Information
      </h3>
      <div className="flex gap-2 w-32 h-3 justify-center items-center text-accent font-semibold">
        <p>1</p>
        <div className="w-24 h-[3px] bg-blue-200 flex justify-start items-center text-center">
          <div className={`h-[3px] bg-accent w-full`}></div>
        </div>
        <p>2</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="p-3 w-full flex flex-col gap-4"
        noValidate
      >
        <div className="flex flex-col gap-5 lg:gap-4">
          <FormField
            type="text"
            placeholder="Business Name"
            name="name"
            error={errors.name}
            register={register}
          />
          <Controller
            name="category"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                type="creatable"
                isClearable
                onChange={(selectedOption) => {
                  setValue(
                    "category",
                    selectedOption as { value: string; label: string }
                  );
                }}
                options={data?.categories?.map(
                  ({
                    category_name,
                    id,
                  }: {
                    category_name: string;
                    id: string;
                  }) => ({ value: String(id), label: category_name })
                )}
                placeholder="Business Category"
                value={value}
                closeMenuOnSelect={true}
                error={errors.category}
              />
            )}
          />
          <FormField
            type="phone"
            placeholder="Phone Number"
            name="phone"
            error={errors.phone}
            register={register}
          />

          <Controller
            name="city"
            control={control}
            render={({ field: { onChange, value } }) => (
              <ReactSelectComponent
                onChange={onChange}
                options={cities?.map(({ name }: { name: string }) => ({
                  value: name,
                  label: name,
                }))}
                placeholder="City"
                value={value}
                closeMenuOnSelect={true}
                error={errors.city}
              />
            )}
          />

          <FormField
            type="url"
            placeholder="Map URL"
            name="mapUrl"
            error={errors.mapUrl}
            register={register}
          />
          <FormField
            type="textarea"
            placeholder="Location"
            name="location"
            error={errors.location}
            register={register}
            multiline={true}
          />
        </div>

        <div className="flex h-auto w-full items-center">
          <div
            onClick={() => {
              dispatch(prevStep());
            }}
            className="h-full w-full flex items-center py-2 text-primary gap-1 cursor-pointer delay-75 duration-75 hover:text-primaryHover"
          >
            <Image
              src="/arrow-left.svg"
              alt="left arrow"
              width={20}
              height={20}
            />
            <h2 className="text-sm font-semibold">Back</h2>
          </div>
          <Button variant="primary" type="submit" disabled={isPending}>
            {isPending ? "Submitting" : "Submit"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BusinessInfo;
