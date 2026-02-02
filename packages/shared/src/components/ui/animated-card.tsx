import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "framer-motion";
import { cn } from "../../lib/utils";

// Default animation variants
export const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export const cardHoverVariants: Variants = {
  rest: { scale: 1 },
  hover: { scale: 1.02 },
};

interface AnimatedCardProps extends HTMLMotionProps<"div"> {
  /** Custom animation variants */
  variants?: Variants;
  /** Enable hover scale effect */
  hoverEffect?: boolean;
  /** Enable hover border highlight */
  hoverBorder?: boolean;
}

const AnimatedCard = React.forwardRef<HTMLDivElement, AnimatedCardProps>(
  (
    {
      className,
      variants = cardVariants,
      hoverEffect = false,
      hoverBorder = true,
      children,
      ...props
    },
    ref
  ) => (
    <motion.div
      ref={ref}
      variants={variants}
      whileHover={hoverEffect ? { scale: 1.02 } : undefined}
      className={cn(
        "rounded-xl border bg-card text-card-foreground p-5 transition-colors duration-300",
        hoverBorder && "hover:border-primary/50",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
);
AnimatedCard.displayName = "AnimatedCard";

interface AnimatedCardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: React.ReactNode;
  title: string;
}

const AnimatedCardHeader = React.forwardRef<
  HTMLDivElement,
  AnimatedCardHeaderProps
>(({ className, icon, title, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center gap-2 mb-4", className)}
    {...props}
  >
    {icon && (
      <span className="text-xl" role="img" aria-label={title}>
        {icon}
      </span>
    )}
    <h3 className="text-sm font-semibold text-foreground">{title}</h3>
  </div>
));
AnimatedCardHeader.displayName = "AnimatedCardHeader";

interface AnimatedCardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const AnimatedCardContent = React.forwardRef<
  HTMLDivElement,
  AnimatedCardContentProps
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("", className)} {...props} />
));
AnimatedCardContent.displayName = "AnimatedCardContent";

// Skill badge component for skill cards
interface SkillBadgeProps extends HTMLMotionProps<"span"> {
  skill: string;
}

const skillBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

const SkillBadge = React.forwardRef<HTMLSpanElement, SkillBadgeProps>(
  ({ skill, className, variants = skillBadgeVariants, ...props }, ref) => (
    <motion.span
      ref={ref}
      variants={variants}
      whileHover={{ scale: 1.05 }}
      className={cn(
        "px-3 py-1 text-xs font-medium rounded-full",
        "bg-secondary text-secondary-foreground",
        "hover:bg-primary hover:text-primary-foreground",
        "transition-colors duration-200 cursor-default",
        className
      )}
      {...props}
    >
      {skill}
    </motion.span>
  )
);
SkillBadge.displayName = "SkillBadge";

// Container for staggered children animations
export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

interface StaggerContainerProps extends HTMLMotionProps<"div"> {}

const StaggerContainer = React.forwardRef<
  HTMLDivElement,
  StaggerContainerProps
>(({ className, variants = staggerContainerVariants, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={variants}
    className={cn("flex flex-wrap gap-2", className)}
    {...props}
  />
));
StaggerContainer.displayName = "StaggerContainer";

export {
  AnimatedCard,
  AnimatedCardHeader,
  AnimatedCardContent,
  SkillBadge,
  StaggerContainer,
  skillBadgeVariants,
};
