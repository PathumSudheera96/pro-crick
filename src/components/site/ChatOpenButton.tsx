'use client'

export function ChatOpenButton({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new CustomEvent('pro-crick:open-chat'))}
    >
      {children}
    </button>
  )
}
