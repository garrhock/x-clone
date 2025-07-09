import React from "react";

type Variant = "heading" | "subheading" | "description";
type Color = "foreground" | "muted" | "primary" | "secondary" | "danger" | "success" | string;

interface TextProps {
  children: React.ReactNode;
  variant?: Variant;
  color?: Color;
  className?: string;
}

const variantClasses: Record<Variant, string> = {
  heading: "text-[20px]/[24px] font-bold",
  subheading: "mt-[2px] text-[15px]/[20px] font-bold",
  description: "text-[13px]/[16px] font-normal",
};

const colorClasses: Record<Color, string> = {
  foreground: "text-foreground",
  muted: "text-muted",
  primary: "text-primary",
  secondary: "text-secondary",
  danger: "text-red-500",
  success: "text-green-500",
};

const Text: React.FC<TextProps> = ({
  children,
  variant = "description",
  color = "foreground",
  className = "",
}) => {
  const variantClass = variantClasses[variant];
  const colorClass = colorClasses[color] || color;

  return (
    <div className={`${variantClass} ${colorClass} wrap-break-word min-w-0 ${className}`}>
      <span className="wrap-break-word min-w-0">{children}</span>
    </div>
  );
};

export default Text;