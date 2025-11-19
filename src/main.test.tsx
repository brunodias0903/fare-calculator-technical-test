import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('react-dom/client', async () => {
  const actual =
    await vi.importActual<typeof import('react-dom/client')>('react-dom/client')
  return {
    ...actual,
    createRoot: vi.fn(() => ({ render: vi.fn() })),
  }
})

describe('main entrypoint', () => {
  beforeEach(() => {
    vi.resetModules()
    document.body.innerHTML = '<div id="root"></div>'
  })

  it('bootstraps the React application', async () => {
    await import('./main')
    const { createRoot } = await import('react-dom/client')
    expect(createRoot).toHaveBeenCalled()
  })
})
