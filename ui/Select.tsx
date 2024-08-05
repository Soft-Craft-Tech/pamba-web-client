"use client";
import Select, {
  Props,
  components,
  DropdownIndicatorProps,
  ClearIndicatorProps,
  MultiValueRemoveProps,
} from "react-select";
import { clsx } from "clsx";
import CreatableSelect from "react-select/creatable";
import { FaChevronDown, FaTimes } from "react-icons/fa";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

const DropdownIndicator = (props: DropdownIndicatorProps) => {
  return (
    <components.DropdownIndicator {...props}>
      <FaChevronDown />
    </components.DropdownIndicator>
  );
};

export const formatOptionLabel = (mentor: {
  value: string;
  label: string;
  imageUrls: string;
}) => {
  const { value, imageUrls } = mentor;
  return (
    <div className="flex items-center gap-2 transition-colors ease-in-out h-full w-full">
      <LazyLoadImage
        effect="blur"
        className="w-6 h-6 rounded-full object-cover"
        src={imageUrls}
        alt="avatar"
      />
      <p>{value}</p>
    </div>
  );
};

const ClearIndicator = (props: ClearIndicatorProps) => {
  return (
    <components.ClearIndicator {...props}>
      <FaTimes />
    </components.ClearIndicator>
  );
};

const MultiValueRemove = (props: MultiValueRemoveProps) => {
  return (
    <components.MultiValueRemove {...props}>
      <FaTimes />
    </components.MultiValueRemove>
  );
};

const controlStyles = {
  base: "z-10 h-14 px-2 py-1 lg:h-12 border border-[#8C8C8C] text-sm bg-neutral-white placeholder:text-neutral-gray rounded-md w-full text-neutral-dark focus:outline-neutral-purple transition-colors ease-in-out focus:border-2 focus:border-neutral-purple focus:shadow-lg",
  focus: "border-2 border-transparent",
};1
const placeholderStyles = "text-tryGray text-base pl-1 py-0.5";
const selectInputStyles = "p-1";
const valueContainerStyles = "p-1 gap-1";
const singleValueStyles = "leading-7 ml-1";
const multiValueStyles =
  "bg-neutral-purple text-neutral-white text-sm rounded items-center py-0.5 px-1 shadow-xl gap-1.5";
const multiValueLabelStyles = "leading-6 py-0.5 px-1";
const multiValueRemoveStyles =
  "text-xs text-white hover:border-red-300 rounded-md";
const indicatorsContainerStyles = "p-1 gap-1";
const clearIndicatorStyles =
  "text-gray-500 p-1 rounded-md hover:bg-red-50 hover:text-red-800";
const indicatorSeparatorStyles = "hidden";
const dropdownIndicatorStyles =
  "p-1 hover:bg-gray-100 text-gray-500 rounded-md hover:text-black";
const menuStyles =
  "p-1 mt-2 border border-gray-200 bg-white rounded-lg";
const groupHeadingStyles = "ml-3 mt-2 mb-1 text-gray-500 text-sm";
const optionStyles = {
  base: "hover:cursor-pointer px-3 py-2 rounded",
  focus: "bg-gray-100 active:bg-gray-200",
  selected:
    "after:content-['✔'] after:ml-4 after:text-sm after:text-neutral-purple",
};
const noOptionsMessageStyles =
  "text-gray-500 p-2 bg-gray-50 border border-dashed border-gray-200 rounded-sm";

type ReactSelectProps = Props & {
  type?: "creatable" | "timezone";
  error?: Merge<FieldError, FieldErrorsImpl<{ label: string; value: number }>>;
};

const ReactSelectCreatable = ({
  type,
  value,
  options,
  ...props
}: ReactSelectProps) => {
  return (
    <CreatableSelect
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      classNames={{
        control: ({ isFocused }) =>
          clsx(isFocused ? controlStyles.focus : "", controlStyles.base),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "ease-in",
        }),
      }}
      value={value}
      options={options}
      unstyled
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      {...props}
    />
  );
};

const ReactSelect = ({ type, value, options, ...props }: ReactSelectProps) => {
  return (
    <Select
      components={{ DropdownIndicator, ClearIndicator, MultiValueRemove }}
      classNames={{
        control: ({ isFocused }) =>
          clsx(isFocused ? controlStyles.focus : "", controlStyles.base),
        placeholder: () => placeholderStyles,
        input: () => selectInputStyles,
        valueContainer: () => valueContainerStyles,
        singleValue: () => singleValueStyles,
        multiValue: () => multiValueStyles,
        multiValueLabel: () => multiValueLabelStyles,
        multiValueRemove: () => multiValueRemoveStyles,
        indicatorsContainer: () => indicatorsContainerStyles,
        clearIndicator: () => clearIndicatorStyles,
        indicatorSeparator: () => indicatorSeparatorStyles,
        dropdownIndicator: () => dropdownIndicatorStyles,
        menu: () => menuStyles,
        groupHeading: () => groupHeadingStyles,
        option: ({ isFocused, isSelected }) =>
          clsx(
            isFocused && optionStyles.focus,
            isSelected && optionStyles.selected,
            optionStyles.base
          ),
        noOptionsMessage: () => noOptionsMessageStyles,
      }}
      styles={{
        input: (base) => ({
          ...base,
          "input:focus": {
            boxShadow: "none",
          },
        }),
        // On mobile, the label will truncate automatically, so we want to
        // override that behaviour.
        multiValueLabel: (base) => ({
          ...base,
          whiteSpace: "normal",
          overflow: "visible",
        }),
        control: (base) => ({
          ...base,
          transition: "ease-in",
        }),
      }}
      value={value}
      options={options}
      unstyled
      closeMenuOnSelect={false}
      hideSelectedOptions={false}
      {...props}
    />
  );
};

const ReactSelectComponent = ({ type, error, ...props }: ReactSelectProps) => {
  if (type === "creatable") {
    return (
      <>
        <ReactSelectCreatable
          {...props}
          menuPlacement="bottom"
          maxMenuHeight={250}
        />
        {error && (
          <span className="bg-red-100 text-red-700 p-4 rounded-lg">
            {error.message}
          </span>
        )}
      </>
    );
  }
  return (
    <>
      <ReactSelect {...props} menuPlacement="bottom" maxMenuHeight={250} />
      {error && (
        <span className="bg-red-100 text-red-700 p-4 rounded-lg">
          {error.message}
        </span>
      )}
    </>
  );
};

export default ReactSelectComponent;
