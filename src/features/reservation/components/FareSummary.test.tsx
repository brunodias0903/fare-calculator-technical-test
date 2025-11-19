import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ACCOMMODATIONS } from '../data/accommodations'
import type { CalculationResult } from '../types'
import { FareSummary } from './FareSummary'

function makeResult(overrides?: Partial<CalculationResult>): CalculationResult {
  const base: CalculationResult = {
    accommodation: ACCOMMODATIONS[0],
    nights: 3,
    nightlyBreakdown: [
      { date: new Date('2025-05-10'), amount: 300, isWeekend: false },
      { date: new Date('2025-05-11'), amount: 360, isWeekend: true },
      { date: new Date('2025-05-12'), amount: 300, isWeekend: false },
    ],
    nightlyTotal: 960,
    cleaningFee: 80,
    discount: 0,
    total: 1040,
  }

  return { ...base, ...overrides }
}

describe('FareSummary', () => {
  it('lists each night and highlights weekends', () => {
    render(<FareSummary result={makeResult()} />)

    expect(screen.getByRole('heading', { name: /Suíte Jardim/ })).toBeVisible()
    expect(screen.getByText('+20% fim de semana')).toBeVisible()
    expect(screen.getByTestId('summary-total')).toHaveTextContent('R$')
  })

  it('shows discount when provided', () => {
    render(<FareSummary result={makeResult({ discount: 100 })} />)
    expect(screen.getByText(/- R\$/)).toBeVisible()
  })

  it('handles single-night stays with singular label', () => {
    render(
      <FareSummary
        result={makeResult({
          nights: 1,
          nightlyBreakdown: [
            { date: new Date('2025-05-10'), amount: 300, isWeekend: false },
          ],
          nightlyTotal: 300,
          total: 380,
        })}
      />,
    )

    expect(screen.getByText(/1 noite/)).toBeVisible()
  })
})
