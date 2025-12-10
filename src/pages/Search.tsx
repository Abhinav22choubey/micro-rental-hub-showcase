import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Search as SearchIcon, 
  MapPin, 
  SlidersHorizontal, 
  Star, 
  Heart,
  X,
  Loader2
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Item {
  id: string;
  title: string;
  price_per_day: number;
  images: string[] | null;
  location: string | null;
  is_available: boolean | null;
  category: string;
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, [selectedCategory]);

  const fetchItems = async () => {
    setLoading(true);
    try {
      let query = supabase.from("items").select("*").eq("is_available", true);
      
      if (selectedCategory) {
        query = query.eq("category", selectedCategory);
      }

      const { data, error } = await query.order("created_at", { ascending: false });
      
      if (error) throw error;
      setItems(data || []);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  };

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

  // Static items for demo when no database items exist
  const demoItems = [
    {
      id: "demo-1",
      title: "Canon EOS 1500D DSLR Camera",
      price_per_day: 500,
      images: ["https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400"],
      location: "2.1 km away",
      is_available: true,
      category: "cameras",
    },
    {
      id: "demo-2",
      title: "Bosch Power Drill Kit",
      price_per_day: 150,
      images: ["https://images.unsplash.com/photo-1504148455328-c376907d081c?w=400"],
      location: "0.8 km away",
      is_available: true,
      category: "tools",
    },
    {
      id: "demo-3",
      title: "Yamaha Acoustic Guitar",
      price_per_day: 200,
      images: ["https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=400"],
      location: "1.5 km away",
      is_available: true,
      category: "music",
    },
    {
      id: "demo-4",
      title: "Epson HD Projector",
      price_per_day: 400,
      images: ["https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400"],
      location: "3.2 km away",
      is_available: false,
      category: "electronics",
    },
    {
      id: "demo-5",
      title: "Coleman Camping Tent (4P)",
      price_per_day: 300,
      images: ["https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400"],
      location: "1.8 km away",
      is_available: true,
      category: "travel",
    },
    {
      id: "demo-6",
      title: "PS5 Console with Controllers",
      price_per_day: 600,
      images: ["https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400"],
      location: "2.5 km away",
      is_available: true,
      category: "electronics",
    },
  ];

  const displayItems = items.length > 0 ? items : demoItems;

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
              <span className="font-semibold text-foreground">{displayItems.length}</span> items found near you
            </p>
            <select className="h-9 rounded-lg border border-input bg-background px-3 text-sm">
              <option>Sort by: Nearest</option>
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Rating</option>
            </select>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-64">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          )}

          {/* Items Grid */}
          {!loading && (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayItems.map((item) => (
                <Link
                  to={item.id.startsWith("demo-") ? "#" : `/item/${item.id}`}
                  key={item.id}
                  className="bg-card rounded-2xl overflow-hidden shadow-card border border-border card-hover group block"
                >
                  {/* Image */}
                  <div className="relative aspect-[4/3] bg-secondary">
                    {item.images?.[0] ? (
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-6xl">📦</div>
                    )}
                    <button 
                      className="absolute top-4 right-4 w-10 h-10 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
                      onClick={(e) => e.preventDefault()}
                    >
                      <Heart className="w-5 h-5" />
                    </button>
                    {!item.is_available && (
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
                      {item.location || "Nearby"}
                      <span className="mx-1">•</span>
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      4.8 (23)
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-foreground">₹{item.price_per_day}</span>
                        <span className="text-muted-foreground">/day</span>
                      </div>
                      <Button variant="default" size="sm" disabled={!item.is_available}>
                        {item.is_available ? "Request" : "Unavailable"}
                      </Button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Search;
