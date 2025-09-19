import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:9000');
});

test.describe('Boggling', () => {
  test('shows message', async ({ page }) => {
    await page.waitForSelector('boggling', { timeout: 10000 });
    
    
    const messageElement = page.locator('boggling').getByText('Hello World!');
    await expect(messageElement).toBeVisible();
    
    await expect(page.locator('boggling')).toContainText('Hello World!');
    await expect(page).toHaveTitle(/Aurelia/);
  });
});
