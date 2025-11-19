import type { Accommodation, AccommodationId } from './data/accommodations'

export interface CalculationInput {
  accommodationId: AccommodationId
  checkIn: Date
  checkOut: Date
  adults: number
}

export interface NightlyBreakdownItem {
  date: Date
  amount: number
  isWeekend: boolean
}

export interface CalculationResult {
  accommodation: Accommodation
  nights: number
  nightlyBreakdown: NightlyBreakdownItem[]
  nightlyTotal: number
  cleaningFee: number
  discount: number
  total: number
}
