// Import images properly for TypeScript
import eImage from '../assets/e.jpeg';
import dImage from '../assets/d.jpeg';
import fImage from '../assets/f.jpeg';
import gdgImage from '../assets/gdg.jpg';

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
    image: eImage, // Use imported image
    link: "https://gromo.com",
    ariaLabel: "Gromo X AWS Finarva AI 2025 CTO at Gromo"
  },
  {
    title: "SDE Intern",
    role: "@Larsen & Toubro",
    location: "Faridabad, Haryana",
    image: dImage,
    link: "https://www.larsentoubro.com",
    ariaLabel: "SDE Intern at Larsen & Toubro"
  },
  {
    title: "#building in AI",
    role: "@SarvamAI",
    location: "Noida, Uttar Pradesh",
    image: fImage,
    link: "https://sarvam.ai",
    ariaLabel: "Building something creative in AI at SarvamAI"
  },
  {
    title: "Google Cloud Developers Day",
    role: "@GDG Noida",
    location: "Noida, Uttar Pradesh",
    image: gdgImage,
    link: "https://gdg.community.dev/noida/",
    ariaLabel: "Google Cloud Developers Day 2025 at GDG Noida"
  }
];