import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Camera, Upload, RotateCcw } from "lucide-react";

interface SelfieCaptureProps {
  onPhotoCapture: (photo: File) => void;
}

export const SelfieCapture = ({ onPhotoCapture }: SelfieCaptureProps) => {
  const [capturedPhoto, setCapturedPhoto] = useState<string | null>(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const startCamera = async () => {
    try {
      setIsCapturing(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "user" } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Unable to access camera. Please use the upload option instead.");
      setIsCapturing(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const ctx = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const photoData = canvas.toDataURL("image/jpeg", 0.8);
        setCapturedPhoto(photoData);
        
        // Convert to file
        canvas.toBlob((blob) => {
          if (blob) {
            const file = new File([blob], "selfie.jpg", { type: "image/jpeg" });
            onPhotoCapture(file);
          }
        }, "image/jpeg", 0.8);
      }

      // Stop camera
      const stream = video.srcObject as MediaStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setIsCapturing(false);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedPhoto(e.target?.result as string);
        onPhotoCapture(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    setIsCapturing(false);
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-space flex items-center justify-center p-6">
      <Card className="w-full max-w-md p-8 bg-card/80 backdrop-blur-md border-primary/30">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-primary mb-2">Capture Your Likeness</h2>
          <p className="text-muted-foreground">
            Take a selfie or upload a photo to complete your transformation
          </p>
        </div>

        {/* Photo Display Area */}
        <div className="mb-6">
          {capturedPhoto ? (
            <div className="relative">
              <img 
                src={capturedPhoto} 
                alt="Captured selfie" 
                className="w-full h-64 object-cover rounded-lg border-2 border-primary/50"
              />
              <Button
                variant="outline"
                size="sm"
                onClick={retakePhoto}
                className="absolute top-2 right-2"
              >
                <RotateCcw className="w-4 h-4" />
              </Button>
            </div>
          ) : isCapturing ? (
            <div className="relative">
              <video 
                ref={videoRef}
                className="w-full h-64 object-cover rounded-lg border-2 border-primary/50"
                autoPlay
                playsInline
                muted
              />
              <Button
                variant="neon"
                onClick={capturePhoto}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2"
              >
                <Camera className="w-4 h-4 mr-2" />
                Capture
              </Button>
            </div>
          ) : (
            <div className="w-full h-64 border-2 border-dashed border-primary/50 rounded-lg flex items-center justify-center bg-muted/20">
              <div className="text-center">
                <Camera className="w-12 h-12 mx-auto mb-4 text-primary" />
                <p className="text-sm text-muted-foreground">
                  Ready to capture your photo
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {!capturedPhoto && (
          <div className="space-y-4">
            <Button
              variant="neon"
              className="w-full"
              onClick={startCamera}
              disabled={isCapturing}
            >
              <Camera className="w-4 h-4 mr-2" />
              {isCapturing ? "Camera Active..." : "Take Selfie"}
            </Button>
            
            <div className="text-center text-sm text-muted-foreground">or</div>
            
            <Button
              variant="outline"
              className="w-full"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Upload Photo
            </Button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {capturedPhoto && (
          <div className="text-center">
            <p className="text-sm text-primary font-medium">
              Perfect! Your photo has been captured. 
              <br />
              Proceeding to generate your character portrait...
            </p>
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </Card>
    </div>
  );
};