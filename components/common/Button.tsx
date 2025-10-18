import { cn } from "@/lib/helpers/utils";

type Variant = "primary" | "outline" | "ghost";

export default function Button(
  { variant = "primary", className, children, ...rest }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }
) {
  const base = "btn";
  const map: Record<Variant, string> = {
    primary: "btn-primary",
    outline: "btn-outline",
    ghost: "btn-ghost",
  };
  return (
    <button className={cn(base, map[variant], className)} {...rest}>
      {children}
    </button>
  );
}
