import { expect, test } from '@playwright/test'

test.describe('Reservation calculator', () => {
  test('allows the user to calculate a stay end-to-end', async ({ page }) => {
    await page.goto('/')

    await expect(
      page.getByRole('heading', { level: 1, name: /Simule tarifas/i }),
    ).toBeVisible()

    await page.getByLabel('Check-in').fill('2025-06-02')
    await page.getByLabel('Check-out').fill('2025-06-05')
    await page.getByLabel('Adultos').fill('2')
    await page.getByRole('button', { name: 'Calcular valor da estadia' }).click()

    await expect(
      page.getByRole('heading', { level: 2, name: 'Suíte Jardim' }),
    ).toBeVisible()

    const summary = page.getByRole('region', { name: /Resumo da simulação/i })
    await expect(summary.getByText(/3 noites/i)).toBeVisible()
    await expect(summary.locator('ul li')).toHaveCount(3)
    await expect(summary.getByTestId('summary-cleaning-fee')).toContainText('R$')
    await expect(summary.getByTestId('summary-total')).toContainText('R$')
  })
})
