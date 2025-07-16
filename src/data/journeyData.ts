// Define a type for your journey items for type safety
export interface JourneyItem {
  title: string;
  role: string;
  location: string;
  image: string; // Use 'any' if you're not using a bundler that handles images
  link: string;
  ariaLabel: string;
}

export const journeyData: JourneyItem[] = [
    {
    title: "Gromo X AWS Finarva AI 2025",
    role: "CTO @Gromo",
    location: "Gurugram, Haryana",
    image: '/src/assets/e.jpeg', // Paths should be relative to the public directory or handled by your bundler
    link: "https://gromo.com",
    ariaLabel: "Gromo X AWS Finarva AI 2025 CTO at Gromo"
  },
  {
    title: "SDE Intern",
    role: "@Larsen & Toubro",
    location: "Faridabad, Haryana",
    image: '/src/assets/d.jpeg',
    link: "https://www.larsentoubro.com",
    ariaLabel: "SDE Intern at Larsen & Toubro"
  },
  {
    title: "#building in AI",
    role: "@SarvamAI",
    location: "Noida, Uttar Pradesh",
    image: '/src/assets/f.jpeg',
    link: "https://sarvam.ai",
    ariaLabel: "Building something creative in AI at SarvamAI"
  },
  {
    title: "Google Cloud Developers Day",
    role: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    image: '/src/assets/gdg.jpg',
    link: "https://gdg.community.dev/noida/",
    ariaLabel: "Google Cloud Developers Day 2025 at GDG Noida"
  }
];