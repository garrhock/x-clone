import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string; // Optional custom styles
};

const Heading: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className = "text-[20px]/[24px] font-bold wrap-break-word text-foreground ">
        <span className = "wrap-break-word min-w-0">
            {children}
        </span>
    </div>
  );
};

export default Heading;
