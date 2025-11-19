import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'

import { ReservationCalculator } from './ReservationCalculator'

describe('ReservationCalculator', () => {
  const setup = () => {
    const user = userEvent.setup()
    render(<ReservationCalculator />)
    return { user }
  }

  it('shows placeholder before any calculation', () => {
    setup()
    expect(
      screen.getByText(/Informe o período, acomodação e adultos/i),
    ).toBeInTheDocument()
  })

  it('calculates and displays the fare summary for valid data', async () => {
    const { user } = setup()

    await user.selectOptions(screen.getByLabelText(/Acomodação/i), 'suite-jardim')
    await user.type(screen.getByLabelText(/Check-in/i), '2025-06-05')
    await user.type(screen.getByLabelText(/Check-out/i), '2025-06-08')
    await user.clear(screen.getByLabelText(/Adultos/i))
    await user.type(screen.getByLabelText(/Adultos/i), '2')

    await user.click(screen.getByRole('button', { name: /Calcular valor/i }))

    await waitFor(() => {
      expect(screen.getByRole('heading', { name: /Suíte Jardim/ })).toBeVisible()
      expect(screen.getByTestId('summary-total')).toHaveTextContent('R$')
    })
  })

  it('shows an error message when check-out is before check-in', async () => {
    const { user } = setup()

    await user.type(screen.getByLabelText(/Check-out/i), '2025-06-05')
    await user.type(screen.getByLabelText(/Check-in/i), '2025-06-05')
    await user.click(screen.getByRole('button', { name: /Calcular valor/i }))

    await waitFor(() => {
      expect(
        screen.getByText((text) =>
          text.toLowerCase().includes('check-out deve acontecer'),
        ),
      ).toBeVisible()
    })
  })
})
