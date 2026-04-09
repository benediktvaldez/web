export interface Recommendation {
  name: string;
  role: string;
  company: string;
  relationship: string;
  quote: string;
}

export const recommendations: Recommendation[] = [
  // Add recommendations here, e.g.:
  // {
  //   name: "Jane Doe",
  //   role: "Engineering Manager",
  //   company: "GRID",
  //   relationship: "Managed Benedikt at GRID",
  //   quote: "Benedikt is an exceptional developer who...",
  // },
];
