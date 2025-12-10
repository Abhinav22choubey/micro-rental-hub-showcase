import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { 
  Package, 
  PlusCircle, 
  Edit, 
  Trash2, 
  Eye, 
  ToggleLeft, 
  ToggleRight,
  Loader2,
  MapPin,
  IndianRupee
} from "lucide-react";
import { toast } from "sonner";

interface Item {
  id: string;
  title: string;
  description: string | null;
  category: string;
  price_per_day: number;
  images: string[];
  location: string | null;
  is_available: boolean;
  created_at: string;
}

const MyItems = () => {
  const { user } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from("items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Failed to load items");
    } else {
      setItems(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchItems();
  }, [user]);

  const toggleAvailability = async (id: string, currentStatus: boolean) => {
    const { error } = await supabase
      .from("items")
      .update({ is_available: !currentStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update availability");
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, is_available: !currentStatus } : item
      ));
      toast.success(`Item ${!currentStatus ? "available" : "unavailable"} now`);
    }
  };

  const deleteItem = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    const { error } = await supabase
      .from("items")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Failed to delete item");
    } else {
      setItems(items.filter(item => item.id !== id));
      toast.success("Item deleted successfully");
    }
  };

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "electronics": "bg-blue-500/10 text-blue-600",
      "tools": "bg-orange-500/10 text-orange-600",
      "travel": "bg-purple-500/10 text-purple-600",
      "kitchen": "bg-green-500/10 text-green-600",
      "sports": "bg-red-500/10 text-red-600",
      "music": "bg-pink-500/10 text-pink-600",
      "other": "bg-gray-500/10 text-gray-600",
    };
    return colors[category.toLowerCase()] || colors.other;
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl lg:text-3xl font-bold text-foreground">My Items</h1>
            <p className="text-muted-foreground mt-1">Manage your listed items</p>
          </div>
          <Link to="/add-item">
            <Button variant="hero" className="gap-2">
              <PlusCircle className="w-5 h-5" />
              Add New Item
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : items.length === 0 ? (
          /* Empty State */
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-secondary rounded-full flex items-center justify-center">
              <Package className="w-10 h-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">No items yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Start earning by listing your first item. It only takes a few minutes!
            </p>
            <Link to="/add-item">
              <Button variant="hero" className="gap-2">
                <PlusCircle className="w-5 h-5" />
                Add Your First Item
              </Button>
            </Link>
          </div>
        ) : (
          /* Items Grid */
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <div 
                key={item.id} 
                className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-soft transition-shadow"
              >
                {/* Image */}
                <div className="h-48 bg-secondary relative">
                  {item.images && item.images.length > 0 ? (
                    <img 
                      src={item.images[0]} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="w-12 h-12 text-muted-foreground" />
                    </div>
                  )}
                  
                  {/* Status Badge */}
                  <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold ${
                    item.is_available 
                      ? "bg-accent text-accent-foreground" 
                      : "bg-muted text-muted-foreground"
                  }`}>
                    {item.is_available ? "Available" : "Unavailable"}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <h3 className="font-semibold text-foreground line-clamp-1">{item.title}</h3>
                    <span className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(item.category)}`}>
                      {item.category}
                    </span>
                  </div>

                  {item.description && (
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-primary font-bold">
                      <IndianRupee className="w-4 h-4" />
                      <span>{item.price_per_day}</span>
                      <span className="text-muted-foreground font-normal text-sm">/day</span>
                    </div>
                    {item.location && (
                      <div className="flex items-center gap-1 text-muted-foreground text-sm">
                        <MapPin className="w-4 h-4" />
                        <span className="truncate max-w-[100px]">{item.location}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 pt-4 border-t border-border">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 gap-1"
                      onClick={() => toggleAvailability(item.id, item.is_available)}
                    >
                      {item.is_available ? (
                        <ToggleRight className="w-4 h-4" />
                      ) : (
                        <ToggleLeft className="w-4 h-4" />
                      )}
                      {item.is_available ? "Available" : "Unavailable"}
                    </Button>
                    <Button variant="outline" size="icon">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => deleteItem(item.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyItems;
