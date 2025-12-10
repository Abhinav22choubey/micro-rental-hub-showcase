import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, MapPin, IndianRupee, Tag, ImagePlus, X, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const AddItem = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    location: "",
  });

  const categories = [
    "Electronics",
    "Tools",
    "Travel",
    "Kitchen",
    "Sports",
    "Music",
    "Other",
  ];

  const handleImageAdd = () => {
    // For now, using placeholder images
    const placeholderImages = [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    ];
    if (images.length < 5) {
      setImages([...images, placeholderImages[images.length % placeholderImages.length]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in to add items");
      return;
    }

    if (!formData.title || !formData.category || !formData.price) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from("items").insert({
      user_id: user.id,
      title: formData.title,
      description: formData.description || null,
      category: formData.category.toLowerCase(),
      price_per_day: parseFloat(formData.price),
      images: images,
      location: formData.location || null,
      is_available: true,
    });

    if (error) {
      toast.error("Failed to add item: " + error.message);
    } else {
      toast.success("Item listed successfully!");
      navigate("/dashboard/items");
    }

    setIsSubmitting(false);
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8 max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Add New Item</h1>
          <p className="text-muted-foreground mt-1">List your item and start earning today.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Images */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border">
            <Label className="text-lg font-semibold text-foreground mb-4 block">
              Item Photos
            </Label>
            <p className="text-sm text-muted-foreground mb-4">
              Add up to 5 photos. First photo will be the cover image.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
              {images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-xl bg-secondary overflow-hidden border-2 border-border">
                  <img src={img} alt={`Item ${index + 1}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  {index === 0 && (
                    <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-primary text-primary-foreground text-xs rounded font-medium">
                      Cover
                    </span>
                  )}
                </div>
              ))}
              {images.length < 5 && (
                <button
                  type="button"
                  onClick={handleImageAdd}
                  className="aspect-square rounded-xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-colors flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                >
                  <ImagePlus className="w-8 h-8" />
                  <span className="text-xs font-medium">Add Photo</span>
                </button>
              )}
            </div>
          </div>

          {/* Basic Info */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-6">
            <div>
              <Label htmlFor="title" className="text-foreground font-medium mb-2 block">
                Item Title *
              </Label>
              <Input
                id="title"
                placeholder="e.g., Canon EOS 1500D DSLR Camera"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-12"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-foreground font-medium mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your item, its condition, and what's included..."
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <Label className="text-foreground font-medium mb-3 block">
                Category *
              </Label>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setFormData({ ...formData, category: cat })}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      formData.category === cat
                        ? "bg-primary text-primary-foreground shadow-soft"
                        : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Location */}
          <div className="bg-card rounded-2xl p-6 shadow-card border border-border space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="price" className="text-foreground font-medium mb-2 block">
                  Price per Day *
                </Label>
                <div className="relative">
                  <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="price"
                    type="number"
                    placeholder="500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="h-12 pl-12"
                    required
                    min="1"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="location" className="text-foreground font-medium mb-2 block">
                  Pickup Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="e.g., Koramangala, Bangalore"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="h-12 pl-12"
                  />
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-accent/10 rounded-xl p-4 border border-accent/20">
              <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                <Tag className="w-4 h-4 text-accent" />
                Pricing Tips
              </h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5" />
                  Similar cameras in your area rent for ₹400-600/day
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-accent mt-0.5" />
                  Competitive pricing gets 3x more requests
                </li>
              </ul>
            </div>
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button 
              type="submit" 
              variant="hero" 
              size="lg" 
              className="flex-1"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Upload className="w-5 h-5" />
                  Publish Item
                </>
              )}
            </Button>
            <Button type="button" variant="outline" size="lg" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddItem;
