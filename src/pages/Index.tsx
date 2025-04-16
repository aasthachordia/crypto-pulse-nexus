
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/ui/particle-background";
import TrendingCoins from "@/components/crypto/TrendingCoins";
import SentimentCard from "@/components/crypto/SentimentCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Initial coin data
const initialCoins = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC", price: 62354.23, change24h: 2.34 },
  { id: "ethereum", name: "Ethereum", symbol: "ETH", price: 3456.78, change24h: -1.2 },
  { id: "solana", name: "Solana", symbol: "SOL", price: 142.58, change24h: 5.67 },
  { id: "cardano", name: "Cardano", symbol: "ADA", price: 0.543, change24h: -0.87 },
  { id: "xrp", name: "XRP", symbol: "XRP", price: 0.621, change24h: 1.07 },
  { id: "polkadot", name: "Polkadot", symbol: "DOT", price: 7.85, change24h: -2.13 },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX", price: 35.27, change24h: 3.25 },
  { id: "binancecoin", name: "Binance Coin", symbol: "BNB", price: 562.34, change24h: 0.76 }
];

const generateSentimentData = (days: number) => {
  const data = [];
  const today = new Date();
  let sentiment = Math.random() * 30 + 40; // Start between 40-70
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    
    sentiment = Math.min(95, Math.max(20, sentiment + (Math.random() * 10 - 5)));
    
    data.push({
      date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      sentiment: Math.round(sentiment),
      price: Math.round(Math.random() * 5000 + 45000) / 100, // Simulate price between 450-500
    });
  }
  
  return data;
};

