const currency = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' })
const dateFormatter = new Intl.DateTimeFormat('pt-BR', {
  weekday: 'short',
  day: '2-digit',
  month: 'short',
})

export function formatCurrency(value: number) {
  return currency.format(value)
}

export function formatNightLabel(date: Date) {
  return dateFormatter.format(date)
}
