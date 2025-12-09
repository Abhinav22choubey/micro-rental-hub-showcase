import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { 
  Package, 
  TrendingUp, 
  Users, 
  Leaf, 
  ArrowUpRight, 
  ArrowDownRight,
  Clock,
  CheckCircle,
  XCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const stats = [
    { 
      label: "Active Listings", 
      value: "12", 
      change: "+2", 
      trend: "up",
      icon: Package,
      color: "bg-primary/10 text-primary" 
    },
    { 
      label: "Total Earnings", 
      value: "₹8,450", 
      change: "+₹1,200", 
      trend: "up",
      icon: TrendingUp,
      color: "bg-accent/10 text-accent" 
    },
    { 
      label: "Completed Rentals", 
      value: "34", 
      change: "+5", 
      trend: "up",
      icon: Users,
      color: "bg-primary/10 text-primary" 
    },
    { 
      label: "Eco Points", 
      value: "285", 
      change: "+45", 
      trend: "up",
      icon: Leaf,
      color: "bg-accent/10 text-accent" 
    },
  ];

  const recentRequests = [
    { 
      id: 1, 
      item: "Canon DSLR Camera", 
      renter: "Priya M.", 
      status: "pending", 
      price: "₹500/day",
      duration: "3 days",
      image: "📷" 
    },
    { 
      id: 2, 
      item: "Power Drill Kit", 
      renter: "Amit K.", 
      status: "accepted", 
      price: "₹150/day",
      duration: "1 day",
      image: "🔧" 
    },
    { 
      id: 3, 
      item: "Camping Tent", 
      renter: "Sneha R.", 
      status: "completed", 
      price: "₹300/day",
      duration: "2 days",
      image: "⛺" 
    },
  ];

  const myItems = [
    { id: 1, name: "Canon DSLR Camera", status: "rented", earnings: "₹2,500", image: "📷" },
    { id: 2, name: "Power Drill Kit", status: "available", earnings: "₹1,800", image: "🔧" },
    { id: 3, name: "Projector HD", status: "available", earnings: "₹3,200", image: "📽️" },
    { id: 4, name: "Acoustic Guitar", status: "rented", earnings: "₹950", image: "🎸" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</span>;
      case "accepted":
        return <span className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Accepted</span>;
      case "completed":
        return <span className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-semibold flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Completed</span>;
      case "rejected":
        return <span className="px-3 py-1 rounded-full bg-destructive/10 text-destructive text-xs font-semibold flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</span>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground">Welcome back, Rahul! 👋</h1>
            <p className="text-muted-foreground mt-1">Here's what's happening with your rentals.</p>
          </div>
          <Button variant="hero" asChild>
            <Link to="/add-item">Add New Item</Link>
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-card rounded-2xl p-6 shadow-card border border-border">
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.trend === "up" ? "text-accent" : "text-destructive"}`}>
                  {stat.change}
                  {stat.trend === "up" ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Recent Requests */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">Recent Requests</h2>
              <Link to="/dashboard/requests" className="text-primary text-sm font-medium hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-border">
              {recentRequests.map((request) => (
                <div key={request.id} className="p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {request.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{request.item}</p>
                      <p className="text-sm text-muted-foreground">{request.renter} • {request.duration}</p>
                    </div>
                    <div className="text-right">
                      {getStatusBadge(request.status)}
                      <p className="text-sm font-medium text-foreground mt-1">{request.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Items */}
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h2 className="text-lg font-bold text-foreground">My Items</h2>
              <Link to="/dashboard/items" className="text-primary text-sm font-medium hover:underline">View All</Link>
            </div>
            <div className="divide-y divide-border">
              {myItems.map((item) => (
                <div key={item.id} className="p-4 hover:bg-secondary/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-2xl">
                      {item.image}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{item.name}</p>
                      <p className="text-sm text-muted-foreground">Total earned: {item.earnings}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      item.status === "available" 
                        ? "bg-accent/10 text-accent" 
                        : "bg-primary/10 text-primary"
                    }`}>
                      {item.status === "available" ? "Available" : "Rented"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
