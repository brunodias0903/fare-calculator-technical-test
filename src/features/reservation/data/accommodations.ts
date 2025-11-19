export type AccommodationId = 'suite-jardim' | 'chale-familia'

export interface Accommodation {
  id: AccommodationId
  name: string
  baseRate: number
  minNights: number
  cleaningFee: number
}

export const ACCOMMODATIONS: Accommodation[] = [
  {
    id: 'suite-jardim',
    name: 'Suíte Jardim',
    baseRate: 300,
    minNights: 2,
    cleaningFee: 80,
  },
  {
    id: 'chale-familia',
    name: 'Chalé Família',
    baseRate: 450,
    minNights: 2,
    cleaningFee: 100,
  },
]

export const accommodationMap: Record<AccommodationId, Accommodation> =
  ACCOMMODATIONS.reduce(
    (acc, accommodation) => {
      acc[accommodation.id] = accommodation
      return acc
    },
    {} as Record<AccommodationId, Accommodation>,
  )
