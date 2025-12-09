import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Button } from "@/components/ui/button";
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  Package,
  Calendar,
  MessageCircle,
  User
} from "lucide-react";
import { Link } from "react-router-dom";

const RentalRequests = () => {
  const requests = [
    {
      id: 1,
      item: "Canon DSLR Camera",
      itemImage: "📷",
      renter: "Priya Sharma",
      renterAvatar: "PS",
      status: "pending",
      price: 500,
      duration: 3,
      total: 1500,
      requestDate: "Dec 8, 2024",
      startDate: "Dec 10, 2024",
      endDate: "Dec 12, 2024",
      message: "Hi! I need the camera for a college project. Will take good care of it!",
    },
    {
      id: 2,
      item: "Power Drill Kit",
      itemImage: "🔧",
      renter: "Amit Kumar",
      renterAvatar: "AK",
      status: "accepted",
      price: 150,
      duration: 1,
      total: 150,
      requestDate: "Dec 7, 2024",
      startDate: "Dec 9, 2024",
      endDate: "Dec 9, 2024",
      message: "Need it for some home repairs. Will pick up in the morning.",
    },
    {
      id: 3,
      item: "Projector HD",
      itemImage: "📽️",
      renter: "Sneha Reddy",
      renterAvatar: "SR",
      status: "rejected",
      price: 400,
      duration: 2,
      total: 800,
      requestDate: "Dec 5, 2024",
      startDate: "Dec 7, 2024",
      endDate: "Dec 8, 2024",
      message: "For a movie night event at our society.",
    },
    {
      id: 4,
      item: "Acoustic Guitar",
      itemImage: "🎸",
      renter: "Vikram Mehta",
      renterAvatar: "VM",
      status: "completed",
      price: 200,
      duration: 5,
      total: 1000,
      requestDate: "Nov 28, 2024",
      startDate: "Nov 30, 2024",
      endDate: "Dec 4, 2024",
      message: "Learning guitar, wanted to try before buying one.",
    },
  ];

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: {
        icon: Clock,
        label: "Pending",
        className: "bg-primary/10 text-primary",
      },
      accepted: {
        icon: CheckCircle,
        label: "Accepted",
        className: "bg-accent/10 text-accent",
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
    const badge = badges[status as keyof typeof badges];
    const Icon = badge.icon;
    return (
      <span className={`px-3 py-1.5 rounded-full text-sm font-semibold flex items-center gap-1.5 ${badge.className}`}>
        <Icon className="w-4 h-4" />
        {badge.label}
      </span>
    );
  };

  const tabs = [
    { id: "all", label: "All" },
    { id: "pending", label: "Pending" },
    { id: "accepted", label: "Accepted" },
    { id: "completed", label: "Completed" },
  ];

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Rental Requests</h1>
          <p className="text-muted-foreground mt-1">Manage incoming and outgoing rental requests.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                tab.id === "all"
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-muted-foreground hover:bg-secondary border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {requests.map((request) => (
            <div
              key={request.id}
              className="bg-card rounded-2xl shadow-card border border-border overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                  {/* Item Info */}
                  <div className="flex items-start gap-4 flex-1">
                    <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center text-4xl flex-shrink-0">
                      {request.itemImage}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="font-bold text-lg text-foreground">{request.item}</h3>
                        {getStatusBadge(request.status)}
                      </div>
                      
                      {/* Renter Info */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-8 h-8 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-xs font-bold">
                          {request.renterAvatar}
                        </div>
                        <div>
                          <span className="font-medium text-foreground">{request.renter}</span>
                          <span className="text-muted-foreground text-sm ml-2">requested on {request.requestDate}</span>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="bg-secondary/50 rounded-xl p-3 mb-4">
                        <p className="text-sm text-muted-foreground italic">"{request.message}"</p>
                      </div>

                      {/* Details */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{request.startDate} - {request.endDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Package className="w-4 h-4" />
                          <span>{request.duration} day{request.duration > 1 ? "s" : ""}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing & Actions */}
                  <div className="lg:w-48 flex flex-col items-end gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">₹{request.price}/day × {request.duration} days</p>
                      <p className="text-2xl font-bold text-foreground">₹{request.total}</p>
                    </div>

                    {request.status === "pending" && (
                      <div className="flex gap-2 w-full lg:w-auto">
                        <Button variant="accent" className="flex-1 lg:flex-none">
                          <CheckCircle className="w-4 h-4" />
                          Accept
                        </Button>
                        <Button variant="outline" className="flex-1 lg:flex-none">
                          <XCircle className="w-4 h-4" />
                          Decline
                        </Button>
                      </div>
                    )}

                    {request.status === "accepted" && (
                      <Button variant="default" asChild className="w-full lg:w-auto">
                        <Link to="/chat">
                          <MessageCircle className="w-4 h-4" />
                          Message
                        </Link>
                      </Button>
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
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default RentalRequests;
