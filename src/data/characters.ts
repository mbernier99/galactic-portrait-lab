export interface Character {
  id: string;
  name: string;
  description: string;
  traits: Record<string, number>; // question_id -> preferred_answer_index
  image: string;
  style: string;
}

export const characters: Character[] = [
  {
    id: "luke",
    name: "Luke Skywalker",
    description: "The hopeful Jedi Knight who believes in the power of good and the Force. You're optimistic, brave, and always willing to help others, even at personal cost.",
    traits: {
      "drive": 0, // Loyalty
      "crisis": 1, // Act first
      "combat": 0, // Precision
      "environment": 0, // Desert
      "weapon": 0, // Blue lightsaber
      "conflict": 2, // Find compromise
      "leadership": 1, // Lead by example
      "fear": 0, // Losing loved ones
      "motivation": 0, // Help others
      "legacy": 1, // Inspiring others
    },
    image: "/images/luke-skywalker.jpg",
    style: "Jedi robes, blue lightsaber glow, desert backdrop"
  },
  {
    id: "leia", 
    name: "Princess Leia Organa",
    description: "The fearless leader and diplomat. You're intelligent, strong-willed, and natural born leader who fights for justice and freedom.",
    traits: {
      "drive": 2, // Freedom
      "crisis": 2, // Gather intel
      "combat": 3, // Defense
      "environment": 3, // City-planet
      "weapon": 2, // Blaster
      "conflict": 0, // Stand firm
      "leadership": 0, // Direct commands
      "fear": 3, // Injustice prevailing
      "motivation": 2, // Protect freedom
      "legacy": 0, // Remembered as leader
    },
    image: "/images/leia-organa.jpg", 
    style: "Royal dress, confident pose, city-planet background"
  },
  {
    id: "han",
    name: "Han Solo", 
    description: "The charming smuggler with a heart of gold. You're independent, witty, and prefer to make your own rules while secretly caring deeply for your friends.",
    traits: {
      "drive": 2, // Freedom
      "crisis": 1, // Act first
      "combat": 2, // Trickery
      "environment": 2, // Starship
      "weapon": 2, // Blaster
      "conflict": 1, // Adapt and survive
      "leadership": 2, // Work together
      "fear": 1, // Being trapped
      "motivation": 3, // Personal gain
      "legacy": 2, // Living freely
    },
    image: "/images/han-solo.jpg",
    style: "Smuggler outfit, confident smirk, starship cockpit"
  },
  {
    id: "chewbacca",
    name: "Chewbacca",
    description: "The loyal Wookiee warrior and faithful friend. You're incredibly loyal, protective of those you care about, and have a strong sense of honor.",
    traits: {
      "drive": 0, // Loyalty  
      "crisis": 3, // Rally allies
      "combat": 1, // Brute force
      "environment": 1, // Forest
      "weapon": 3, // Bowcaster
      "conflict": 3, // Protect friends
      "leadership": 3, // Support others
      "fear": 0, // Losing loved ones
      "motivation": 1, // Honor duty
      "legacy": 3, // Faithful friend
    },
    image: "/images/chewbacca.jpg",
    style: "Wookiee fur texture, bowcaster, forest setting"
  },
  {
    id: "vader",
    name: "Darth Vader",
    description: "The powerful Sith Lord driven by passion and control. You're ambitious, decisive, and believe that order and strength are necessary to achieve your goals.",
    traits: {
      "drive": 3, // Order
      "crisis": 1, // Act first
      "combat": 1, // Brute force
      "environment": 2, // Starship
      "weapon": 4, // Red lightsaber
      "conflict": 0, // Stand firm
      "leadership": 0, // Direct commands
      "fear": 2, // Weakness/failure
      "motivation": 4, // Power/control
      "legacy": 4, // Feared and respected
    },
    image: "/images/darth-vader.jpg",
    style: "Dark armor, red lightsaber glow, Imperial ship background"
  }
];