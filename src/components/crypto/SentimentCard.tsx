
import { ArrowUp, ArrowDown, ArrowRight, TrendingUp, TrendingDown } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface SentimentCardProps {
  coinName: string;
  coinSymbol: string;
  sentimentScore: number;
  prediction: "up" | "down" | "neutral";
  price: number;
  change24h: number;
  className?: string;
}

const SentimentCard = ({
  coinName,
  coinSymbol,
  sentimentScore,
  prediction,
  price,
  change24h,
  className
}: SentimentCardProps) => {
  const getSentimentColor = (score: number, prediction: string) => {
    // Always use prediction color for consistency
    if (prediction === "up") return "text-crypto-positive";
    if (prediction === "down") return "text-crypto-negative";
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

  // Get the appropriate progress bar color based on prediction
  const getProgressBarColor = (prediction: string) => {
    if (prediction === "up") return "bg-crypto-positive";
    if (prediction === "down") return "bg-crypto-negative";
    return "bg-crypto-neutral";
  };

  return (
    <Card className={cn("glassmorphism border border-white/10 overflow-hidden", 
      predictionColors[prediction], 
      className
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
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
        
        <div className="mb-4 p-3 bg-black/20 rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Current Price</span>
            <span className="text-lg font-bold">${price.toLocaleString()}</span>
          </div>
          <div className="flex items-center">
            <span className={`text-sm ${change24h >= 0 ? 'text-crypto-positive' : 'text-crypto-negative'}`}>
              {change24h >= 0 ? (
                <TrendingUp size={16} className="inline mr-1" />
              ) : (
                <TrendingDown size={16} className="inline mr-1" />
              )}
              {change24h >= 0 ? '+' : ''}{change24h}%
            </span>
          </div>
        </div>
        
        <div className="mt-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Sentiment Score</span>
            <span className={`text-lg font-bold ${getSentimentColor(sentimentScore, prediction)}`}>
              {sentimentScore}
            </span>
          </div>
          
          <div className="w-full bg-white/10 rounded-full h-2.5">
            <div 
              className={cn(
                "h-2.5 rounded-full",
                getProgressBarColor(prediction)
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
