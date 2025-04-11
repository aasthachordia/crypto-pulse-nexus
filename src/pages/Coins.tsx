
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import ParticleBackground from "@/components/ui/particle-background";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { ArrowUpRight, ArrowDownRight, Minus, Search, LayoutGrid, List } from "lucide-react";

// Mock data for crypto coins
const initialCoins = [
  {
    id: "bitcoin",
    symbol: "BTC",
    name: "Bitcoin",
    price: 62354.23,
    change24h: 2.34,
    sentiment: 78,
    prediction: "up"
  },
  {
    id: "ethereum",
    symbol: "ETH",
    name: "Ethereum",
    price: 3456.78,
    change24h: -1.2,
    sentiment: 65,
    prediction: "up"
  },
  {
    id: "solana",
    symbol: "SOL",
    name: "Solana",
    price: 142.58,
    change24h: 5.67,
    sentiment: 82,
    prediction: "up"
  },
  {
    id: "cardano",
    symbol: "ADA",
    name: "Cardano",
    price: 0.543,
    change24h: -0.87,
    sentiment: 48,
    prediction: "down"
  },
  {
    id: "xrp",
    symbol: "XRP",
    name: "XRP",
    price: 0.543,
    change24h: 1.23,
    sentiment: 55,
    prediction: "neutral"
  },
  {
    id: "polkadot",
    symbol: "DOT",
    name: "Polkadot",
    price: 7.32,
    change24h: -2.45,
    sentiment: 42,
    prediction: "down"
  },
  {
    id: "avalanche",
    symbol: "AVAX",
    name: "Avalanche",
    price: 35.78,
    change24h: 3.56,
    sentiment: 75,
    prediction: "up"
  },
  {
    id: "binancecoin",
    symbol: "BNB",
    name: "Binance Coin",
    price: 598.45,
    change24h: 0.34,
    sentiment: 60,
    prediction: "neutral"
  },
  {
    id: "dogecoin",
    symbol: "DOGE",
    name: "Dogecoin",
    price: 0.12,
    change24h: 8.21,
    sentiment: 72,
    prediction: "up"
  },
  {
    id: "litecoin",
    symbol: "LTC",
    name: "Litecoin",
    price: 78.34,
    change24h: -0.54,
    sentiment: 45,
    prediction: "down"
  },
  {
    id: "chainlink",
    symbol: "LINK",
    name: "Chainlink",
    price: 15.87,
    change24h: 2.11,
    sentiment: 68,
    prediction: "up"
  },
  {
    id: "uniswap",
    symbol: "UNI",
    name: "Uniswap",
    price: 7.89,
    change24h: -1.45,
    sentiment: 52,
    prediction: "neutral"
  }
];

