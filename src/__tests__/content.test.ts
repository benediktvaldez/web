import { describe, it, expect } from "vitest";
import { getExperience, getProjects, getSkills } from "@/content";

describe("content loaders", () => {
  describe("getExperience", () => {
    it("returns english experience entries", async () => {
      const experience = await getExperience("en");
      expect(experience.length).toBeGreaterThan(0);
      expect(experience[0]).toHaveProperty("company");
      expect(experience[0]).toHaveProperty("role");
      expect(experience[0]).toHaveProperty("period");
      expect(experience[0]).toHaveProperty("description");
    });

    it("returns icelandic experience entries", async () => {
      const experience = await getExperience("is");
      expect(experience.length).toBeGreaterThan(0);
    });

    it("both locales have same number of entries", async () => {
      const en = await getExperience("en");
      const is = await getExperience("is");
      expect(en.length).toBe(is.length);
    });
  });

  describe("getProjects", () => {
    it("returns english projects", async () => {
      const projects = await getProjects("en");
      expect(projects.length).toBeGreaterThan(0);
      expect(projects[0]).toHaveProperty("slug");
      expect(projects[0]).toHaveProperty("title");
      expect(projects[0]).toHaveProperty("type");
    });

    it("both locales have same number of projects", async () => {
      const en = await getProjects("en");
      const is = await getProjects("is");
      expect(en.length).toBe(is.length);
    });

    it("has both personal and community projects", async () => {
      const projects = await getProjects("en");
      expect(projects.some((p) => p.type === "personal")).toBe(true);
      expect(projects.some((p) => p.type === "community")).toBe(true);
    });
  });

  describe("getSkills", () => {
    it("returns skill categories", async () => {
      const skills = await getSkills("en");
      expect(skills.length).toBeGreaterThan(0);
      expect(skills[0]).toHaveProperty("name");
      expect(skills[0]).toHaveProperty("items");
      expect(skills[0].items.length).toBeGreaterThan(0);
    });

    it("both locales have same number of categories", async () => {
      const en = await getSkills("en");
      const is = await getSkills("is");
      expect(en.length).toBe(is.length);
    });
  });
});
