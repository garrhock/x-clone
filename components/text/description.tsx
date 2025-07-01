import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string; // Optional custom styles
};

const Description: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className = "text-muted text-[13px]/[16px] font-normal min-w-0 items-center wrap-break-word overflow-hidden">
        <span className = "wrap-break-word min-w-0">{children}</span>
    </div>
  );
};

export default Description;
    