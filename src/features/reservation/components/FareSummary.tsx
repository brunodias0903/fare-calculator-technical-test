import { formatCurrency, formatNightLabel } from '@/lib/format'
import type { CalculationResult } from '../types'

interface FareSummaryProps {
  result: CalculationResult
}

export function FareSummary({ result }: FareSummaryProps) {
  const {
    accommodation,
    nights,
    nightlyBreakdown,
    nightlyTotal,
    cleaningFee,
    discount,
    total,
  } = result

  return (
    <section
      className="flex flex-col gap-6"
      aria-live="polite"
      aria-label="Resumo da simulação"
      role="region"
    >
      <header className="space-y-2 border-b border-white/10 pb-4">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-200">Resultado</p>
        <div className="flex flex-col gap-1">
          <h2 className="text-3xl font-semibold text-white">{accommodation.name}</h2>
          <p className="text-base text-slate-300">
            {nights} {nights > 1 ? 'noites' : 'noite'} • taxa de limpeza{' '}
            {formatCurrency(cleaningFee)}
          </p>
        </div>
      </header>

      <div className="rounded-3xl border border-white/10 bg-slate-900/40">
        <div className="flex items-center justify-between border-b border-white/5 px-6 py-4 text-sm uppercase tracking-wider text-slate-400">
          <span>Diárias</span>
          <span>Valor</span>
        </div>
        <ul className="divide-y divide-white/5">
          {nightlyBreakdown.map((item) => (
            <li
              key={item.date.toISOString()}
              className="flex items-center justify-between px-6 py-3"
            >
              <div className="flex items-center gap-3 text-slate-200">
                <span className="font-medium">{formatNightLabel(item.date)}</span>
                {item.isWeekend ? (
                  <span className="rounded-full border border-brand-200/50 px-3 py-1 text-xs font-semibold uppercase text-brand-100">
                    +20% fim de semana
                  </span>
                ) : null}
              </div>
              <span className="text-base font-semibold text-white">
                {formatCurrency(item.amount)}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="space-y-3 rounded-3xl border border-white/10 bg-slate-900/40 p-6">
        <div className="flex items-center justify-between text-slate-300">
          <dt>Subtotal diárias</dt>
          <dd className="font-semibold text-white">{formatCurrency(nightlyTotal)}</dd>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <dt>Taxa de limpeza</dt>
          <dd className="font-semibold text-white" data-testid="summary-cleaning-fee">
            {formatCurrency(cleaningFee)}
          </dd>
        </div>
        <div className="flex items-center justify-between text-slate-300">
          <dt>Desconto longa estadia</dt>
          <dd className="font-semibold text-white">
            {discount ? `- ${formatCurrency(discount)}` : '—'}
          </dd>
        </div>
        <div className="mt-4 flex items-center justify-between rounded-2xl bg-white/10 px-4 py-3 text-lg font-semibold text-white">
          <dt>Total</dt>
          <dd data-testid="summary-total">{formatCurrency(total)}</dd>
        </div>
      </dl>
    </section>
  )
}
