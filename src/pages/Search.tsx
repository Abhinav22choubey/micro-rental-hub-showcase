import { useState } from "react";
import Navbar from "@/components/landing/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search as SearchIcon, 
  MapPin, 
  SlidersHorizontal, 
  Star, 
  Heart,
  X 
} from "lucide-react";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = [
    { id: "electronics", label: "Electronics", emoji: "💻" },
    { id: "tools", label: "Tools", emoji: "🔧" },
    { id: "cameras", label: "Cameras", emoji: "📷" },
    { id: "music", label: "Music", emoji: "🎸" },
    { id: "sports", label: "Sports", emoji: "⚽" },
    { id: "travel", label: "Travel", emoji: "🧳" },
    { id: "party", label: "Party", emoji: "🎉" },
    { id: "kitchen", label: "Kitchen", emoji: "🍳" },
  ];

  const items = [
    {
      id: 1,
      title: "Canon EOS 1500D DSLR Camera",
      price: 500,
      image: "📷",
      distance: "2.1 km",
      rating: 4.8,
      reviews: 23,
      owner: "Priya S.",
      available: true,
    },
    {
      id: 2,
      title: "Bosch Power Drill Kit",
      price: 150,
      image: "🔧",
      distance: "0.8 km",
      rating: 4.9,
      reviews: 45,
      owner: "Amit K.",
      available: true,
    },
    {
      id: 3,
      title: "Yamaha Acoustic Guitar",
      price: 200,
      image: "🎸",
      distance: "1.5 km",
      rating: 4.7,
      reviews: 18,
      owner: "Rahul V.",
      available: true,
    },
    {
      id: 4,
      title: "Epson HD Projector",
      price: 400,
      image: "📽️",
      distance: "3.2 km",
      rating: 4.6,
      reviews: 31,
      owner: "Sneha R.",
      available: false,
    },
    {
      id: 5,
      title: "Coleman Camping Tent (4P)",
      price: 300,
      image: "⛺",
      distance: "1.8 km",
      rating: 4.9,
      reviews: 27,
      owner: "Vikram M.",
      available: true,
    },
    {
      id: 6,
      title: "PS5 Console with Controllers",
      price: 600,
      image: "🎮",
      distance: "2.5 km",
      rating: 5.0,
      reviews: 12,
      owner: "Arjun P.",
      available: true,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Search Header */}
          <div className="max-w-3xl mx-auto mb-8">
            <h1 className="text-3xl font-bold text-foreground text-center mb-6">
              Find What You Need
            </h1>
            
            {/* Search Bar */}
            <div className="flex gap-3">
              <div className="relative flex-1">
                <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Search for cameras, tools, instruments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-14 pl-12 pr-4 text-lg rounded-xl"
                />
              </div>
              <Button
                variant="outline"
                size="lg"
                className="h-14 px-4"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
              <Button variant="hero" size="lg" className="h-14 px-8">
                Search
              </Button>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">Searching near Koramangala, Bangalore</span>
              <button className="text-primary text-sm font-medium hover:underline">Change</button>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat.id
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-card text-foreground border border-border hover:border-primary"
                }`}
              >
                <span>{cat.emoji}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="bg-card rounded-2xl p-6 mb-8 shadow-card border border-border animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">Filters</h3>
                <button onClick={() => setShowFilters(false)} className="text-muted-foreground hover:text-foreground">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Price Range</label>
                  <div className="flex gap-2">
                    <Input placeholder="Min ₹" className="h-10" />
                    <Input placeholder="Max ₹" className="h-10" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Distance</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option>Within 2 km</option>
                    <option>Within 5 km</option>
                    <option>Within 10 km</option>
                    <option>Any distance</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Availability</label>
                  <select className="w-full h-10 rounded-lg border border-input bg-background px-3 text-sm">
                    <option>Available Now</option>
                    <option>All Items</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-muted-foreground">
              <span className="font-semibold text-foreground">{items.length}</span> items found near you
            </p>
            <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
              <option>Sort by: Nearest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Rating</option>
            </select>
          </div>

          {/* Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="bg-card rounded-2xl overflow-hidden shadow-card border border-border card-hover group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] bg-secondary flex items-center justify-center">
                  <span className="text-6xl">{item.image}</span>
                  <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                    <Heart className="w-5 h-5" />
                  </button>
                  {!item.available && (
                    <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                      <span className="px-4 py-2 bg-card rounded-full text-sm font-semibold text-foreground">
                        Currently Rented
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <h3 className="font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4" />
                    {item.distance}
                    <span className="mx-1">•</span>
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    {item.rating} ({item.reviews})
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-foreground">₹{item.price}</span>
                      <span className="text-muted-foreground">/day</span>
                    </div>
                    <Button variant="default" size="sm" disabled={!item.available}>
                      {item.available ? "Request" : "Unavailable"}
                    </Button>
                  </div>

                  <div className="mt-3 pt-3 border-t border-border flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                      {item.owner.charAt(0)}
                    </div>
                    <span className="text-sm text-muted-foreground">{item.owner}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Search;
