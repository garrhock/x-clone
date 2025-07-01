// components/CustomContainer.tsx
import React from "react";

type Props = {
  children: React.ReactNode;
  className?: string; // Optional custom styles
};

const Container: React.FC<Props> = ({ children, className = "" }) => {
  return (
    <div className = "mb-[16px] bg-background border border-border rounded-2xl ">
        <div className = "flex flex-col items-stretch ">
            {children}
        </div>
    </div>
  );
};

export default Container;
