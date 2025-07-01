import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string; // Optional custom styles
};

const Subheading: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className = "mt-[2px] text-[15px]/[20px] font-bold text-foreground">
        <span className = "wrap-break-word min-w-0">
            {children}
        </span>
    </div>
  );
};

export default Subheading;
