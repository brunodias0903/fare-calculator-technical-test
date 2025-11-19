import { useCallback, useMemo, useState, type FormEvent } from 'react'

import { ErrorBanner } from '@/components/ErrorBanner'
import { ACCOMMODATIONS } from '../data/accommodations'
import type { AccommodationId } from '../data/accommodations'
import type { CalculationResult } from '../types'
import {
  calculateTarifario,
  getDefaultAccommodationId,
} from '../utils/calculateTarifario'
import { FareSummary } from './FareSummary'

interface FormState {
  accommodationId: AccommodationId
  checkIn: string
  checkOut: string
  adults: string
}

const initialFormState: FormState = {
  accommodationId: getDefaultAccommodationId(),
  checkIn: '',
  checkOut: '',
  adults: '2',
}

export function ReservationCalculator() {
  const [formState, setFormState] = useState<FormState>(initialFormState)
  const [result, setResult] = useState<CalculationResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isCalculating, setIsCalculating] = useState(false)

  const isFormValid = useMemo(() => {
    return Boolean(
      formState.checkIn && formState.checkOut && Number(formState.adults) > 0,
    )
  }, [formState])

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target
      setFormState((prev) => ({ ...prev, [name]: value }))
    },
    [],
  )

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setIsCalculating(true)
      try {
        const adults = Number(formState.adults)
        const calculation = calculateTarifario({
          accommodationId: formState.accommodationId,
          checkIn: new Date(formState.checkIn),
          checkOut: new Date(formState.checkOut),
          adults,
        })
        setResult(calculation)
        setError(null)
      } catch (err) {
        setResult(null)
        setError(
          err instanceof Error ? err.message : 'Não foi possível calcular a tarifa.',
        )
      } finally {
        setIsCalculating(false)
      }
    },
    [formState],
  )

  const handleReset = useCallback(() => {
    setFormState(initialFormState)
    setResult(null)
    setError(null)
  }, [])

  const inputClasses =
    'w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-base text-white placeholder:text-slate-400 transition focus:border-brand-400 focus:outline-none focus:ring-4 focus:ring-brand-400/30'

  return (
    <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <form
        className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 shadow-2xl shadow-black/20 backdrop-blur lg:p-8"
        onSubmit={handleSubmit}
      >
        <div className="space-y-1.5">
          <label
            htmlFor="accommodationId"
            className="text-sm font-semibold uppercase tracking-wider text-slate-300"
          >
            Acomodação
          </label>
          <div className="relative">
            <select
              id="accommodationId"
              name="accommodationId"
              value={formState.accommodationId}
              onChange={handleChange}
              className={`${inputClasses} appearance-none pr-12`}
            >
              {ACCOMMODATIONS.map((accommodation) => (
                <option
                  key={accommodation.id}
                  value={accommodation.id}
                  className="bg-white text-slate-900"
                >
                  {accommodation.name} • {accommodation.minNights}+ noites
                </option>
              ))}
            </select>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4 text-slate-200">
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
              >
                <path
                  d="M6 8l4 4 4-4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor="checkIn"
              className="text-sm font-semibold uppercase tracking-wider text-slate-300"
            >
              Check-in
            </label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={formState.checkIn}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="checkOut"
              className="text-sm font-semibold uppercase tracking-wider text-slate-300"
            >
              Check-out
            </label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={formState.checkOut}
              onChange={handleChange}
              required
              min={formState.checkIn}
              className={inputClasses}
            />
          </div>
          <div className="space-y-1.5 md:col-span-2 lg:col-span-1">
            <label
              htmlFor="adults"
              className="text-sm font-semibold uppercase tracking-wider text-slate-300"
            >
              Adultos
            </label>
            <input
              type="number"
              min={1}
              id="adults"
              name="adults"
              value={formState.adults}
              onChange={handleChange}
              required
              className={inputClasses}
            />
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            disabled={!isFormValid || isCalculating}
            className="flex-1 rounded-2xl bg-gradient-to-r from-brand-500 to-purple-500 px-6 py-3 text-center text-base font-semibold text-white shadow-glow transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCalculating ? 'Calculando...' : 'Calcular valor da estadia'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-2xl border border-white/20 px-6 py-3 text-base font-semibold text-white transition hover:border-brand-300 hover:text-brand-50"
          >
            Limpar
          </button>
        </div>
      </form>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur lg:p-8">
        {error ? <ErrorBanner>{error}</ErrorBanner> : null}
        {result !== null ? (
          <FareSummary result={result} />
        ) : (
          <div className="flex h-full min-h-[240px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 p-6 text-center text-slate-300">
            <p className="text-lg font-semibold">Pronto para calcular</p>
            <p className="text-sm text-slate-400">
              Informe o período, acomodação e adultos para visualizar o total da estadia.
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
