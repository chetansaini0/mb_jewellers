"use client";

import * as React from "react";
import { cn } from "@/app/lib/utils";

type ButtonVariant = "default" | "outline" | "ghost";
type ButtonSize = "default" | "sm" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  default:
    "bg-gradient-to-br from-[#f0d78c] via-[#c89b3c] to-[#9f7728] text-[#1a1408] shadow-[0_12px_34px_rgba(200,162,77,0.28)] hover:shadow-[0_16px_42px_rgba(200,162,77,0.38)]",
  outline:
    "border border-[var(--premium-line)] bg-[rgba(255,255,255,0.88)] text-[var(--premium-ink)] hover:border-[rgba(200,162,77,0.65)]",
  ghost: "text-[var(--premium-ink)] hover:bg-[rgba(200,162,77,0.1)]",
};

const sizeClasses: Record<ButtonSize, string> = {
  default: "h-11 px-5 py-2.5",
  sm: "h-9 px-3.5 py-2 text-sm",
  lg: "h-12 px-7 py-3",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", type = "button", ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-full text-xs font-semibold uppercase tracking-[0.16em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--premium-gold)] disabled:pointer-events-none disabled:opacity-50",
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