const Index = () => {
  const [selectedCoin, setSelectedCoin] = useState(initialCoins[0]);
  const [sentimentData, setSentimentData] = useState(generateSentimentData(30));
  const [sentimentScore, setSentimentScore] = useState(78);
  const [prediction, setPrediction] = useState<"up" | "down" | "neutral">("up");
  const [sentimentBreakdown, setSentimentBreakdown] = useState({
    positive: 65,
    neutral: 22,
    negative: 13
  });

  useEffect(() => {
    // Simulate loading new data when coin changes
    setSentimentData(generateSentimentData(30));
    
    const newScore = Math.floor(Math.random() * 30 + 50);
    setSentimentScore(newScore);
    
    setPrediction(newScore > 70 ? "up" : newScore < 40 ? "down" : "neutral");
    
    const positive = Math.floor(Math.random() * 30 + 50);
    const negative = Math.floor(Math.random() * 20);
    setSentimentBreakdown({
      positive,
      negative,
      neutral: 100 - positive - negative
    });
  }, [selectedCoin]);

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <div className="mb-8">
          <Select
            value={selectedCoin.id}
            onValueChange={(value) => {
              const coin = initialCoins.find(c => c.id === value);
              if (coin) setSelectedCoin(coin);
            }}
          >
            <SelectTrigger className="w-full md:w-[250px] glassmorphism border-white/10">
              <SelectValue placeholder="Select a coin" />
            </SelectTrigger>
            <SelectContent className="glassmorphism border-white/10 z-50 text-white">
              {initialCoins.map(coin => (
                <SelectItem key={coin.id} value={coin.id}>
                  {coin.name} ({coin.symbol})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <SentimentCard 
            coinName={selectedCoin.name}
            coinSymbol={selectedCoin.symbol}
            sentimentScore={sentimentScore}
            prediction={prediction}
            price={selectedCoin.price}
            change24h={selectedCoin.change24h}
          />
          
          <Card className="md:col-span-2 glassmorphism border-white/10">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-xl">Sentiment Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="sentiment" className="w-full">
                <TabsList className="mb-4 bg-white/10 w-full">
                  <TabsTrigger 
                    value="sentiment" 
                    className="data-[state=active]:bg-crypto-neon-purple/40 data-[state=active]:shadow-none"
                  >
                    Sentiment
                  </TabsTrigger>
                  <TabsTrigger 
                    value="correlation" 
                    className="data-[state=active]:bg-crypto-neon-purple/40 data-[state=active]:shadow-none"
                  >
                    Price Correlation
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="sentiment" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={sentimentData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                      />
                      <YAxis 
                        domain={[0, 100]} 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(17, 24, 39, 0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Line 
                        type="monotone" 
                        dataKey="sentiment" 
                        stroke="rgba(139, 92, 246, 1)" 
                        strokeWidth={3}
                        dot={{ fill: 'rgba(139, 92, 246, 1)', r: 4 }}
                        activeDot={{ r: 6, fill: 'rgba(139, 92, 246, 1)', stroke: 'white', strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </TabsContent>
                
                <TabsContent value="correlation" className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={sentimentData}>
                      <defs>
                        <linearGradient id="sentimentGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgba(139, 92, 246, 0.8)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="rgba(139, 92, 246, 0.1)" stopOpacity={0.1}/>
                        </linearGradient>
                        <linearGradient id="priceGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="rgba(14, 165, 233, 0.8)" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="rgba(14, 165, 233, 0.1)" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                      <XAxis 
                        dataKey="date" 
                        stroke="rgba(255,255,255,0.5)"
                        tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="left"
                        orientation="left"
                        domain={[0, 100]} 
                        stroke="rgba(139, 92, 246, 0.7)"
                        tick={{ fill: 'rgba(139, 92, 246, 0.7)', fontSize: 12 }}
                      />
                      <YAxis 
                        yAxisId="right"
                        orientation="right"
                        domain={['auto', 'auto']} 
                        stroke="rgba(14, 165, 233, 0.7)"
                        tick={{ fill: 'rgba(14, 165, 233, 0.7)', fontSize: 12 }}
                      />
                      <Tooltip 
                        contentStyle={{ 
                          background: 'rgba(17, 24, 39, 0.8)', 
                          border: '1px solid rgba(255,255,255,0.2)',
                          borderRadius: '8px',
                          color: 'white'
                        }} 
                      />
                      <Area 
                        type="monotone" 
                        dataKey="sentiment" 
                        stroke="rgba(139, 92, 246, 1)" 
                        fillOpacity={1}
                        fill="url(#sentimentGradient)"
                        yAxisId="left"
                        strokeWidth={2}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="price" 
                        stroke="rgba(14, 165, 233, 1)" 
                        fillOpacity={1}
                        fill="url(#priceGradient)"
                        yAxisId="right"
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <Card className="glassmorphism border-white/10 h-full">
              <CardHeader>
                <CardTitle className="text-xl">Market Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-6 text-sm text-muted-foreground">
                  Our AI-powered sentiment analysis tracks social media mentions, news articles, and market indicators
                  to gauge market sentiment for {selectedCoin.name}.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Positive Sentiment</div>
                    <div className="text-2xl font-bold text-crypto-positive">{sentimentBreakdown.positive}%</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                      <div 
                        className="bg-crypto-positive h-2 rounded-full" 
                        style={{ width: `${sentimentBreakdown.positive}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Neutral Sentiment</div>
                    <div className="text-2xl font-bold text-crypto-neutral">{sentimentBreakdown.neutral}%</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                      <div 
                        className="bg-crypto-neutral h-2 rounded-full" 
                        style={{ width: `${sentimentBreakdown.neutral}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="text-sm text-muted-foreground mb-1">Negative Sentiment</div>
                    <div className="text-2xl font-bold text-crypto-negative">{sentimentBreakdown.negative}%</div>
                    <div className="w-full h-2 bg-white/10 rounded-full mt-2">
                      <div 
                        className="bg-crypto-negative h-2 rounded-full" 
                        style={{ width: `${sentimentBreakdown.negative}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-muted-foreground">
                  Updated: {new Date().toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <TrendingCoins />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
