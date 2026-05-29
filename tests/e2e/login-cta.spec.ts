import { test, expect } from '@playwright/test';

test('home page exposes a Login link pointing to /login', async ({ page }) => {
  await page.goto('/');
  const login = page.getByTestId('nav-login');
  await expect(login).toBeVisible();
  await expect(login).toHaveAttribute('href', '/login');
});

test('Login link is present on a deep page (vegetation)', async ({ page }) => {
  await page.goto('/vegetation');
  const login = page.getByTestId('nav-login');
  await expect(login).toBeVisible();
  await expect(login).toHaveAttribute('href', '/login');
});
