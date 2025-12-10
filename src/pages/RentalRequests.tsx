import { useState, useEffect } from "react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package,
  Calendar,
  MessageCircle,
  User,
  Loader2
} from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { format } from "date-fns";

interface RentalRequest {
  id: string;
  item_id: string;
  renter_id: string;
  owner_id: string;
  start_date: string;
  end_date: string;
  total_price: number;
  message: string | null;
  status: string;
  created_at: string;
  item: {
    title: string;
    images: string[] | null;
    price_per_day: number;
  } | null;
  renter: {
    display_name: string | null;
    avatar_url: string | null;
  } | null;
}

const RentalRequests = () => {
  const { user } = useAuth();
  const [requests, setRequests] = useState<RentalRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [processingId, setProcessingId] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchRequests();
    }
  }, [user]);

  const fetchRequests = async () => {
    if (!user) return;

    try {
      // Fetch requests for items the user owns
      const { data: requestsData, error: requestsError } = await supabase
        .from("rental_requests")
        .select("*")
        .eq("owner_id", user.id)
        .order("created_at", { ascending: false });

      if (requestsError) throw requestsError;

      // Fetch related data separately
      const requestsWithData = await Promise.all(
        (requestsData || []).map(async (req) => {
          const [itemResult, renterResult] = await Promise.all([
            supabase.from("items").select("title, images, price_per_day").eq("id", req.item_id).maybeSingle(),
            supabase.from("profiles").select("display_name, avatar_url").eq("user_id", req.renter_id).maybeSingle()
          ]);
          return {
            ...req,
            item: itemResult.data,
            renter: renterResult.data
          } as RentalRequest;
        })
      );
      setRequests(requestsWithData);
    } catch (error) {
      console.error("Error fetching requests:", error);
      toast.error("Failed to load rental requests");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (requestId: string, newStatus: "accepted" | "rejected") => {
    setProcessingId(requestId);
    
    try {
      const { error } = await supabase
        .from("rental_requests")
        .update({ status: newStatus })
        .eq("id", requestId);

      if (error) throw error;

      // Update local state
      setRequests(prev => 
        prev.map(req => 
          req.id === requestId ? { ...req, status: newStatus } : req
        )
      );

      toast.success(`Request ${newStatus === "accepted" ? "accepted" : "declined"} successfully`);
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request");
    } finally {
      setProcessingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: {
        icon: Clock,
        label: "Pending",
        className: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
      },
      accepted: {
        icon: CheckCircle,
        label: "Accepted",
        className: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
      },
      rejected: {
        icon: XCircle,
        label: "Rejected",
        className: "bg-destructive/10 text-destructive",
      },
      completed: {
        icon: CheckCircle,
        label: "Completed",
        className: "bg-muted text-muted-foreground",
      },
    };
    const badge = badges[status as keyof typeof badges] || badges.pending;
    const Icon = badge.icon;
    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${badge.className}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const getInitials = (name: string | null) => {
    if (!name) return "?";
    return name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  };

  const calculateDays = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "accepted", label: "Accepted" },
    { id: "rejected", label: "Rejected" },
    { id: "completed", label: "Completed" },
  ];

  const filteredRequests = activeTab === "all" 
    ? requests 
    : requests.filter(req => req.status === activeTab);

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Rental Requests</h1>
          <p className="text-muted-foreground mt-1">Manage incoming rental requests for your items.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                tab.id === activeTab
                  ? "bg-primary text-primary-foreground shadow-md"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
              }`}
            >
              {tab.label}
              {tab.id !== "all" && (
                <span className="ml-2 text-xs opacity-70">
                  ({requests.filter(r => r.status === tab.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Empty State */}
        {filteredRequests.length === 0 ? (
          <div className="bg-card rounded-2xl border border-border p-12 text-center">
            <Package className="w-16 h-16 mx-auto text-muted-foreground/50 mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No requests yet</h3>
            <p className="text-muted-foreground">
              {activeTab === "all" 
                ? "When someone requests to rent your items, they'll appear here."
                : `No ${activeTab} requests at the moment.`}
            </p>
          </div>
        ) : (
          /* Requests List */
          <div className="space-y-4">
            {filteredRequests.map((request) => {
              const days = calculateDays(request.start_date, request.end_date);
              const isProcessing = processingId === request.id;

              return (
                <div
                  key={request.id}
                  className="bg-card rounded-2xl shadow-lg border border-border overflow-hidden transition-all duration-300 hover:shadow-xl"
                >
                  <div className="p-6">
                    <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                      {/* Item Info */}
                      <div className="flex items-start gap-4 flex-1">
                        {/* Item Image */}
                        <div className="w-20 h-20 rounded-xl bg-secondary overflow-hidden flex-shrink-0">
                          {request.item?.images?.[0] ? (
                            <img 
                              src={request.item.images[0]} 
                              alt={request.item?.title || "Item"} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-4xl bg-primary/10">
                              📦
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <h3 className="font-bold text-lg text-foreground">
                              {request.item?.title || "Unknown Item"}
                            </h3>
                            {getStatusBadge(request.status)}
                          </div>
                          
                          {/* Renter Info */}
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-primary-foreground text-xs font-bold">
                              {request.renter?.avatar_url ? (
                                <img 
                                  src={request.renter.avatar_url} 
                                  alt="" 
                                  className="w-full h-full rounded-full object-cover" 
                                />
                              ) : (
                                getInitials(request.renter?.display_name)
                              )}
                            </div>
                            <div>
                              <span className="font-medium text-foreground">
                                {request.renter?.display_name || "Anonymous"}
                              </span>
                              <span className="text-muted-foreground text-sm ml-2">
                                requested on {format(new Date(request.created_at), "MMM d, yyyy")}
                              </span>
                            </div>
                          </div>

                          {/* Message */}
                          {request.message && (
                            <div className="bg-secondary/50 rounded-xl p-3 mb-4">
                              <p className="text-sm text-muted-foreground italic">"{request.message}"</p>
                            </div>
                          )}

                          {/* Details */}
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Calendar className="w-4 h-4" />
                              <span>
                                {format(new Date(request.start_date), "MMM d")} - {format(new Date(request.end_date), "MMM d, yyyy")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-muted-foreground">
                              <Package className="w-4 h-4" />
                              <span>{days} day{days > 1 ? "s" : ""}</span>
                            </div>
                            {request.status === "accepted" && (
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-medium">
                                Currently Rented
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Pricing & Actions */}
                      <div className="lg:w-52 flex flex-col items-end gap-4">
                        <div className="text-right">
                          <p className="text-sm text-muted-foreground">
                            ₹{request.item?.price_per_day || 0}/day × {days} days
                          </p>
                          <p className="text-2xl font-bold text-foreground">₹{request.total_price}</p>
                        </div>

                        {request.status === "pending" && (
                          <div className="flex gap-2 w-full lg:w-auto">
                            <Button 
                              onClick={() => handleStatusUpdate(request.id, "accepted")}
                              disabled={isProcessing}
                              className="flex-1 lg:flex-none bg-emerald-600 hover:bg-emerald-700 text-white"
                            >
                              {isProcessing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <CheckCircle className="w-4 h-4" />
                              )}
                              Accept
                            </Button>
                            <Button 
                              variant="outline" 
                              onClick={() => handleStatusUpdate(request.id, "rejected")}
                              disabled={isProcessing}
                              className="flex-1 lg:flex-none border-destructive/50 text-destructive hover:bg-destructive/10"
                            >
                              {isProcessing ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <XCircle className="w-4 h-4" />
                              )}
                              Decline
                            </Button>
                          </div>
                        )}

                        {request.status === "accepted" && (
                          <Button variant="default" asChild className="w-full lg:w-auto">
                            <Link to="/dashboard/chat">
                              <MessageCircle className="w-4 h-4" />
                              Chat Now
                            </Link>
                          </Button>
                        )}

                        {request.status === "rejected" && (
                          <span className="text-sm text-muted-foreground italic">Request declined</span>
                        )}

                        {request.status === "completed" && (
                          <Button variant="secondary" className="w-full lg:w-auto">
                            <User className="w-4 h-4" />
                            View Profile
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default RentalRequests;