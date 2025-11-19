import type { ReactNode } from 'react'

interface ErrorBannerProps {
  children: ReactNode
}

export function ErrorBanner({ children }: ErrorBannerProps) {
  return (
    <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100 shadow-lg shadow-red-900/20">
      {children}
    </div>
  )
}
