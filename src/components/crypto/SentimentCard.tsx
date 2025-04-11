
import { ArrowUp, ArrowDown, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SentimentCardProps {
  coinName: string;
  coinSymbol: string;
  sentimentScore: number;
  prediction: "up" | "down" | "neutral";
  className?: string;
}

const SentimentCard = ({
  coinName,
  coinSymbol,
  sentimentScore,
  prediction,
  className
}: SentimentCardProps) => {
  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-crypto-positive";
    if (score <= 30) return "text-crypto-negative";
    return "text-crypto-neutral";
  };
  
  const getPredictionIcon = (pred: string) => {
    switch (pred) {
      case "up":
        return <ArrowUp className="text-crypto-positive" />;
      case "down":
        return <ArrowDown className="text-crypto-negative" />;
      default:
        return <ArrowRight className="text-crypto-neutral" />;
    }
  };
  
  const predictionColors = {
    up: "border-crypto-positive/30 bg-crypto-positive/5",
    down: "border-crypto-negative/30 bg-crypto-negative/5",
    neutral: "border-crypto-neutral/30 bg-crypto-neutral/5",
  };

  return (
    <Card className={cn("glassmorphism border border-white/10 overflow-hidden", 
      predictionColors[prediction], 
      className
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{coinName}</h3>
            <p className="text-sm text-muted-foreground">{coinSymbol}</p>
          </div>
          <div className="flex items-center space-x-1">
            {getPredictionIcon(prediction)}
            <span className="text-sm">
              {prediction === "up" ? "Bullish" : prediction === "down" ? "Bearish" : "Neutral"}
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Sentiment Score</span>
            <span className={`text-lg font-bold ${getSentimentColor(sentimentScore)}`}>
              {sentimentScore}
            </span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2.5">
            <div 
              className={cn(
                "h-2.5 rounded-full",
                sentimentScore >= 70 ? "bg-crypto-positive" : 
                sentimentScore <= 30 ? "bg-crypto-negative" : 
                "bg-crypto-neutral"
              )} 
              style={{ width: `${sentimentScore}%` }}
            ></div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="bg-black/20 px-6 py-3 border-t border-white/5">
        <span className="text-xs text-muted-foreground">
          Based on 24h social media analysis
        </span>
      </CardFooter>
    </Card>
  );
};

export default SentimentCard;
