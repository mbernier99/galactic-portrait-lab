import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Share2, Download, RotateCcw } from "lucide-react";
import { type Character } from "@/data/characters";
import { getPersonalitySummary } from "@/utils/characterMatcher";

interface ResultScreenProps {
  character: Character;
  userAnswers: Record<string, number>;
  userPhoto: File;
  onRestart: () => void;
}

export const ResultScreen = ({ character, userAnswers, userPhoto, onRestart }: ResultScreenProps) => {
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(true);
  const personalityTraits = getPersonalitySummary(userAnswers);

  useEffect(() => {
    generatePortrait();
  }, []);

  const generatePortrait = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate image generation for now
      // In a real implementation, this would call an AI image generation service
      // combining the user's photo with the character's style
      
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simulate generation time
      
      // For demo purposes, we'll create a placeholder
      const canvas = document.createElement('canvas');
      canvas.width = 512;
      canvas.height = 512;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Create a gradient background
        const gradient = ctx.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#1e40af');
        gradient.addColorStop(0.5, '#7c3aed');
        gradient.addColorStop(1, '#db2777');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 512, 512);
        
        // Add some retro effects
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        for (let i = 0; i < 20; i++) {
          ctx.fillRect(0, i * 25, 512, 1);
        }
        
        // Add character name
        ctx.fillStyle = 'white';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(`${character.name} Portrait`, 256, 256);
        
        ctx.font = '16px Arial';
        ctx.fillText('80s Mall Style', 256, 300);
        
        const imageData = canvas.toDataURL('image/png');
        setGeneratedImage(imageData);
      }
    } catch (error) {
      console.error('Error generating portrait:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.download = `${character.name}-portrait.png`;
      link.href = generatedImage;
      link.click();
    }
  };

  const handleShare = async () => {
    if (generatedImage && navigator.share) {
      try {
        // Convert data URL to blob
        const response = await fetch(generatedImage);
        const blob = await response.blob();
        const file = new File([blob], `${character.name}-portrait.png`, { type: 'image/png' });
        
        await navigator.share({
          title: `I'm ${character.name}!`,
          text: `I took the Star Wars Character Quiz and got matched with ${character.name}! Check out my 80s mall portrait.`,
          files: [file]
        });
      } catch (error) {
        console.error('Error sharing:', error);
        // Fallback to copying link
        navigator.clipboard.writeText(`I'm ${character.name}! Check out my Star Wars character result.`);
        alert('Result copied to clipboard!');
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`I'm ${character.name}! Check out my Star Wars character result.`);
      alert('Result copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center p-6">
      <Card className="w-full max-w-2xl p-8 bg-card/80 backdrop-blur-md border-primary/30">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2 glow-primary">
            You are {character.name}!
          </h1>
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {personalityTraits.map((trait) => (
              <span 
                key={trait}
                className="px-3 py-1 bg-primary/20 text-primary text-sm rounded-full border border-primary/50"
              >
                {trait}
              </span>
            ))}
          </div>
        </div>

        {/* Generated Image */}
        <div className="mb-6 text-center">
          {isGenerating ? (
            <div className="w-full h-64 bg-muted/20 rounded-lg border-2 border-dashed border-primary/50 flex items-center justify-center">
              <div className="text-center">
                <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
                <p className="text-primary font-medium">
                  Generating your 80s mall portrait...
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Combining your likeness with {character.name}
                </p>
              </div>
            </div>
          ) : generatedImage ? (
            <img 
              src={generatedImage} 
              alt={`${character.name} portrait`}
              className="w-full max-w-sm mx-auto rounded-lg border-2 border-primary/50 glow-primary"
            />
          ) : (
            <div className="w-full h-64 bg-muted/20 rounded-lg border-2 border-dashed border-destructive/50 flex items-center justify-center">
              <p className="text-destructive">Failed to generate portrait</p>
            </div>
          )}
        </div>

        {/* Character Description */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3 text-foreground">About Your Character</h3>
          <p className="text-muted-foreground leading-relaxed">
            {character.description}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4 justify-center">
          {!isGenerating && generatedImage && (
            <>
              <Button variant="neon" onClick={handleShare}>
                <Share2 className="w-4 h-4 mr-2" />
                Share Result
              </Button>
              
              <Button variant="retro" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </>
          )}
          
          <Button variant="outline" onClick={onRestart}>
            <RotateCcw className="w-4 h-4 mr-2" />
            Take Quiz Again
          </Button>
        </div>

        {/* Fun Stats */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>
            Character match based on {Object.keys(userAnswers).length} personality questions
          </p>
        </div>
      </Card>
    </div>
  );
};