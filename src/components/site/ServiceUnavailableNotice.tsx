export function ServiceUnavailableNotice({
  className = '',
  message = 'Service not available at the moment. Please try again shortly.',
  title = 'Service unavailable',
}: {
  className?: string
  message?: string
  title?: string
}) {
  return (
    <div className={`border border-dashed border-hairline bg-surface p-8 ${className}`.trim()}>
      <h2 className="type-h5 text-foreground">{title}</h2>
      <p className="type-body mt-3 max-w-2xl text-muted">{message}</p>
    </div>
  )
}
