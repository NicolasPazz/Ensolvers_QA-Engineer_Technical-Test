import { test, expect, Page } from '@playwright/test';

const baseURL = 'https://qa-challenge.ensolvers.com';
const user = 'user';
const accessKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6InVzZXIifQ.T2lpTLGczU4Zb98-J9hU2EgjdG7aLwytajV4MhwfdZY';

async function decode(token: string) {
  const payload = token.split('.')[1];
  const decoded = atob(payload);
  return JSON.parse(decoded);
}


async function logIn(page: Page, user: string, password: string) {
  await page.goto(baseURL);
  await page.getByPlaceholder('Username').fill(user);
  await page.getByPlaceholder('Password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
};

const password = await decode(accessKey);

// UC-01: Login
test('UC-01: User login', async ({ page }) => {
  await logIn(page, user, password);
  await expect(page).toHaveURL(baseURL + '/');
  await expect(page.locator('div.alert-success')).toContainText('You are logged in as');
});

// UC-01a: Login with invalid credentials
test('UC-01a: Invalid login attempt', async ({ page }) => {
  await logIn(page, user, "password123");
  await expect(page.locator('.alert-danger')).toBeVisible();
});

// UC-01b: Forgot password with invalid email
test('UC-01b: Forgot password with invalid email', async ({ page }) => {
  await page.goto(baseURL);
  await page.getByText('Did you forget your password?').click();
  await page.getByPlaceholder('Email').fill('invalid-email');
  await page.getByRole('button', { name: 'Reset password' }).click();
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-01c: Forgot password with valid email
test('UC-01c: Forgot password with valid email', async ({ page }) => {
  await page.goto(baseURL);
  await page.getByText('Did you forget your password?').click();
  await page.getByPlaceholder('Email').fill('user@ensolvers.com');
  await page.getByRole('button', { name: 'Reset password' }).click();
  await expect(page.locator('.alert-success')).toBeVisible();
});

// UC-01d: Save Empty Fields in Settings
test('UC-01d: Save empty required fields in settings', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Account').click();
  await page.getByText('Settings').click();
  const nameInput = page.getByPlaceholder('First name');
  await nameInput.fill('');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-01e: Update Profile Successfully
test('UC-01e: Update profile with valid data', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Account').click();
  await page.getByText('Settings').click();
  const nameInput = page.getByPlaceholder('First name');
  await nameInput.fill('UpdatedName');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.alert-success')).toBeVisible();
});

// UC-01f: Update Email with Invalid Format
test('UC-01f: Update email with invalid format', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Account').click();
  await page.getByText('Settings').click();
  const emailInput = page.getByPlaceholder('Email');
  await emailInput.fill('invalid-email');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-01g: User logout
test('UC-01g: Log out', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Account').click();
  await page.getByText('Sign out').click();
  await expect(page).toHaveURL(/.*logout.*/);
});

// UC-03a: Create todo with all fields
test('UC-03a: Create todo with all fields', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByPlaceholder('Add a new task...').fill('New Task');
  await page.getByPlaceholder('Add a new task...').press('Enter');
  await expect(page.getByText('New Task')).toBeVisible();
});

// UC-03b: Create Todo with Incomplete Fields
test('UC-03b: Create todo with incomplete fields', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByPlaceholder('Add a new task...').fill('');
  await page.getByPlaceholder('Add a new task...').press('Enter');
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-03c: View Todo Item
test('UC-03c: View Todo Item', async ({ page }) => {
  await logIn(page, user, password);
  const todo = await page.locator('.todo-item').first();
  await todo.click();
  await expect(page.locator('.modal-title')).toBeVisible();
});

// UC-03d: Edit Todo Item
test('UC-03d: Edit Todo Item', async ({ page }) => {
  await logIn(page, user, password);
  const todo = await page.locator('.todo-item').first();
  await todo.locator('button', { hasText: '✏️' }).click();
  await page.getByPlaceholder('Description').fill('Updated description');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(todo).toContainText('Updated description');
});

// UC-03e: Attempt to Edit Todo ID
test('UC-03e: Attempt to edit todo ID', async ({ page }) => {
  await logIn(page, user, password);
  const todo = await page.locator('.todo-item').first();
  await todo.locator('button', { hasText: '✏️' }).click();
  const idInput = page.locator('input[placeholder="ID"]');
  await idInput.fill('999');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(idInput).not.toHaveValue('999');
});

// UC-03f: Clear Description on Edit and Save
test('UC-03f: Clear description and save', async ({ page }) => {
  await logIn(page, user, password);
  const todo = await page.locator('.todo-item').first();
  await todo.locator('button', { hasText: '✏️' }).click();
  await page.getByPlaceholder('Description').fill('');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-03g: Delete todo item
test('UC-03g: Delete todo item', async ({ page }) => {
  await logIn(page, user, password);
  const deleteBtn = await page.locator('button >> text="🗑️"').first();
  await deleteBtn.click();
  await expect(deleteBtn).not.toBeVisible();
});

// UC-03h: Navigate to Next Page of Todos
test('UC-03h: Next page of Todos', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page).toHaveURL(/.*page=2.*/);
});

// UC-07a: Create folder with name
test('UC-07a: Create folder with name', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByPlaceholder('Add folder...').fill('Test Folder');
  await page.getByPlaceholder('Add folder...').press('Enter');
  await expect(page.getByText('Test Folder')).toBeVisible();
});

// UC-07b: Create folder without name
test('UC-07b: Create folder without name', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByPlaceholder('Add folder...').fill('');
  await page.getByPlaceholder('Add folder...').press('Enter');
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-07c: View folder
test('UC-07c: View folder', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Test Folder').click();
  await expect(page.getByRole('heading', { name: 'To-Do Items' })).toBeVisible();
});

// UC-07d: Edit folder
test('UC-07d: Edit folder', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Test Folder').click();
  await page.getByRole('button', { name: '✏️' }).click();
  const nameInput = page.getByPlaceholder('Name');
  await nameInput.fill('Updated Folder');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Updated Folder')).toBeVisible();
});

// UC-07e: Attempt to edit folder ID
test('UC-07e: Attempt to edit folder ID', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Updated Folder').click();
  await page.getByRole('button', { name: '✏️' }).click();
  const idInput = page.locator('input[readonly]');
  await expect(idInput).toHaveAttribute('readonly', '');
});

