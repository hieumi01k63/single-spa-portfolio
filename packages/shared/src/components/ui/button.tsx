import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 text-sm rounded-md",
        sm: "h-9 px-3 text-sm rounded-md",
        lg: "h-12 px-6 py-3 text-base rounded-lg",
        icon: "h-10 w-10 rounded-md",
      },
      rounded: {
        default: "",
        full: "rounded-full",
        lg: "rounded-lg",
      },
      fullWidth: {
        true: "w-full",
        false: "",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
      rounded: "default",
      fullWidth: false,
    },
  }
);

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children">,
  VariantProps<typeof buttonVariants> {
  /** Left icon element */
  leftIcon?: React.ReactNode;
  /** Right icon element */
  rightIcon?: React.ReactNode;
  /** Enable scale animation on hover/tap */
  animated?: boolean;
  /** Button content */
  children?: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      fullWidth,
      leftIcon,
      rightIcon,
      animated = false,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.button
        className={cn(
          buttonVariants({ variant, size, rounded, fullWidth, className })
        )}
        ref={ref}
        whileHover={animated ? { scale: 1.02 } : undefined}
        whileTap={animated ? { scale: 0.98 } : undefined}
        {...props}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </motion.button>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
