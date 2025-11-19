import { ReservationCalculator } from '@/features/reservation'

function App() {
  return (
    <div className="min-h-screen bg-background px-4 py-10 text-slate-100">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:gap-16">
        <header className="rounded-4xl border border-white/10 bg-gradient-to-br from-brand-600/40 via-slate-900 to-slate-950 p-8 shadow-glow sm:p-12">
          <p className="text-xs uppercase tracking-[0.4em] text-brand-200">Hospedin</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Simule tarifas com clareza e confiança
          </h1>
          <p className="mt-4 text-lg text-slate-200 sm:max-w-3xl">
            Compare acomodações, valide mínimas de estadia e visualize acréscimos de fim
            de semana ou descontos de longa permanência em segundos.
          </p>

          <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <dt className="text-sm uppercase tracking-wider text-slate-300">
                Regra automática
              </dt>
              <dd className="text-2xl font-semibold text-white">+20% fins de semana</dd>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <dt className="text-sm uppercase tracking-wider text-slate-300">
                Long stay
              </dt>
              <dd className="text-2xl font-semibold text-white">10% de desconto</dd>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 px-5 py-4">
              <dt className="text-sm uppercase tracking-wider text-slate-300">
                Calcule em
              </dt>
              <dd className="text-2xl font-semibold text-white">1 clique</dd>
            </div>
          </dl>
        </header>

        <ReservationCalculator />
      </div>
    </div>
  )
}

export default App
