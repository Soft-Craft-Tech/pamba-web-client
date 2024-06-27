import React, { ButtonHTMLAttributes, MouseEvent } from "react";

type ButtonVariants =
  | "primary"
  | "secondary"
  | "default"
  | "outline"
  | "disabled";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  variant?: ButtonVariants;
  label?: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({
  label,
  children,
  onClick,
  variant = "default",
  disabled,
  type = "button",
  ...rest
}) => {
  const baseClasses =
    "rounded-md p-12 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-max flex flex-row items-center";

  const variantClasses: Record<ButtonVariants, string> = {
    primary:
      "w-max border border-borders bg-primary px-10 py-2 text-white rounded-full text-sm font-semibold hover:bg-primaryHover duration-100 delay-75",
    outline:
      "w-max border border-primary bg-white px-10  py-2 text-primary rounded-full text-sm font-semibold hover:border-accent  hover:text-accent duration-100 delay-75",
    secondary:
      "w-max  px-10 py-2 text-[#828188] rounded-full text-sm hover:text-primary duration-100 delay-75",
    default:
      "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 ",
    disabled:
      "opacity-50 cursor-not-allowed w-max border border-borders bg-primary px-10 py-2 text-white rounded-full text-sm font-semibold",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children || label}
    </button>
  );
};

export default Button;
