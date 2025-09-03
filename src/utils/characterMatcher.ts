import { characters, type Character } from "@/data/characters";
import { quizQuestions } from "@/data/questions";

export const matchCharacter = (answers: Record<string, number>): Character => {
  let bestMatch = characters[0];
  let bestScore = -1;

  // Calculate match score for each character
  for (const character of characters) {
    let score = 0;
    let totalQuestions = 0;

    // Compare user answers with character traits
    for (const questionId in answers) {
      if (character.traits[questionId] !== undefined) {
        totalQuestions++;
        const userAnswer = answers[questionId];
        const characterPreference = character.traits[questionId];
        
        // Give full points for exact match, partial points for close matches
        if (userAnswer === characterPreference) {
          score += 3;
        } else if (Math.abs(userAnswer - characterPreference) === 1) {
          score += 2;
        } else if (Math.abs(userAnswer - characterPreference) === 2) {
          score += 1;
        }
        // No points for answers that are 3+ away
      }
    }

    // Calculate percentage score
    const percentageScore = totalQuestions > 0 ? score / (totalQuestions * 3) : 0;
    
    if (percentageScore > bestScore) {
      bestScore = percentageScore;
      bestMatch = character;
    }
  }

  return bestMatch;
};

// Helper function to get a summary of user's personality based on answers
export const getPersonalitySummary = (answers: Record<string, number>): string[] => {
  const traits: string[] = [];

  // Analyze answers to provide personality insights
  if (answers.drive === 0) traits.push("Loyal");
  if (answers.drive === 1) traits.push("Wise"); 
  if (answers.drive === 2) traits.push("Independent");
  if (answers.drive === 3) traits.push("Organized");

  if (answers.crisis === 0) traits.push("Diplomatic");
  if (answers.crisis === 1) traits.push("Action-oriented");
  if (answers.crisis === 2) traits.push("Strategic");
  if (answers.crisis === 3) traits.push("Collaborative");

  if (answers.combat === 0) traits.push("Precise");
  if (answers.combat === 1) traits.push("Powerful");
  if (answers.combat === 2) traits.push("Cunning");
  if (answers.combat === 3) traits.push("Protective");

  return traits.slice(0, 4); // Return top 4 traits
};