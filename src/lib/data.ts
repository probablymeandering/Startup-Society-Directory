export interface Society {
  id: string;
  name: string;
  population: string;
  income: string;
  footprint: string;
  location: string;
  established: string;
  organizer: string;
  category: string;
  coordinates: [number, number];
  description: string;
}

export const societies: Society[] = [
  {
    id: "1",
    name: "New Tech Society - Europe",
    population: "1.2M",
    income: "$65K avg",
    footprint: "480 sq km",
    location: "Central Europe",
    established: "Mar 10, 2025",
    organizer: "Future Builders",
    category: "Technology",
    coordinates: [10.0, 51.0],
    description: "A forward-thinking society focused on technological innovation and digital infrastructure in the heart of Europe."
  },
  {
    id: "2",
    name: "Eco-Village Collective",
    population: "250K",
    income: "$42K avg",
    footprint: "315 sq km",
    location: "Northern Scandinavia",
    established: "Jun 5, 2024",
    organizer: "Sustainable Future Initiative",
    category: "Sciences",
    coordinates: [15.5, 62.8],
    description: "A sustainable community built on renewable energy and circular economy principles in the Nordic region."
  },
  {
    id: "3",
    name: "Pacific Innovation Hub",
    population: "3.5M",
    income: "$78K avg",
    footprint: "620 sq km",
    location: "Western Pacific",
    established: "Jan 22, 2025",
    organizer: "Pacific Development Group",
    category: "Technology",
    coordinates: [135.0, 35.0],
    description: "A major technology and innovation center focused on AI, robotics, and next-generation computing."
  },
  {
    id: "4",
    name: "New Lagos Community",
    population: "4.8M",
    income: "$35K avg",
    footprint: "890 sq km",
    location: "West Africa",
    established: "Apr 18, 2025",
    organizer: "African Future Collective",
    category: "Politics",
    coordinates: [3.4, 6.5],
    description: "A rapidly growing urban center focused on financial technology and cultural innovation."
  },
  {
    id: "5",
    name: "Andes Agricultural Network",
    population: "780K",
    income: "$38K avg",
    footprint: "1,200 sq km",
    location: "South America",
    established: "Sep 30, 2024",
    organizer: "Sustainable Farming Initiative",
    category: "Sciences",
    coordinates: [-70.0, -18.0],
    description: "An innovative agricultural community focusing on sustainable farming techniques and water conservation."
  },
  {
    id: "6",
    name: "Arctic Research Community",
    population: "45K",
    income: "$92K avg",
    footprint: "120 sq km",
    location: "Northern Canada",
    established: "Dec 12, 2024",
    organizer: "Global Climate Research",
    category: "Sciences",
    coordinates: [-105.0, 75.0],
    description: "A specialized research community focused on climate science and Arctic ecosystem studies."
  },
  {
    id: "7",
    name: "Mediterranean Innovation Corridor",
    population: "2.3M",
    income: "$58K avg",
    footprint: "340 sq km",
    location: "Southern Europe",
    established: "May 15, 2025",
    organizer: "EuroMed Collective",
    category: "Technology",
    coordinates: [12.5, 41.9],
    description: "A cross-border initiative creating new economic and social structures across the Mediterranean region."
  },
  {
    id: "8",
    name: "Oceania Connect",
    population: "1.7M",
    income: "$61K avg",
    footprint: "520 sq km",
    location: "Oceania",
    established: "Feb 8, 2025",
    organizer: "Pacific Unity Council",
    category: "Politics",
    coordinates: [151.2, -33.8],
    description: "A network of connected island communities pioneering new approaches to climate resilience."
  },
  {
    id: "9",
    name: "Himalayan Sustainable Collective",
    population: "320K",
    income: "$28K avg",
    footprint: "280 sq km",
    location: "Central Asia",
    established: "Jul 21, 2024",
    organizer: "Mountain Resilience Initiative",
    category: "Arts",
    coordinates: [85.3, 27.7],
    description: "A high-altitude community developing innovations in sustainable mountain living and conservation."
  },
  {
    id: "10",
    name: "Desert Innovation Zone",
    population: "620K",
    income: "$72K avg",
    footprint: "410 sq km",
    location: "Middle East",
    established: "Nov 3, 2024",
    organizer: "Arid Regions Development",
    category: "Arts",
    coordinates: [55.3, 25.2],
    description: "A cutting-edge society focused on water conservation, solar energy, and desert agriculture technology."
  }
];

export const categories = [
  "All Societies",
  "Arts",
  "Sciences",
  "Technology",
  "Politics"
];

export const regions = [
  "All Regions",
  "Europe",
  "Asia",
  "North America",
  "South America",
  "Africa",
  "Oceania"
];

export const populationFilters = [
  "Any Population",
  "Under 500K",
  "500K - 1M",
  "1M - 5M",
  "Over 5M"
];

export const incomeFilters = [
  "Any Income",
  "Under $30K",
  "$30K - $50K",
  "$50K - $70K",
  "Over $70K"
];
