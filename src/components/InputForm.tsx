import React, { forwardRef } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";

interface InputProps {
  id: string;
  label?: string;
  type?: string;
  placeholder?: string;
  className?: string;
  defaultValue?: string;
}

const InputForm = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, type, placeholder, className, defaultValue }, ref) => {
    return (
      <div>
        <div>
          <Label htmlFor={id} className="font-medium text-gray-600">
            {label}
          </Label>
          <Input
            id={id}
            ref={ref}
            name={id}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            className={cn("text-sm px-2 py-1 h-7", className)}
          />
        </div>
      </div>
    );
  }
);

export default InputForm;
