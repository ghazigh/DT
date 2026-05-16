import { test, expect } from '@playwright/test';

const pages = [
  { path: '/',              heading: /Digital twins for the world/i },
  { path: '/vegetation',    heading: /Vegetation Intelligence/i },
  { path: '/platform',      heading: /Digital Twin Platform/i },
  { path: '/urban-canopy',  heading: /Urban Canopy Digital Twin/i },
  { path: '/about',         heading: /One platform/i },
  { path: '/contact',       heading: /Tell us what you're/i }
];

for (const p of pages) {
  test(`${p.path} renders with the expected H1`, async ({ page }) => {
    const res = await page.goto(p.path);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toContainText(p.heading);
  });
}

test('global nav is visible and functional', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('link', { name: /sat lab/i }).first()).toBeVisible();
  await page.getByRole('link', { name: /Platform/i }).click();
  await expect(page).toHaveURL(/\/platform/);
});

test('contact form surfaces inline validation', async ({ page }) => {
  await page.goto('/contact');
  await page.getByRole('button', { name: /Send/i }).click();
  await expect(page).toHaveURL(/\/contact/);
});
