import { test, expect } from '@playwright/test';
import { config } from '../../../config';

test('should allow a successful api key creation', async ({ page }) => {
	await page.goto(config.adminUiUrl);

	// login
	await page.getByPlaceholder('Username').click();
	await page.getByPlaceholder('Username').fill('darth');
	await page.getByPlaceholder('Password').click();
	await page.getByPlaceholder('Password').fill('deathstar123');
	await page.getByRole('button', { name: 'Login' }).click();

	// navigate to the grid page
	await page.getByRole('link', { name: 'mikro-orm-my-sql' }).click();
	await page.getByRole('link', { name: 'ApiKey' }).click();
	await page.getByRole('button', { name: 'Create New ApiKey' }).click();

	// wait for animation to complete
	await page.waitForTimeout(1000);

	// fill up the page
	await page.getByRole('button', { name: 'Generate Secret and API Key' }).click();

	const apiKey = await page.inputValue('input#key');

	// await page
	// 	.locator('div')
	// 	.filter({ hasText: /^rolesSelect$/ })
	// 	.getByRole('combobox')
	// 	.click();
	// await page.locator('form').getByText('LIGHT_SIDE').click();

	await page.getByRole('button', { name: 'Save' }).click();

	// post-condition: new record found on the grid page
	await expect(await page.getByRole('gridcell', { name: apiKey })).toBeVisible();
});
