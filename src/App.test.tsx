import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'

describe('App shell', () => {
  it('renders hero headline and calculator placeholder', () => {
    render(<App />)

    expect(
      screen.getByRole('heading', { level: 1, name: /Simule tarifas/i }),
    ).toBeVisible()
    expect(
      screen.getByText(/Informe o período, acomodação e adultos/i),
    ).toBeInTheDocument()
  })
})