const Coins = () => {
  const [view, setView] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price" | "change" | "sentiment">("sentiment");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  
  // Filter coins based on search
  const filteredCoins = initialCoins.filter(coin => 
    coin.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    coin.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Sort coins
  const sortedCoins = [...filteredCoins].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case "name":
        comparison = a.name.localeCompare(b.name);
        break;
      case "price":
        comparison = a.price - b.price;
        break;
      case "change":
        comparison = a.change24h - b.change24h;
        break;
      case "sentiment":
        comparison = a.sentiment - b.sentiment;
        break;
    }
    
    return sortDirection === "asc" ? comparison : -comparison;
  });
  
  // Toggle sort direction when clicking on the same header
  const handleSortChange = (newSortBy: "name" | "price" | "change" | "sentiment") => {
    if (sortBy === newSortBy) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(newSortBy);
      setSortDirection("desc");
    }
  };
  
  // Get sentiment color based on score
  const getSentimentColor = (score: number) => {
    if (score >= 70) return "text-crypto-positive";
    if (score <= 30) return "text-crypto-negative";
    return "text-crypto-neutral";
  };
  
  // Get prediction badge/icon
  const getPredictionBadge = (prediction: string) => {
    switch (prediction) {
      case "up":
        return (
          <div className="flex items-center bg-crypto-positive/20 text-crypto-positive px-2 py-1 rounded text-xs">
            <ArrowUpRight size={12} className="mr-1" />
            Bullish
          </div>
        );
      case "down":
        return (
          <div className="flex items-center bg-crypto-negative/20 text-crypto-negative px-2 py-1 rounded text-xs">
            <ArrowDownRight size={12} className="mr-1" />
            Bearish
          </div>
        );
      default:
        return (
          <div className="flex items-center bg-crypto-neutral/20 text-crypto-neutral px-2 py-1 rounded text-xs">
            <Minus size={12} className="mr-1" />
            Neutral
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen">
      <ParticleBackground />
      <Navbar />
      
      <div className="container mx-auto pt-24 pb-16 px-4">
        <h1 className="text-3xl font-bold mb-8 mt-4 bg-gradient-to-r from-white to-white/70 text-transparent bg-clip-text">
          All Cryptocurrencies
        </h1>
        
        {/* Search and filter controls */}
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <Input 
              placeholder="Search coins..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 glassmorphism border-white/10"
            />
          </div>
          
          <div className="flex gap-2">
            <Tabs defaultValue="all" className="w-[200px]">
              <TabsList className="glassmorphism border-white/10 bg-transparent">
                <TabsTrigger 
                  value="all" 
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="bullish"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  Bullish
                </TabsTrigger>
                <TabsTrigger 
                  value="bearish"
                  className="data-[state=active]:bg-white/10 data-[state=active]:text-white"
                >
                  Bearish
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <div className="flex glassmorphism border-white/10 rounded-md overflow-hidden">
              <button
                onClick={() => setView("grid")}
                className={`p-2 ${view === "grid" ? "bg-white/10" : ""}`}
              >
                <LayoutGrid size={20} />
              </button>
              <button
                onClick={() => setView("list")}
                className={`p-2 ${view === "list" ? "bg-white/10" : ""}`}
              >
                <List size={20} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Grid View */}
        {view === "grid" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedCoins.map(coin => (
              <Card 
                key={coin.id} 
                className={`glassmorphism border-white/10 hover:border-crypto-neon-purple/50 transition-all hover:shadow-neon-glow cursor-pointer`}
              >
                <CardHeader className="flex flex-row items-start justify-between pb-2">
                  <CardTitle className="text-xl">
                    {coin.name}
                    <div className="text-sm font-normal text-muted-foreground mt-1">
                      {coin.symbol}
                    </div>
                  </CardTitle>
                  {getPredictionBadge(coin.prediction)}
                </CardHeader>
                
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold">${coin.price.toLocaleString()}</div>
                    <div className={`flex items-center text-sm ${
                      coin.change24h >= 0 ? "text-crypto-positive" : "text-crypto-negative"
                    }`}>
                      {coin.change24h >= 0 ? (
                        <ArrowUpRight size={16} className="mr-0.5" />
                      ) : (
                        <ArrowDownRight size={16} className="mr-0.5" />
                      )}
                      {Math.abs(coin.change24h)}%
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm">Sentiment Score</span>
                      <span className={`font-medium ${getSentimentColor(coin.sentiment)}`}>
                        {coin.sentiment}
                      </span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          coin.sentiment >= 70 ? "bg-crypto-positive" : 
                          coin.sentiment <= 30 ? "bg-crypto-negative" : 
                          "bg-crypto-neutral"
                        }`}
                        style={{ width: `${coin.sentiment}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <Link to={`/dashboard?coin=${coin.id}`}>
                    <Button className="w-full">View Details</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {/* List View */}
        {view === "list" && (
          <Card className="glassmorphism border-white/10">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-white/10">
                    <th 
                      className="px-4 py-3 text-left cursor-pointer hover:bg-white/5"
                      onClick={() => handleSortChange("name")}
                    >
                      Name
                      {sortBy === "name" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </th>
                    <th 
                      className="px-4 py-3 text-right cursor-pointer hover:bg-white/5"
                      onClick={() => handleSortChange("price")}
                    >
                      Price
                      {sortBy === "price" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </th>
                    <th 
                      className="px-4 py-3 text-right cursor-pointer hover:bg-white/5"
                      onClick={() => handleSortChange("change")}
                    >
                      24h Change
                      {sortBy === "change" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </th>
                    <th 
                      className="px-4 py-3 text-right cursor-pointer hover:bg-white/5"
                      onClick={() => handleSortChange("sentiment")}
                    >
                      Sentiment
                      {sortBy === "sentiment" && (
                        <span className="ml-1">{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </th>
                    <th className="px-4 py-3 text-center">Prediction</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedCoins.map(coin => (
                    <tr 
                      key={coin.id} 
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mr-3">
                            <span className="text-xs font-semibold">{coin.symbol.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{coin.name}</div>
                            <div className="text-xs text-muted-foreground">{coin.symbol}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right font-medium">
                        ${coin.price.toLocaleString()}
                      </td>
                      <td className={`px-4 py-3 text-right ${
                        coin.change24h >= 0 ? "text-crypto-positive" : "text-crypto-negative"
                      }`}>
                        <div className="flex items-center justify-end">
                          {coin.change24h >= 0 ? (
                            <ArrowUpRight size={14} className="mr-1" />
                          ) : (
                            <ArrowDownRight size={14} className="mr-1" />
                          )}
                          {Math.abs(coin.change24h)}%
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end">
                          <div className="w-full max-w-[100px] bg-white/10 rounded-full h-1.5 mr-2">
                            <div 
                              className={`h-1.5 rounded-full ${
                                coin.sentiment >= 70 ? "bg-crypto-positive" : 
                                coin.sentiment <= 30 ? "bg-crypto-negative" : 
                                "bg-crypto-neutral"
                              }`}
                              style={{ width: `${coin.sentiment}%` }}
                            ></div>
                          </div>
                          <span className={`font-medium ${getSentimentColor(coin.sentiment)}`}>
                            {coin.sentiment}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center">
                        {getPredictionBadge(coin.prediction)}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/dashboard?coin=${coin.id}`}>
                          <Button size="sm">View Details</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Coins;
