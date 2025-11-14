"use client"

import * as React from "react"
import { Button as MantineButton } from "@mantine/core"
import { cn } from "@/lib/utils"

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "destructive" | "link"
  size?: "sm" | "md" | "lg" | "xl" | "icon"
  fullWidth?: boolean
  loading?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = "primary",
    size = "md",
    fullWidth,
    loading,
    leftIcon,
    rightIcon,
    asChild,
    className,
    children,
    ...props
  }, ref) => {

    // Map our custom sizes to Mantine sizes + custom styles
    const sizeMap = {
      sm: { size: 'sm' as const, h: 36, px: 16 },
      md: { size: 'md' as const, h: 44, px: 24 },
      lg: { size: 'lg' as const, h: 56, px: 32 },
      xl: { size: 'xl' as const, h: 64, px: 40 },
      icon: { size: 'md' as const, h: 44, px: 0 },
    }

    const sizeConfig = sizeMap[size]

    // Custom variant styles - Coursify Purple/Pink Gradients
    const variantStyles = {
      primary: {
        variant: 'filled' as const,
        color: 'pink',
        style: {
          background: 'linear-gradient(135deg, #A855F7 0%, #EC4899 100%)',
          color: '#FFFFFF',
          borderWidth: 0,
          fontWeight: 700,
          boxShadow: '0 4px 14px 0 rgba(236, 72, 153, 0.39)',
        },
      },
      secondary: {
        variant: 'light' as const,
        color: 'pink',
        style: {
          borderWidth: 2,
          borderColor: '#EC4899',
          color: '#EC4899',
          backgroundColor: 'rgba(236, 72, 153, 0.1)',
          fontWeight: 700,
        },
      },
      outline: {
        variant: 'outline' as const,
        color: 'pink',
        style: {
          borderWidth: 2,
          borderColor: '#EC4899',
          color: '#EC4899',
          fontWeight: 700,
        },
      },
      ghost: {
        variant: 'subtle' as const,
        color: 'gray',
        style: {
          borderWidth: 0,
          fontWeight: 600,
        },
      },
      destructive: {
        variant: 'filled' as const,
        color: 'red',
        style: {
          borderWidth: 0,
          fontWeight: 700,
          boxShadow: '0 4px 14px 0 rgba(239, 68, 68, 0.39)',
        },
      },
      link: {
        variant: 'transparent' as const,
        color: 'pink',
        style: {
          textDecoration: 'underline',
          textUnderlineOffset: 4,
          fontWeight: 600,
        },
      },
    }

    const variantConfig = variantStyles[variant]

    // If asChild is true, just render the children directly with styling
    if (asChild && React.isValidElement(children)) {
      const childElement = children as React.ReactElement<{ className?: string; style?: React.CSSProperties }>
      return React.cloneElement(childElement, {
        className: cn(
          "inline-flex items-center justify-center gap-2 font-bold transition-all duration-200",
          "hover:scale-[1.02] active:scale-[0.98]",
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 focus-visible:ring-offset-2",
          variant === 'primary' && "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg",
          className,
          childElement.props.className
        ),
        style: {
          height: size === 'icon' ? sizeConfig.h : undefined,
          width: size === 'icon' ? sizeConfig.h : undefined,
          paddingLeft: size !== 'icon' ? sizeConfig.px : 0,
          paddingRight: size !== 'icon' ? sizeConfig.px : 0,
          ...childElement.props.style,
        },
      })
    }

    return (
      <MantineButton
        ref={ref}
        {...variantConfig}
        size={sizeConfig.size}
        fullWidth={fullWidth}
        loading={loading}
        leftSection={leftIcon}
        rightSection={rightIcon}
        className={cn(
          // Base styles
          "font-bold transition-all duration-200",
          // Hover effects
          "hover:scale-[1.02] active:scale-[0.98]",
          // Focus styles - Purple ring for Coursify design
          "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-purple-400 focus-visible:ring-offset-2",
          className
        )}
        styles={{
          root: {
            height: size === 'icon' ? sizeConfig.h : undefined,
            width: size === 'icon' ? sizeConfig.h : undefined,
            paddingLeft: size !== 'icon' ? sizeConfig.px : 0,
            paddingRight: size !== 'icon' ? sizeConfig.px : 0,
          },
        }}
        {...props}
      >
        {children}
      </MantineButton>
    )
  }
)

Button.displayName = "Button"

export { Button }
