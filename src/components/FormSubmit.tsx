import React from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface SubmitProps {
  children: React.ReactNode;
  className?: string;
  variant?: any;
}
const FormSubmit = ({ children, className, variant }: SubmitProps) => {
  return (
    <Button className={cn(className)} variant={variant} type="submit" size="sm">
      {children}
    </Button>
  );
};

export default FormSubmit;
