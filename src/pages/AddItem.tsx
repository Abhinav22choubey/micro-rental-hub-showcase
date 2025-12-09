import { useState } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Upload, MapPin, IndianRupee, Tag, ImagePlus, X, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const AddItem = () => {
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
    "Tools & Equipment",
    "Cameras & Photography",
    "Musical Instruments",
    "Sports & Outdoors",
    "Party & Events",
    "Travel Gear",
    "Kitchen Appliances",
    "Costumes & Clothing",
    "Gaming",
    "Other",
  ];

  const handleImageAdd = () => {
    // Simulate adding an image
    const mockImages = ["📷", "🔧", "🎸", "📽️", "⛺", "🎮"];
    if (images.length < 5) {
      setImages([...images, mockImages[images.length]]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Item Listed Successfully! 🎉",
      description: "Your item is now visible to nearby renters.",
    });
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
                <div key={index} className="relative aspect-square rounded-xl bg-secondary flex items-center justify-center text-4xl border-2 border-border">
                  {img}
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
                Item Title
              </Label>
              <Input
                id="title"
                placeholder="e.g., Canon EOS 1500D DSLR Camera"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="h-12"
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
                Category
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
                  Price per Day
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
            <Button type="submit" variant="hero" size="lg" className="flex-1">
              <Upload className="w-5 h-5" />
              Publish Item
            </Button>
            <Button type="button" variant="outline" size="lg">
              Save as Draft
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddItem;
