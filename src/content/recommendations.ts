export interface Recommendation {
  name: string;
  role: string;
  company: string;
  relationship: string;
  quote: string;
}

export const recommendations: Recommendation[] = [
  {
    name: 'Hjálmar Gíslason',
    role: 'Founder and CEO',
    company: 'GRID',
    relationship: 'Senior to Benedikt at GRID',
    quote:
      "Benni took a lot of things in our product from good to great. He played a key role in several projects that made the product easier to use, easier on the eye and overall more friendly and enjoyable. Always thinking about the user, Benni would often be the one that came up with improvements and tweaks that took the projects he was assigned above and beyond expectations. He repeatedly pushed for changes that improved the product's usability and usefulness and would regularly show up with features and functionality he had taken on on his own initiative, every single time resulting in a better product. Benni is highly productive and a positive, a solution-oriented voice in every conversation and a great team player.",
  },
  {
    name: 'Þorsteinn Yngvi Guðmundsson',
    role: 'Co-founder, VP Operations & Finance',
    company: 'GRID',
    relationship: 'Managed Benedikt directly at GRID',
    quote:
      "Having worked with Benedikt for a year now, I am thrilled to recommend Benedikt as an exceptional software engineer whose hard work, solution-oriented mindset, and quick problem-solving skills truly set him apart. Benedikt has an uncanny ability to tackle complex problems and deliver efficient solutions swiftly, making him an invaluable asset to our team. He brings a wealth of experience in software engineering, having worked for a decade and a half on digital product development within product organizations and agencies. But what truly distinguishes Benedikt is his charisma and sense of humor. He has a knack for lightening the mood and keeping the team's morale high, even in the face of challenging situations. His positive energy is infectious, making him not only a valuable asset to our technical team but also a joy to work with. Benedikt's unique combination of technical expertise, problem-solving skills, and contribution to the team vibe has had a significant impact on our projects. I would choose to work again with Benedikt in a heartbeat, in fact, any team would be fortunate to have him.",
  },
];
