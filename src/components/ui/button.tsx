import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-color-orange text-primary-foreground hover:bg-hover-color-orange",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 ",
        outline:
          "border border-primary border-2 bg-color-body-gray hover:bg-hover-color-gray hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        date:
          "border rounded-md border border-2 border-[#bfbfbf] hover:bg-hover-color-black hover:text-accent-foreground active:border-primary",
        outlineInput: 
          "border border-[#bfbfbf] border-2 bg-transparent hover:border-[#707070] hover:text-accent-foreground data-[state=open]:border-2 data-[state=open]:border-[#707070] data-[state=open]:text-accent-foreground",
        integrated:
        "flex w-1/5 h-10 border rounded-r-md rounded-l-none border-t-2 border-b-2 border-r-2 border-l-1 border-[#bfbfbf] bg-transparent px-2 py-1 xxs5:px-3 xxs5:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-[#707070] hover:border-r-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        xl: "h-[48px] rounded-md px-[36px]",
        xl1: "h-[56px] rounded-md px-[40px]",
        xl2: "h-[64px] rounded-md px-[48px]",
        xl3: "h-[72px] rounded-md px-[56px]",
        auto: "h-11 rounded-md w-full xs:w-auto xs:h-10 xs:px-4 sm:h-11 sm:px-8 lg:h-9 lg:px-3 xl:h-11 xl:px-8 3xl:h-12 3xl:px-20",
        icon: "h-7 w-12",
        card: "w-full h-9 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
