export type Property = {
  slug: string;
  title: string;
  type: string;
  location: string;
  size: string;
  price: string;
  description: string;
  image: string;
  features: string[];
};

export const properties: Property[] = [
  {
    slug: "investment-packages-diaspora-groups",
    title: "Investment Packages for Diaspora & Groups",
    type: "Investment Package",
    location: "Kenya",
    size: "Flexible package",
    price: "KSh 6,500,000",
    description: "A practical investment path for diaspora buyers, families and groups looking to build a secure property portfolio in Kenya.",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1600&q=85",
    features: ["Guided investment planning", "Flexible payment options", "Genuine title documentation", "Trusted customer support"],
  },
  {
    slug: "house-construction-packages",
    title: "House Construction Packages",
    type: "Residential Home",
    location: "Kenya",
    size: "Modern home package",
    price: "KSh 35,000",
    description: "Well-planned construction packages for customers ready to turn a clear plan and a good piece of land into a modern home.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
    features: ["Contemporary designs", "Premium materials", "Guided construction process", "Quality-focused delivery"],
  },
  {
    slug: "commercial-plots",
    title: "Commercial Plots",
    type: "Commercial Plot",
    location: "Thika Superhighway",
    size: "Serviced plots",
    price: "KSh 10,000,000",
    description: "Commercial opportunities in high-potential locations along the Thika Superhighway corridor, selected for access and long-term growth.",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
    features: ["Prime accessible locations", "Water and electricity access", "Road access", "Commercial development potential"],
  },
  {
    slug: "residential-plots",
    title: "Residential Plots in Controlled Developments",
    type: "Residential Plot",
    location: "Juja",
    size: "50 x 100 ft",
    price: "KSh 3,000,000",
    description: "Secure residential plots in controlled developments for families who want room to build, grow and belong.",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85",
    features: ["Freehold title deed", "Controlled development", "Water and electricity access", "Flexible payment plan"],
  },
  {
    slug: "residential-homes",
    title: "Residential Homes for Sale",
    type: "Residential Home",
    location: "Ngoingwa, Thika",
    size: "Modern family home",
    price: "KSh 6,500,000",
    description: "State-of-the-art modern homes in secure, well-planned communities, designed for comfort and everyday family life.",
    image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1600&q=85",
    features: ["Secure gated community", "Modern finishes", "Ready for occupancy", "Accessible neighbourhood"],
  },
];