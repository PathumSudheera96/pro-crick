'use client'

import type { ButtonHTMLAttributes } from 'react'

export function ChatOpenButton({
  children,
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('pro-crick:open-chat'))}
    >
      {children}
    </button>
  )
}
