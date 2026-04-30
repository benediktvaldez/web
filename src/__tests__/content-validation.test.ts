import { describe, it, expect } from 'vitest';
import { getExperience, getProjects, getSkills } from '@/content';
import { recommendations } from '@/content/recommendations';
import type { Locale } from '@/i18n/config';
import { locales } from '@/i18n/config';

describe('content validation', () => {
  for (const locale of locales) {
    describe(`${locale} experience`, () => {
      it('all entries have non-empty required fields', async () => {
        const experience = await getExperience(locale as Locale);
        for (const entry of experience) {
          expect(entry.company, `empty company in ${locale}`).toBeTruthy();
          expect(entry.role, `empty role in ${locale}`).toBeTruthy();
          expect(entry.period, `empty period in ${locale}`).toBeTruthy();
          expect(entry.description, `empty description in ${locale}`).toBeTruthy();
        }
      });
    });

    describe(`${locale} projects`, () => {
      it('all entries have non-empty required fields', async () => {
        const projects = await getProjects(locale as Locale);
        for (const project of projects) {
          expect(project.slug, `empty slug in ${locale}`).toBeTruthy();
          expect(project.title, `empty title in ${locale}`).toBeTruthy();
          expect(project.description, `empty description in ${locale}`).toBeTruthy();
          expect(project.type, `empty type in ${locale}`).toMatch(/^(personal|community)$/);
          expect(project.tags.length, `no tags for ${project.slug} in ${locale}`).toBeGreaterThan(
            0,
          );
        }
      });

      it('all URLs are valid format', async () => {
        const projects = await getProjects(locale as Locale);
        for (const project of projects) {
          if (project.url) {
            expect(project.url).toMatch(/^https:\/\//);
          }
          if (project.repo) {
            expect(project.repo).toMatch(/^https:\/\//);
          }
        }
      });
    });

    describe(`${locale} skills`, () => {
      it('all categories have non-empty items', async () => {
        const skills = await getSkills(locale as Locale);
        for (const category of skills) {
          expect(category.name, `empty category name in ${locale}`).toBeTruthy();
          expect(category.items.length, `no items in ${category.name} (${locale})`).toBeGreaterThan(
            0,
          );
        }
      });
    });
  }

  describe('recommendations', () => {
    it('all entries have non-empty required fields', () => {
      for (const rec of recommendations) {
        expect(rec.name).toBeTruthy();
        expect(rec.role).toBeTruthy();
        expect(rec.company).toBeTruthy();
        expect(rec.quote).toBeTruthy();
        expect(rec.quote.length).toBeGreaterThan(50);
      }
    });
  });
});
