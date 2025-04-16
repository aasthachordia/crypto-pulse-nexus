import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/ui/particle-background";
import CryptoTicker from "@/components/crypto/CryptoTicker";
import SentimentCard from "@/components/crypto/SentimentCard";
import TrendingCoins from "@/components/crypto/TrendingCoins";
import SentimentGraph from "@/components/crypto/SentimentGraph";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight } from "lucide-react";

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState("BTC");
  
  // Sample sentiment cards data with prices
  const sentimentCards = [{
    coinName: "Bitcoin",
    coinSymbol: "BTC",
    sentimentScore: 78,
    price: 62354.23,
    prediction: "up" as const
  }, {
    coinName: "Ethereum",
    coinSymbol: "ETH",
    sentimentScore: 65,
    price: 3456.78,
    prediction: "up" as const
  }, {
    coinName: "Cardano",
    coinSymbol: "ADA",
    sentimentScore: 48,
    price: 0.543,
    prediction: "down" as const
  }, {
    coinName: "Solana",
    coinSymbol: "SOL",
    sentimentScore: 82,
    price: 142.58,
    prediction: "up" as const
  }];

  return (
    <div className="min-h-screen w-full">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight bg-gradient-to-r from-crypto-neon-purple via-crypto-neon-blue to-crypto-neon-green text-transparent bg-clip-text">MAAL-X</h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">Sentiments Analysis Price prediction Model</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button className="text-lg px-8 py-6 bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
                View Dashboard
              </Button>
            </Link>
            <Link to="/coins">
              <Button variant="outline" className="text-lg px-8 py-6 border-white/10 hover:bg-white/5">
                Explore Now <ArrowRight className="ml-2" size={18} />
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Ticker */}
      <CryptoTicker />
      
      {/* Sentiment Cards Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
                  Live Sentiment Analysis
                </h2>
                <p className="text-muted-foreground">
                  Our AI analyzes thousands of social media posts and news articles to gauge market sentiment.
                </p>
              </div>
              <Select value={selectedCoin} onValueChange={setSelectedCoin}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select coin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BTC">Bitcoin (BTC)</SelectItem>
                  <SelectItem value="ETH">Ethereum (ETH)</SelectItem>
                  <SelectItem value="SOL">Solana (SOL)</SelectItem>
                  <SelectItem value="ADA">Cardano (ADA)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            {/* Sentiment Graph */}
            <div className="mb-8">
              <SentimentGraph coinSymbol={selectedCoin} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {sentimentCards.map((card, index) => (
              <SentimentCard 
                key={index}
                coinName={card.coinName}
                coinSymbol={card.coinSymbol}
                sentimentScore={card.sentimentScore}
                price={card.price}
                prediction={card.prediction}
                className="transition-transform hover:-translate-y-1"
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 px-4 bg-gradient-radial from-crypto-dark-blue/30 to-transparent">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <TrendingCoins />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
                Make Informed Decisions
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-crypto-neon-purple/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-crypto-neon-purple flex items-center justify-center text-white">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Real-time Sentiment Analysis</h3>
                    <p className="text-muted-foreground">
                      Our AI constantly monitors social media, news, and forums to analyze market sentiment.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-crypto-neon-blue/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-crypto-neon-blue flex items-center justify-center text-white">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Price Predictions</h3>
                    <p className="text-muted-foreground">
                      Get 24-hour and 7-day price forecasts based on historical data and sentiment trends.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-lg bg-crypto-neon-green/20 flex items-center justify-center flex-shrink-0">
                    <div className="w-6 h-6 rounded-full bg-crypto-neon-green flex items-center justify-center text-white">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-1">Advanced Visualizations</h3>
                    <p className="text-muted-foreground">
                      Interactive charts and dashboards to visualize sentiment trends and market movements.
                    </p>
                  </div>
                </div>
                
                <Link to="/dashboard" className="inline-block mt-6">
                  <Button className="px-8 py-6 bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
                    Explore Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="glassmorphism rounded-2xl p-10 border border-white/5 shadow-neon-glow">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue text-transparent bg-clip-text">
              Stay Ahead of the Market
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Get personalized alerts, in-depth analysis, and access to our predictive AI models.
            </p>
            <Button className="px-8 py-6 text-lg bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue hover:opacity-90 transition-opacity">
              Get Started Now
            </Button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-white/5 py-10 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <span className="text-xl font-bold bg-gradient-to-r from-crypto-neon-purple to-crypto-neon-blue text-transparent bg-clip-text">
                MAAL-X
              </span>
              <span className="text-sm text-muted-foreground">© 2025</span>
            </div>
            
            <div className="flex space-x-6">
              <Link to="/" className="text-muted-foreground hover:text-foreground transition">Home</Link>
              <Link to="/dashboard" className="text-muted-foreground hover:text-foreground transition">Dashboard</Link>
              <Link to="/coins" className="text-muted-foreground hover:text-foreground transition">Coins</Link>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">About</a>
              <a href="#" className="text-muted-foreground hover:text-foreground transition">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
