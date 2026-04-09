export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  highlights: string[];
}

export const experience: Experience[] = [
  {
    company: "Your Company",
    role: "Your Role",
    period: "2020 — Present",
    description: "Brief description of what you do here.",
    highlights: [
      "Key achievement or responsibility",
      "Another highlight",
    ],
  },
  // Add more entries
];
