'use client'

import { useState } from 'react'

const INITIAL_FORM = {
  clubOrOrganization: '',
  country: '',
  email: '',
  message: '',
  name: '',
  phone: '',
  website: '',
}

type FormState = typeof INITIAL_FORM

export function ContactEnquiryForm({ playerSlug }: { playerSlug?: string }) {
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...form,
          playerSlug,
        }),
      })

      const payload = (await response.json()) as {
        error?: string
        message?: string
        referenceNumber?: string
      }

      if (!response.ok) {
        setError(payload.error || 'Unable to submit your enquiry right now.')
        return
      }

      setForm(INITIAL_FORM)
      setSuccessMessage(
        payload.referenceNumber
          ? `Enquiry submitted. Reference: ${payload.referenceNumber}`
          : payload.message || 'Enquiry submitted successfully.',
      )
    } catch {
      setError('Unable to submit your enquiry right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <FormField
          label="Full name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <FormField
          label="Email address"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <FormField
          label="Club or organisation"
          name="clubOrOrganization"
          value={form.clubOrOrganization}
          onChange={handleChange}
        />
        <FormField
          label="Phone number"
          name="phone"
          value={form.phone}
          onChange={handleChange}
        />
        <FormField
          label="Country"
          name="country"
          value={form.country}
          onChange={handleChange}
        />
        <input
          aria-hidden="true"
          autoComplete="off"
          className="hidden"
          name="website"
          tabIndex={-1}
          value={form.website}
          onChange={handleChange}
        />
      </div>

      <label className="grid gap-2">
        <span className="type-accent font-medium uppercase text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={6}
          value={form.message}
          onChange={handleChange}
          className="min-h-40 border border-hairline bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/65 focus:border-accent"
          placeholder="Tell us what role, timing, and level of player support you need."
        />
      </label>

      {error ? <p className="type-small text-accent">{error}</p> : null}
      {successMessage ? <p className="type-small text-foreground">{successMessage}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 items-center justify-center bg-accent px-8 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-accent/65"
      >
        {isSubmitting ? 'Submitting…' : 'Send enquiry'}
      </button>
    </form>
  )
}

function FormField({
  label,
  name,
  onChange,
  required = false,
  type = 'text',
  value,
}: {
  label: string
  name: keyof FormState
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  type?: string
  value: string
}) {
  return (
    <label className="grid gap-2">
      <span className="type-accent font-medium uppercase text-muted">{label}</span>
      <input
        className="min-h-13 border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/65 focus:border-accent"
        name={name}
        onChange={onChange}
        required={required}
        type={type}
        value={value}
      />
    </label>
  )
}
