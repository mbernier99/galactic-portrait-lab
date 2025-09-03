import { Button } from "@/components/ui/button";
import spaceBackground from "@/assets/space-background.jpg";

interface StartScreenProps {
  onStartQuiz: () => void;
}

export const StartScreen = ({ onStartQuiz }: StartScreenProps) => {
  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${spaceBackground})` }}
    >
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-background/30 backdrop-blur-sm" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main Title */}
        <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-neon bg-clip-text text-transparent animate-pulse">
          STAR WARS
        </h1>
        <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-primary glow-primary">
          Character Generator
        </h2>
        
        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 leading-relaxed">
          Discover which legendary character from a galaxy far, far away matches your personality. 
          <br className="hidden md:block" />
          Take our quiz and get your personalized 80s mall portrait!
        </p>
        
        {/* Call to Action */}
        <div className="space-y-6">
          <Button 
            variant="neon" 
            size="xl"
            onClick={onStartQuiz}
            className="text-2xl py-6 px-12 animate-bounce hover:animate-none"
          >
            Begin Your Journey
          </Button>
          
          <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              ⚡ 10 Quick Questions
            </span>
            <span className="flex items-center gap-2">
              📸 Upload Your Photo
            </span>
            <span className="flex items-center gap-2">
              🎨 Get 80s Portrait
            </span>
          </div>
        </div>
        
        {/* Character Previews */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 opacity-60">
          {["Luke", "Leia", "Han", "Chewy", "Vader"].map((name) => (
            <div key={name} className="text-center">
              <div className="w-16 h-16 mx-auto mb-2 bg-card/50 rounded-full border-2 border-primary/30 flex items-center justify-center text-xs font-semibold">
                {name}
              </div>
              <p className="text-xs text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};