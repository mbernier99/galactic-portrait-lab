export interface QuizQuestion {
  id: string;
  question: string;
  answers: string[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "drive",
    question: "What drives you most in life?",
    answers: ["Loyalty to friends and family", "Knowledge and wisdom", "Freedom and independence", "Order and control"]
  },
  {
    id: "crisis", 
    question: "In a crisis, you typically...",
    answers: ["Negotiate and find peaceful solutions", "Act first and figure it out later", "Gather intelligence before deciding", "Rally others to work together"]
  },
  {
    id: "combat",
    question: "What's your preferred combat style?",
    answers: ["Precision and technique", "Brute force and power", "Trickery and cunning", "Defense and protection"]
  },
  {
    id: "environment", 
    question: "Which environment feels most like home?",
    answers: ["Desert planets", "Forest worlds", "Starships and space", "City-planets"]
  },
  {
    id: "weapon",
    question: "What's your ideal weapon?",
    answers: ["Blue lightsaber", "Green lightsaber", "Blaster pistol", "Bowcaster", "Red lightsaber"]
  },
  {
    id: "conflict",
    question: "When faced with moral conflict, you...", 
    answers: ["Stand firm on your principles", "Adapt and find a way to survive", "Seek compromise and understanding", "Protect those you care about above all"]
  },
  {
    id: "leadership",
    question: "Your leadership style is...",
    answers: ["Give direct commands", "Lead by example", "Work together as equals", "Support others from behind"]
  },
  {
    id: "fear",
    question: "Your greatest fear is...",
    answers: ["Losing loved ones", "Being trapped or controlled", "Personal weakness or failure", "Injustice prevailing"]
  },
  {
    id: "motivation", 
    question: "What motivates you to keep going?",
    answers: ["Helping others in need", "Duty and honor", "Protecting freedom", "Personal gain", "Power and control"]
  },
  {
    id: "legacy",
    question: "How do you want to be remembered?",
    answers: ["As a great leader", "As someone who inspired others", "As someone who lived freely", "As a faithful friend", "As someone feared and respected"]
  }
];