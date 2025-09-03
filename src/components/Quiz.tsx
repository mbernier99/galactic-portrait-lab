import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { quizQuestions, type QuizQuestion } from "@/data/questions";

interface QuizProps {
  onComplete: (answers: Record<string, number>) => void;
}

export const Quiz = ({ onComplete }: QuizProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;

  const handleAnswer = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer === null) return;

    const newAnswers = {
      ...answers,
      [question.id]: selectedAnswer
    };
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      onComplete(newAnswers);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[quizQuestions[currentQuestion - 1].id] ?? null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-8 bg-card/80 backdrop-blur-md border-primary/30">
        {/* Header */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-primary">Character Assessment</h2>
            <span className="text-sm text-muted-foreground">
              {currentQuestion + 1} of {quizQuestions.length}
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Question */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold mb-6 text-foreground leading-relaxed">
            {question.question}
          </h3>
          
          {/* Answer Options */}
          <div className="space-y-3">
            {question.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(index)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedAnswer === index
                    ? "border-primary bg-primary/20 text-primary glow-primary"
                    : "border-border bg-card/50 hover:border-primary/50 hover:bg-primary/10"
                }`}
              >
                <span className="font-medium">{answer}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          
          <Button
            variant="neon"
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === quizQuestions.length - 1 ? "Complete Quiz" : "Next"}
          </Button>
        </div>
      </Card>
    </div>
  );
};