'use client'

import { useState } from 'react'

type SelectOption = {
  label: string
  value: string
}

type PlayerApplicationFormProps = {
  clubs: SelectOption[]
  countries: SelectOption[]
  roles: SelectOption[]
}

type FormState = {
  applicantName: string
  biography: string
  cricketRoleSlug: string
  currentClubSlug: string
  email: string
  nationalitySlug: string
  phone: string
  statistics: string
  teamsExperience: string
  vimeoVideos: string[]
  website: string
  youtubeVideos: string[]
}

const INITIAL_FORM: FormState = {
  applicantName: '',
  biography: '',
  cricketRoleSlug: '',
  currentClubSlug: '',
  email: '',
  nationalitySlug: '',
  phone: '',
  statistics: '',
  teamsExperience: '',
  vimeoVideos: [''],
  website: '',
  youtubeVideos: [''],
}

const STEPS = [
  {
    description: 'Basic details so Pro-Crick can identify you and respond properly.',
    key: 'personal',
    title: 'Personal details',
  },
  {
    description: 'The cricket context clubs need first: role, current environment, and experience.',
    key: 'cricket',
    title: 'Cricket background',
  },
  {
    description: 'Profile material, supporting links, and final submission.',
    key: 'profile',
    title: 'Profile and media',
  },
] as const

