'use client'

import type { ButtonHTMLAttributes } from 'react'

type ChatOpenButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  playerSlug?: string
  view?: 'chooser' | 'enquiry'
}

export function ChatOpenButton({
  children,
  className,
  playerSlug,
  view = 'enquiry',
  ...props
}: ChatOpenButtonProps) {
  return (
    <button
      {...props}
      type="button"
      className={className}
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent('pro-crick:open-chat', {
            detail: {
              playerSlug,
              view,
            },
          }),
        )
      }
    >
      {children}
    </button>
  )
}
