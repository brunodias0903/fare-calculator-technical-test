import { describe, expect, it } from 'vitest'

import { formatCurrency, formatNightLabel } from './format'

describe('format helpers', () => {
  it('formats currency using BRL locale', () => {
    expect(formatCurrency(1500)).toBe('R$\u00a01.500,00')
  })

  it('formats a night label with weekday and date', () => {
    const label = formatNightLabel(new Date('2025-01-05T00:00:00Z'))
    expect(label).toMatch(/\d{2}/)
  })
})
