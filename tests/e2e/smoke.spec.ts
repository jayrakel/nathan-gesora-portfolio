import { test, expect } from '@playwright/test';
import { projects } from '../../src/data/projects';

test('landing page renders key sections', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#hero')).toBeVisible();
  await expect(page.locator('#projects')).toBeVisible();
  await expect(page.locator('#contact')).toBeVisible();
});

test('project slugs are unique', () => {
  // ARCHITECTURE.md §8 edge case — build-time-style guard, not a runtime 404 surprise.
  const slugs = projects.map((p) => p.slug);
  expect(new Set(slugs).size).toBe(slugs.length);
});

test('confidential projects never expose repo or demo links', () => {
  // CLAUDE.md rule 3, currently manual review — this test is the first automation step.
  for (const p of projects) {
    if (p.confidential) {
      expect(p.githubUrl).toBeUndefined();
      expect(p.demoUrl).toBeUndefined();
    }
  }
});
