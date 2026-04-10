import { describe, it, expect } from "vitest";
import {
  locales,
  defaultLocale,
  getLocalizedSlug,
  getEnglishSlug,
  getLocalizedPath,
  slugMap,
  reverseSlugMap,
} from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import is from "@/i18n/dictionaries/is";

describe("i18n config", () => {
  it("has en and is locales", () => {
    expect(locales).toContain("en");
    expect(locales).toContain("is");
  });

  it("defaults to en", () => {
    expect(defaultLocale).toBe("en");
  });

  it("slug maps are symmetric", () => {
    for (const locale of Object.keys(slugMap)) {
      for (const [english, localized] of Object.entries(slugMap[locale])) {
        expect(reverseSlugMap[locale][localized]).toBe(english);
      }
    }
  });
});

describe("getLocalizedSlug", () => {
  it("returns english slug unchanged for en locale", () => {
    expect(getLocalizedSlug("about", "en")).toBe("about");
    expect(getLocalizedSlug("projects", "en")).toBe("projects");
  });

  it("translates slugs for is locale", () => {
    expect(getLocalizedSlug("about", "is")).toBe("um");
    expect(getLocalizedSlug("projects", "is")).toBe("verkefni");
    expect(getLocalizedSlug("thoughts", "is")).toBe("hugleidingar");
    expect(getLocalizedSlug("resume", "is")).toBe("ferilskra");
  });

  it("returns slug unchanged if no mapping exists", () => {
    expect(getLocalizedSlug("unknown", "is")).toBe("unknown");
  });
});

describe("getEnglishSlug", () => {
  it("returns slug unchanged for en locale", () => {
    expect(getEnglishSlug("about", "en")).toBe("about");
  });

  it("maps icelandic slugs back to english", () => {
    expect(getEnglishSlug("um", "is")).toBe("about");
    expect(getEnglishSlug("verkefni", "is")).toBe("projects");
    expect(getEnglishSlug("hugleidingar", "is")).toBe("thoughts");
    expect(getEnglishSlug("ferilskra", "is")).toBe("resume");
  });
});

describe("getLocalizedPath", () => {
  it("switches locale on root path", () => {
    expect(getLocalizedPath("/en", "is")).toBe("/is");
    expect(getLocalizedPath("/is", "en")).toBe("/en");
  });

  it("translates page slugs when switching locale", () => {
    expect(getLocalizedPath("/en/about", "is")).toBe("/is/um");
    expect(getLocalizedPath("/is/um", "en")).toBe("/en/about");
  });

  it("preserves sub-paths like blog slugs", () => {
    expect(getLocalizedPath("/en/thoughts/hello-world", "is")).toBe(
      "/is/hugleidingar/hello-world",
    );
    expect(getLocalizedPath("/is/hugleidingar/hello-world", "en")).toBe(
      "/en/thoughts/hello-world",
    );
  });
});

describe("dictionary completeness", () => {
  it("icelandic dictionary has all keys from english", () => {
    const checkKeys = (enObj: Record<string, unknown>, isObj: Record<string, unknown>, path = "") => {
      for (const key of Object.keys(enObj)) {
        const fullPath = path ? `${path}.${key}` : key;
        expect(isObj, `missing key: ${fullPath}`).toHaveProperty(key);
        if (typeof enObj[key] === "object" && enObj[key] !== null && !Array.isArray(enObj[key])) {
          checkKeys(
            enObj[key] as Record<string, unknown>,
            isObj[key] as Record<string, unknown>,
            fullPath,
          );
        }
      }
    };
    checkKeys(en as unknown as Record<string, unknown>, is as unknown as Record<string, unknown>);
  });
});
