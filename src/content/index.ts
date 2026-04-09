import type { Locale } from "@/i18n/config";
import type { Experience } from "./en/experience";
import type { Project } from "./en/projects";
import type { SkillCategory } from "./en/skills";

export type { Experience, Project, SkillCategory };

export async function getExperience(locale: Locale): Promise<Experience[]> {
  const mod = await import(`./${locale}/experience`);
  return mod.experience;
}

export async function getProjects(locale: Locale): Promise<Project[]> {
  const mod = await import(`./${locale}/projects`);
  return mod.projects;
}

export async function getSkills(locale: Locale): Promise<SkillCategory[]> {
  const mod = await import(`./${locale}/skills`);
  return mod.skills;
}