// UC-07f: Clear name and save
test('UC-07f: Clear folder name on edit', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Updated Folder').click();
  await page.getByRole('button', { name: '✏️' }).click();
  const nameInput = page.getByPlaceholder('Name');
  await nameInput.fill('');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.locator('.invalid-feedback')).toBeVisible();
});

// UC-07g: Delete folder
test('UC-07g: Delete folder', async ({ page }) => {
  await logIn(page, user, password);
  await page.getByText('Updated Folder').click();
  await page.getByRole('button', { name: '🗑️' }).click();
  await expect(page.getByText('Updated Folder')).not.toBeVisible();
});

// UC-07h: Navigate to next page of folders
test('UC-07h: Next page of folders', async ({ page }) => {
  await logIn(page, user, password);
  await page.goto(baseURL + '/folder?page=1');
  const nextBtn = page.getByRole('link', { name: 'Next' });
  if (await nextBtn.isVisible()) {
    await nextBtn.click();
    await expect(page).toHaveURL(/.*page=2.*/);
  } else {
    test.skip(true, 'Not enough folders to paginate');
  }
});

// UC-UX: Header navigation
test('UC-UX: Header navigation elements exist and function', async ({ page }) => {
  await logIn(page, user, password);

  await expect(page.getByText('Ensolvers QA Challenge')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');

  await page.getByText('Manage Lists').click();
  await expect(page.getByText('To-Do Items')).toBeVisible();
  await expect(page.getByText('Folders')).toBeVisible();

  await page.getByText('Account').click();
  await expect(page.getByText('Settings')).toBeVisible();
  await expect(page.getByText('Sign out')).toBeVisible();
});
