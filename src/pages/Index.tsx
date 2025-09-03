import { useState } from "react";
import { StartScreen } from "@/components/StartScreen";
import { Quiz } from "@/components/Quiz";
import { SelfieCapture } from "@/components/SelfieCapture";
import { ResultScreen } from "@/components/ResultScreen";
import { matchCharacter } from "@/utils/characterMatcher";
import { type Character } from "@/data/characters";

type AppState = "start" | "quiz" | "selfie" | "result";

const Index = () => {
  const [appState, setAppState] = useState<AppState>("start");
  const [quizAnswers, setQuizAnswers] = useState<Record<string, number>>({});
  const [userPhoto, setUserPhoto] = useState<File | null>(null);
  const [matchedCharacter, setMatchedCharacter] = useState<Character | null>(null);

  const handleStartQuiz = () => {
    setAppState("quiz");
  };

  const handleQuizComplete = (answers: Record<string, number>) => {
    setQuizAnswers(answers);
    setAppState("selfie");
  };

  const handlePhotoCapture = (photo: File) => {
    setUserPhoto(photo);
    const character = matchCharacter(quizAnswers);
    setMatchedCharacter(character);
    // Small delay to show the photo was captured, then proceed
    setTimeout(() => {
      setAppState("result");
    }, 1500);
  };

  const handleRestart = () => {
    setAppState("start");
    setQuizAnswers({});
    setUserPhoto(null);
    setMatchedCharacter(null);
  };

  // Render current screen based on app state
  switch (appState) {
    case "start":
      return <StartScreen onStartQuiz={handleStartQuiz} />;
    
    case "quiz":
      return <Quiz onComplete={handleQuizComplete} />;
    
    case "selfie":
      return <SelfieCapture onPhotoCapture={handlePhotoCapture} />;
    
    case "result":
      return (
        matchedCharacter && userPhoto ? (
          <ResultScreen 
            character={matchedCharacter}
            userAnswers={quizAnswers}
            userPhoto={userPhoto}
            onRestart={handleRestart}
          />
        ) : null
      );
    
    default:
      return <StartScreen onStartQuiz={handleStartQuiz} />;
  }
};

export default Index;
