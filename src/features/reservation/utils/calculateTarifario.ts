import { ACCOMMODATIONS, accommodationMap } from '../data/accommodations'
import type { AccommodationId } from '../data/accommodations'
import type { CalculationInput, CalculationResult, NightlyBreakdownItem } from '../types'

const WEEKEND_DAYS = new Set([0, 6])
const WEEKEND_SURCHARGE = 0.2
const LONG_STAY_DISCOUNT_THRESHOLD = 7
const LONG_STAY_DISCOUNT = 0.1

function getDateAtMidnight(value: Date) {
  return new Date(value.getFullYear(), value.getMonth(), value.getDate())
}

function assertAdults(adults: number) {
  if (!Number.isFinite(adults) || adults <= 0) {
    throw new Error('Informe ao menos 1 adulto para simular a reserva.')
  }
}

export function calculateTarifario(input: CalculationInput): CalculationResult {
  const { accommodationId, checkIn, checkOut, adults } = input
  assertAdults(adults)

  const accommodation = accommodationMap[accommodationId]
  if (!accommodation) {
    throw new Error('Acomodação selecionada é inválida.')
  }

  const normalizedCheckIn = getDateAtMidnight(checkIn)
  const normalizedCheckOut = getDateAtMidnight(checkOut)
  if (
    Number.isNaN(normalizedCheckIn.getTime()) ||
    Number.isNaN(normalizedCheckOut.getTime())
  ) {
    throw new Error('Datas inválidas. Preencha check-in e check-out.')
  }

  if (normalizedCheckOut <= normalizedCheckIn) {
    throw new Error('O check-out deve acontecer após o check-in.')
  }

  const msPerNight = 1000 * 60 * 60 * 24
  const nights = Math.round(
    (normalizedCheckOut.getTime() - normalizedCheckIn.getTime()) / msPerNight,
  )

  if (nights < accommodation.minNights) {
    throw new Error(
      `Estadia mínima: ${accommodation.minNights} noites para ${accommodation.name}.`,
    )
  }

  const nightlyBreakdown: NightlyBreakdownItem[] = Array.from(
    { length: nights },
    (_, index) => {
      const day = new Date(normalizedCheckIn)
      day.setDate(day.getDate() + index)
      const isWeekend = WEEKEND_DAYS.has(day.getDay())
      const amount = accommodation.baseRate * (isWeekend ? 1 + WEEKEND_SURCHARGE : 1)
      return { date: day, amount, isWeekend }
    },
  )

  const nightlyTotal = nightlyBreakdown.reduce((sum, item) => sum + item.amount, 0)
  const cleaningFee = accommodation.cleaningFee

  const subtotal = nightlyTotal + cleaningFee
  const discount =
    nights > LONG_STAY_DISCOUNT_THRESHOLD ? subtotal * LONG_STAY_DISCOUNT : 0
  const total = subtotal - discount

  return {
    accommodation,
    nights,
    nightlyBreakdown,
    nightlyTotal,
    cleaningFee,
    discount,
    total,
  }
}

export function getDefaultAccommodationId(): AccommodationId {
  return ACCOMMODATIONS[0]?.id ?? 'suite-jardim'
}
