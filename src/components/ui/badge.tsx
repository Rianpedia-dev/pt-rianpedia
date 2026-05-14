import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-none border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[1px] transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-hairline bg-surface-card text-on-dark",
        secondary: "border-hairline bg-surface-soft text-body",
        destructive: "border-m-red/50 bg-m-red/10 text-m-red",
        outline: "border-hairline bg-transparent text-on-dark",
        success: "border-success/50 bg-success/10 text-success",
        warning: "border-warning/50 bg-warning/10 text-warning",
        info: "border-m-blue-light/50 bg-m-blue-light/10 text-m-blue-light",
        grey: "border-hairline bg-carbon-gray text-muted",
        purple: "border-hairline bg-surface-elevated text-body-strong",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
