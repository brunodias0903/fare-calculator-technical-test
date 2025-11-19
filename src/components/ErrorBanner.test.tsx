import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import { ErrorBanner } from './ErrorBanner'

describe('ErrorBanner', () => {
  it('renders the message inside a status role container', () => {
    render(<ErrorBanner>Falha</ErrorBanner>)

    expect(screen.getByText('Falha')).toBeVisible()
  })
})
