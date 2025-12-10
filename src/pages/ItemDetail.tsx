import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  MapPin, 
  Star, 
  Heart,
  Calendar as CalendarIcon,
  MessageCircle,
  Shield,
  Clock,
  ArrowLeft,
  Loader2,
  CheckCircle
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format, differenceInDays, addDays } from "date-fns";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

interface Item {
  id: string;
  title: string;
  description: string | null;
  price_per_day: number;
  images: string[] | null;
  category: string;
  location: string | null;
  is_available: boolean | null;
  user_id: string;
  created_at: string;
}

interface Owner {
  display_name: string | null;
  avatar_url: string | null;
  trust_score: number | null;
}

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [item, setItem] = useState<Item | null>(null);
  const [owner, setOwner] = useState<Owner | null>(null);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [requestSent, setRequestSent] = useState(false);
  
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (id) {
      fetchItem();
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const { data: itemData, error: itemError } = await supabase
        .from("items")
        .select("*")
        .eq("id", id)
        .maybeSingle();

      if (itemError) throw itemError;
      if (!itemData) {
        toast.error("Item not found");
        navigate("/search");
        return;
      }

      setItem(itemData);

      // Fetch owner profile
      const { data: ownerData } = await supabase
        .from("profiles")
        .select("display_name, avatar_url, trust_score")
        .eq("user_id", itemData.user_id)
        .maybeSingle();

      setOwner(ownerData);
    } catch (error) {
      console.error("Error fetching item:", error);
      toast.error("Failed to load item");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = () => {
    if (!dateRange?.from || !dateRange?.to || !item) return 0;
    const days = differenceInDays(dateRange.to, dateRange.from) + 1;
    return days * item.price_per_day;
  };

  const getDays = () => {
    if (!dateRange?.from || !dateRange?.to) return 0;
    return differenceInDays(dateRange.to, dateRange.from) + 1;
  };

  const handleRequestRent = async () => {
    if (!user) {
      toast.error("Please login to request a rental");
      navigate("/auth");
      return;
    }

    if (!dateRange?.from || !dateRange?.to) {
      toast.error("Please select rental dates");
      return;
    }

    if (!item) return;

    if (user.id === item.user_id) {
      toast.error("You cannot rent your own item");
      return;
    }

    setRequesting(true);

    try {
      const { error } = await supabase
        .from("rental_requests")
        .insert({
          item_id: item.id,
          renter_id: user.id,
          owner_id: item.user_id,
          start_date: format(dateRange.from, "yyyy-MM-dd"),
          end_date: format(dateRange.to, "yyyy-MM-dd"),
          total_price: calculateTotal(),
          message: message || null,
          status: "pending"
        });

      if (error) throw error;

      setRequestSent(true);
      toast.success("Rental request sent successfully!");
    } catch (error: any) {
      console.error("Error creating request:", error);
      toast.error(error.message || "Failed to send request");
    } finally {
      setRequesting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-muted-foreground">Item not found</p>
          <Button variant="link" onClick={() => navigate("/search")}>
            Back to Search
          </Button>
        </div>
      </div>
    );
  }

  const isOwner = user?.id === item.user_id;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-secondary relative">
                {item.images?.[0] ? (
                  <img 
                    src={item.images[0]} 
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-8xl">
                    📦
                  </div>
                )}
                <button className="absolute top-4 right-4 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors">
                  <Heart className="w-6 h-6" />
                </button>
                {!item.is_available && (
                  <div className="absolute inset-0 bg-foreground/60 flex items-center justify-center">
                    <span className="px-6 py-3 bg-card rounded-full text-lg font-semibold text-foreground">
                      Currently Rented
                    </span>
                  </div>
                )}
              </div>
              
              {/* Thumbnail gallery */}
              {item.images && item.images.length > 1 && (
                <div className="flex gap-3">
                  {item.images.slice(0, 4).map((img, idx) => (
                    <div key={idx} className="w-20 h-20 rounded-xl overflow-hidden bg-secondary cursor-pointer hover:ring-2 ring-primary transition-all">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Item Details */}
            <div className="space-y-6">
              {/* Title & Price */}
              <div>
                <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium capitalize">
                  {item.category}
                </span>
                <h1 className="text-3xl font-bold text-foreground mt-3 mb-2">
                  {item.title}
                </h1>
                <div className="flex items-center gap-4 text-muted-foreground">
                  {item.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {item.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-primary fill-primary" />
                    4.8 (23 reviews)
                  </span>
                </div>
              </div>

              {/* Price Card */}
              <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                <div className="flex items-end gap-2 mb-4">
                  <span className="text-4xl font-bold text-foreground">₹{item.price_per_day}</span>
                  <span className="text-muted-foreground text-lg mb-1">/day</span>
                </div>

                {/* Date Selection */}
                <div className="space-y-4">
                  <label className="text-sm font-medium text-foreground">Select Rental Dates</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal h-12",
                          !dateRange && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange?.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d, yyyy")}
                            </>
                          ) : (
                            format(dateRange.from, "MMM d, yyyy")
                          )
                        ) : (
                          <span>Pick your dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={new Date()}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>

                  {dateRange?.from && dateRange?.to && (
                    <div className="bg-secondary/50 rounded-xl p-4 space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">₹{item.price_per_day} × {getDays()} days</span>
                        <span className="text-foreground">₹{calculateTotal()}</span>
                      </div>
                      <div className="flex justify-between font-bold text-lg border-t border-border pt-2">
                        <span>Total</span>
                        <span className="text-primary">₹{calculateTotal()}</span>
                      </div>
                    </div>
                  )}

                  {/* Request Button */}
                  {isOwner ? (
                    <Button className="w-full h-12" variant="secondary" disabled>
                      This is your item
                    </Button>
                  ) : (
                    <Dialog open={showDialog} onOpenChange={setShowDialog}>
                      <DialogTrigger asChild>
                        <Button 
                          className="w-full h-12 text-lg" 
                          disabled={!item.is_available || !dateRange?.from || !dateRange?.to}
                        >
                          {item.is_available ? "Request to Rent" : "Currently Unavailable"}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        {requestSent ? (
                          <div className="text-center py-6">
                            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto mb-4">
                              <CheckCircle className="w-8 h-8 text-emerald-500" />
                            </div>
                            <DialogTitle className="text-xl mb-2">Request Sent!</DialogTitle>
                            <DialogDescription className="mb-6">
                              Your rental request has been sent to {owner?.display_name || "the owner"}. 
                              They'll review it and get back to you soon.
                            </DialogDescription>
                            <div className="flex gap-3">
                              <Button variant="outline" className="flex-1" onClick={() => navigate("/search")}>
                                Continue Browsing
                              </Button>
                              <Button className="flex-1" onClick={() => navigate("/dashboard/requests")}>
                                View Requests
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <DialogHeader>
                              <DialogTitle>Confirm Rental Request</DialogTitle>
                              <DialogDescription>
                                Review your request details before sending.
                              </DialogDescription>
                            </DialogHeader>
                            
                            <div className="space-y-4 py-4">
                              <div className="flex items-center gap-3 p-3 bg-secondary/50 rounded-xl">
                                <div className="w-16 h-16 rounded-lg overflow-hidden bg-secondary">
                                  {item.images?.[0] ? (
                                    <img src={item.images[0]} alt="" className="w-full h-full object-cover" />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-2xl">📦</div>
                                  )}
                                </div>
                                <div className="flex-1">
                                  <p className="font-semibold text-foreground">{item.title}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {dateRange?.from && dateRange?.to && (
                                      <>
                                        {format(dateRange.from, "MMM d")} - {format(dateRange.to, "MMM d")} ({getDays()} days)
                                      </>
                                    )}
                                  </p>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-lg text-primary">₹{calculateTotal()}</p>
                                </div>
                              </div>

                              <div>
                                <label className="text-sm font-medium text-foreground mb-2 block">
                                  Add a message (optional)
                                </label>
                                <Textarea
                                  placeholder="Introduce yourself and explain why you need this item..."
                                  value={message}
                                  onChange={(e) => setMessage(e.target.value)}
                                  rows={3}
                                />
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <Button variant="outline" className="flex-1" onClick={() => setShowDialog(false)}>
                                Cancel
                              </Button>
                              <Button 
                                className="flex-1"
                                onClick={handleRequestRent}
                                disabled={requesting}
                              >
                                {requesting ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  "Send Request"
                                )}
                              </Button>
                            </div>
                          </>
                        )}
                      </DialogContent>
                    </Dialog>
                  )}
                </div>
              </div>

              {/* Owner Card */}
              <div className="bg-card rounded-2xl p-5 border border-border flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xl font-bold">
                  {owner?.avatar_url ? (
                    <img src={owner.avatar_url} alt="" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    owner?.display_name?.charAt(0) || "?"
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-foreground">{owner?.display_name || "Owner"}</p>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-emerald-500" />
                      Verified
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      Responds in 1hr
                    </span>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-1" />
                  Message
                </Button>
              </div>

              {/* Description */}
              {item.description && (
                <div>
                  <h3 className="font-semibold text-foreground mb-2">About this item</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              )}

              {/* Features */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-emerald-500" />
                  <p className="text-sm font-medium text-foreground">Damage Protection</p>
                  <p className="text-xs text-muted-foreground">Included</p>
                </div>
                <div className="bg-secondary/50 rounded-xl p-4 text-center">
                  <Clock className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <p className="text-sm font-medium text-foreground">Flexible Pickup</p>
                  <p className="text-xs text-muted-foreground">Schedule anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDetail;