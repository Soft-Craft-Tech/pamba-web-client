import React, { ButtonHTMLAttributes, MouseEvent } from "react";

type ButtonVariants = "primary" | "secondary" | "default";

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
  ...rest
}) => {
  const baseClasses =
    "rounded-md p-12 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-max";

  const variantClasses: Record<ButtonVariants, string> = {
    primary:
      "w-max border border-borders bg-primary px-10 py-2 text-white rounded-full text-sm font-semibold",

    secondary: "w-max  px-10 py-2 text-[#828188] rounded-full text-sm ",
    default:
      "bg-gray-300 text-gray-700 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2",
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]}`;

  return (
    <button
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
