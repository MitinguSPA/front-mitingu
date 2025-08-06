import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  fullWidth = false,
  children,
  className = "",
  ...rest
}) => {
  const baseStyles = "btn";

  const variantStyles = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    accent: "btn-accent",
    outline: "btn-outline",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  const buttonStyles = `
    ${baseStyles} 
    ${variantStyles[variant]} 
    ${sizeStyles[size]} 
    ${widthStyles} 
    ${className}
  `.trim();

  return (
    <button className={buttonStyles} {...rest}>
      {children}
    </button>
  );
};

export default Button;
