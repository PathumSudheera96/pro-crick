import Image from 'next/image'
import Link from 'next/link'

const REGISTRATION_IMAGE = '/images/slide-4_upscaled.jpg'

export function RegistrationSplitCta() {
  return (
    <section data-gsap-section className="relative isolate overflow-hidden bg-panel px-5 py-20 text-white sm:px-8 lg:px-10">
      <Image
        src={REGISTRATION_IMAGE}
        alt="Cricketer on the field"
        fill
        sizes="100vw"
        className="absolute inset-0 -z-20 object-cover object-center"
      />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(5,5,5,0.82)_0%,rgba(8,14,24,0.74)_48%,rgba(5,5,5,0.82)_100%)]" />
      <div className="absolute inset-0 -z-10 bg-panel/24 backdrop-blur-[1px]" />

      <div className="mx-auto grid max-w-[90rem] grid-cols-1 sm:grid-cols-2">
        <RegistrationPanel
          title="Ready for the right playing opportunity?"
          description="Register now, and we’ll help you secure the right opportunity."
          buttonLabel="Register as a Player"
          href="/apply"
        />

        <RegistrationPanel
          title="Ready to recruit the right cricketer?"
          description="Register now, and we’ll help you find your ideal player."
          buttonLabel="Register as a Club"
          href="/contact-us"
          withDivider
        />
      </div>
    </section>
  )
}

function RegistrationPanel({
  title,
  description,
  buttonLabel,
  href,
  withDivider = false,
}: {
  title: string
  description: string
  buttonLabel: string
  href: string
  withDivider?: boolean
}) {
  return (
    <div
      className={`flex flex-col items-center px-4 py-8 text-center sm:px-8 lg:px-12 ${
        withDivider ? 'border-t border-white/42 sm:border-l sm:border-t-0' : ''
      }`}
    >
      <h2 data-gsap-item data-gsap-title className="max-w-3xl text-[clamp(1.35rem,3vw,3.25rem)] font-medium leading-[1.02] tracking-[-0.035em] text-white">
        {title}
      </h2>
      <p data-gsap-item className="type-lead mt-8 max-w-2xl text-white/82">{description}</p>
      <Link
        href={href}
        data-gsap-item
        className="mt-9 inline-flex min-h-14 items-center justify-center bg-accent px-5 text-center text-xs font-medium uppercase tracking-[0.12em] !text-white transition-colors duration-200 hover:bg-accent-hover sm:min-w-80 sm:px-8 sm:text-sm"
      >
        {buttonLabel}
      </Link>
    </div>
  )
}
