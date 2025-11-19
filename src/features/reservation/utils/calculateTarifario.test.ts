import { describe, expect, it } from 'vitest'

import { ACCOMMODATIONS } from '../data/accommodations'
import { calculateTarifario } from './calculateTarifario'

const suite = ACCOMMODATIONS[0]

function makeDate(dateString: string) {
  return new Date(`${dateString}T12:00:00-03:00`)
}

describe('calculateTarifario', () => {
  it('throws when check-out is before check-in', () => {
    expect(() =>
      calculateTarifario({
        accommodationId: suite.id,
        checkIn: makeDate('2025-05-10'),
        checkOut: makeDate('2025-05-09'),
        adults: 2,
      }),
    ).toThrowError(/check-out/)
  })

  it('enforces minimum number of nights', () => {
    expect(() =>
      calculateTarifario({
        accommodationId: suite.id,
        checkIn: makeDate('2025-05-10'),
        checkOut: makeDate('2025-05-11'),
        adults: 2,
      }),
    ).toThrowError(/Estadia mínima/)
  })

  it('applies weekend surcharge', () => {
    const result = calculateTarifario({
      accommodationId: suite.id,
      checkIn: makeDate('2025-05-09'), // Friday
      checkOut: makeDate('2025-05-12'), // Monday
      adults: 2,
    })

    // Friday, Saturday, Sunday nights => 3 nights (2 weekend nights)
    const friday = suite.baseRate
    const weekendNight = suite.baseRate * 1.2

    expect(result.nightlyTotal).toBeCloseTo(friday + weekendNight * 2, 2)
  })

  it('applies 10% long stay discount on stays longer than 7 nights', () => {
    const result = calculateTarifario({
      accommodationId: suite.id,
      checkIn: makeDate('2025-05-01'),
      checkOut: makeDate('2025-05-10'), // 9 nights
      adults: 2,
    })

    const subtotal = result.nightlyTotal + result.cleaningFee
    expect(result.discount).toBeCloseTo(subtotal * 0.1, 2)
    expect(result.total).toBeCloseTo(subtotal * 0.9, 2)
  })

  it('requires at least one adult to proceed', () => {
    expect(() =>
      calculateTarifario({
        accommodationId: suite.id,
        checkIn: makeDate('2025-05-10'),
        checkOut: makeDate('2025-05-12'),
        adults: 0,
      }),
    ).toThrowError(/Informe ao menos 1 adulto/i)
  })
})