export function PlayerApplicationForm({
  clubs,
  countries,
  roles,
}: PlayerApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const [form, setForm] = useState<FormState>(INITIAL_FORM)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null)
  const [playerCv, setPlayerCv] = useState<File | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target

    setForm((current) => ({
      ...current,
      [name]: value,
    }))
  }

  const handleVideoChange = (
    kind: 'youtubeVideos' | 'vimeoVideos',
    index: number,
    value: string,
  ) => {
    setForm((current) => {
      const nextItems = [...current[kind]]
      nextItems[index] = value

      return {
        ...current,
        [kind]: nextItems,
      }
    })
  }

  const addVideoField = (kind: 'youtubeVideos' | 'vimeoVideos') => {
    setForm((current) => ({
      ...current,
      [kind]: [...current[kind], ''],
    }))
  }

  const removeVideoField = (kind: 'youtubeVideos' | 'vimeoVideos', index: number) => {
    setForm((current) => {
      const nextItems = current[kind].filter((_, itemIndex) => itemIndex !== index)

      return {
        ...current,
        [kind]: nextItems.length > 0 ? nextItems : [''],
      }
    })
  }

  const goToNextStep = () => {
    const validationError = validateStep(currentStep, form)

    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setCurrentStep((step) => Math.min(step + 1, STEPS.length - 1))
  }

  const goToPreviousStep = () => {
    setError(null)
    setCurrentStep((step) => Math.max(step - 1, 0))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validationError = validateStep(currentStep, form)
    if (validationError) {
      setError(validationError)
      return
    }

    setError(null)
    setSuccessMessage(null)
    setIsSubmitting(true)

    try {
      const payload = new FormData()
      payload.set('applicantName', form.applicantName)
      payload.set('email', form.email)
      payload.set('phone', form.phone)
      payload.set('nationalitySlug', form.nationalitySlug)
      payload.set('cricketRoleSlug', form.cricketRoleSlug)
      payload.set('currentClubSlug', form.currentClubSlug)
      payload.set('teamsExperience', form.teamsExperience)
      payload.set('statistics', form.statistics)
      payload.set('biography', form.biography)
      payload.set('website', form.website)

      form.youtubeVideos
        .map((value) => value.trim())
        .filter(Boolean)
        .forEach((value) => payload.append('youtubeVideos', value))

      form.vimeoVideos
        .map((value) => value.trim())
        .filter(Boolean)
        .forEach((value) => payload.append('vimeoVideos', value))

      if (profilePhoto) payload.set('profilePhoto', profilePhoto)
      if (playerCv) payload.set('playerCv', playerCv)

      const response = await fetch('/api/player-applications', {
        body: payload,
        method: 'POST',
      })

      const data = (await response.json()) as {
        error?: string
        message?: string
        referenceNumber?: string
      }

      if (!response.ok) {
        setError(data.error || 'Unable to submit your application right now.')
        return
      }

      setForm(INITIAL_FORM)
      setProfilePhoto(null)
      setPlayerCv(null)
      setCurrentStep(0)
      setSuccessMessage(
        data.referenceNumber
          ? `Application submitted. Reference: ${data.referenceNumber}`
          : data.message || 'Application submitted successfully.',
      )
    } catch {
      setError('Unable to submit your application right now.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      <div className="grid gap-px overflow-hidden border border-hairline bg-hairline lg:grid-cols-3">
        {STEPS.map((step, index) => {
          const isActive = index === currentStep
          const isComplete = index < currentStep

          return (
            <div key={step.key} className={`p-5 ${isActive ? 'bg-accent text-white' : 'bg-white text-foreground'}`}>
              <div className="flex items-center gap-3">
                <span
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium ${
                    isActive
                      ? 'bg-white text-accent'
                      : isComplete
                        ? 'bg-accent text-white'
                        : 'bg-surface text-foreground'
                  }`}
                >
                  {index + 1}
                </span>
                <p className={`type-accent font-medium uppercase ${isActive ? 'text-white/72' : 'text-muted'}`}>
                  Step {index + 1}
                </p>
              </div>
              <h3 className="type-h5 mt-4">{step.title}</h3>
              <p className={`type-small mt-3 ${isActive ? 'text-white/78' : 'text-muted'}`}>
                {step.description}
              </p>
            </div>
          )
        })}
      </div>

      {currentStep === 0 ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Full name"
            name="applicantName"
            required
            value={form.applicantName}
            onChange={handleChange}
          />
          <FormField
            label="Email address"
            name="email"
            required
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          <FormField
            label="Phone number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
          <SelectField
            label="Nationality"
            name="nationalitySlug"
            value={form.nationalitySlug}
            onChange={handleChange}
            options={countries}
          />
        </div>
      ) : null}

      {currentStep === 1 ? (
        <div className="grid gap-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <SelectField
              label="Primary cricket role"
              name="cricketRoleSlug"
              value={form.cricketRoleSlug}
              onChange={handleChange}
              options={roles}
            />
            <SelectField
              label="Current club"
              name="currentClubSlug"
              value={form.currentClubSlug}
              onChange={handleChange}
              options={clubs}
            />
          </div>

          <TextAreaField
            label="Teams and playing experience"
            name="teamsExperience"
            placeholder="List teams represented, levels played, tours, leagues, or notable cricket environments."
            rows={5}
            value={form.teamsExperience}
            onChange={handleChange}
          />

          <TextAreaField
            label="Key statistics"
            name="statistics"
            placeholder="Include the performance numbers you want a club to see first."
            rows={5}
            value={form.statistics}
            onChange={handleChange}
          />
        </div>
      ) : null}

      {currentStep === 2 ? (
        <div className="grid gap-6">
          <TextAreaField
            label="Player biography"
            name="biography"
            required
            placeholder="Write a short cricket-focused summary covering your style, strengths, experience, and the type of opportunity you are seeking."
            rows={7}
            value={form.biography}
            onChange={handleChange}
          />

          <div className="grid gap-5 sm:grid-cols-2">
            <FileField
              accept="image/png,image/jpeg,image/webp"
              hint="Optional. JPEG, PNG, or WebP up to 5MB."
              label="Profile photo"
              onChange={(event) => setProfilePhoto(event.target.files?.[0] || null)}
            />
            <FileField
              accept="application/pdf"
              hint="Optional. PDF up to 10MB."
              label="Player CV"
              onChange={(event) => setPlayerCv(event.target.files?.[0] || null)}
            />
          </div>

          <VideoFieldGroup
            items={form.youtubeVideos}
            kind="youtubeVideos"
            label="YouTube video links"
            onAdd={addVideoField}
            onChange={handleVideoChange}
            onRemove={removeVideoField}
            placeholder="https://www.youtube.com/watch?v=..."
          />

          <VideoFieldGroup
            items={form.vimeoVideos}
            kind="vimeoVideos"
            label="Vimeo video links"
            onAdd={addVideoField}
            onChange={handleVideoChange}
            onRemove={removeVideoField}
            placeholder="https://vimeo.com/..."
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
      ) : null}

      {error ? <p className="type-small text-accent">{error}</p> : null}
      {successMessage ? <p className="type-small text-foreground">{successMessage}</p> : null}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="type-small text-muted">
          {currentStep < STEPS.length - 1
            ? 'You can review and edit everything before submitting.'
            : 'Submitting sends your application to the Pro-Crick CMS for review.'}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          {currentStep > 0 ? (
            <button
              type="button"
              onClick={goToPreviousStep}
              className="inline-flex min-h-12 items-center justify-center border border-hairline px-6 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground/25 hover:bg-surface"
            >
              Previous step
            </button>
          ) : null}

          {currentStep < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={goToNextStep}
              className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover"
            >
              Next step
            </button>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex min-h-12 items-center justify-center bg-accent px-6 text-sm font-medium uppercase tracking-[0.12em] text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:bg-accent/65"
            >
              {isSubmitting ? 'Submitting…' : 'Submit application'}
            </button>
          )}
        </div>
      </div>
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

function SelectField({
  label,
  name,
  onChange,
  options,
  value,
}: {
  label: string
  name: keyof FormState
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
  options: SelectOption[]
  value: string
}) {
  return (
    <label className="grid gap-2">
      <span className="type-accent font-medium uppercase text-muted">{label}</span>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="min-h-13 border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors focus:border-accent"
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={`${name}-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}

function TextAreaField({
  label,
  name,
  onChange,
  placeholder,
  required = false,
  rows,
  value,
}: {
  label: string
  name: keyof FormState
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void
  placeholder: string
  required?: boolean
  rows: number
  value: string
}) {
  return (
    <label className="grid gap-2">
      <span className="type-accent font-medium uppercase text-muted">{label}</span>
      <textarea
        name={name}
        required={required}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="min-h-32 border border-hairline bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted/65 focus:border-accent"
      />
    </label>
  )
}

function FileField({
  accept,
  hint,
  label,
  onChange,
}: {
  accept: string
  hint: string
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) {
  return (
    <label className="grid gap-2">
      <span className="type-accent font-medium uppercase text-muted">{label}</span>
      <input
        accept={accept}
        type="file"
        onChange={onChange}
        className="min-h-13 border border-hairline bg-white px-4 py-3 text-sm text-foreground outline-none transition-colors file:mr-4 file:border-0 file:bg-transparent file:text-sm file:font-medium"
      />
      <span className="type-small text-muted">{hint}</span>
    </label>
  )
}

function VideoFieldGroup({
  items,
  kind,
  label,
  onAdd,
  onChange,
  onRemove,
  placeholder,
}: {
  items: string[]
  kind: 'youtubeVideos' | 'vimeoVideos'
  label: string
  onAdd: (kind: 'youtubeVideos' | 'vimeoVideos') => void
  onChange: (kind: 'youtubeVideos' | 'vimeoVideos', index: number, value: string) => void
  onRemove: (kind: 'youtubeVideos' | 'vimeoVideos', index: number) => void
  placeholder: string
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center justify-between gap-4">
        <span className="type-accent font-medium uppercase text-muted">{label}</span>
        <button
          type="button"
          onClick={() => onAdd(kind)}
          className="text-sm font-medium uppercase tracking-[0.12em] text-accent transition-colors hover:text-accent-hover"
        >
          Add link
        </button>
      </div>

      <div className="grid gap-3">
        {items.map((item, index) => (
          <div key={`${kind}-${index}`} className="flex gap-3">
            <input
              value={item}
              onChange={(event) => onChange(kind, index, event.target.value)}
              placeholder={placeholder}
              className="min-h-13 w-full border border-hairline bg-white px-4 text-sm text-foreground outline-none transition-colors placeholder:text-muted/65 focus:border-accent"
            />
            {items.length > 1 ? (
              <button
                type="button"
                onClick={() => onRemove(kind, index)}
                className="inline-flex min-h-13 items-center justify-center border border-hairline px-4 text-sm font-medium uppercase tracking-[0.12em] text-foreground transition-colors hover:border-foreground/25 hover:bg-surface"
              >
                Remove
              </button>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  )
}

function validateStep(step: number, form: FormState) {
  if (step === 0) {
    if (form.applicantName.trim().length < 2) {
      return 'Please enter your full name.'
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      return 'Please enter a valid email address.'
    }
  }

  if (step === 2) {
    if (form.biography.trim().length < 30) {
      return 'Biography must be at least 30 characters.'
    }
  }

  return null
}
