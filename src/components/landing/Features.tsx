import { MapPin, MessageCircle, Leaf, Shield, Zap, Star } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MapPin,
      title: "Search Nearby",
      description: "Find items in your neighborhood. Filter by distance, category, and availability.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: MessageCircle,
      title: "Chat & Negotiate",
      description: "Real-time messaging with item owners. Discuss terms and finalize rentals easily.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Leaf,
      title: "Eco-Points",
      description: "Earn sustainability points for every rental. Contribute to a greener planet.",
      color: "bg-accent/10 text-accent",
    },
    {
      icon: Shield,
      title: "Trust Score",
      description: "Build your reputation. Verified users get priority listings and better deals.",
      color: "bg-primary/10 text-primary",
    },
    {
      icon: Zap,
      title: "Emergency Rentals",
      description: "Need something urgently? Mark your request as emergency for faster responses.",
      color: "bg-destructive/10 text-destructive",
    },
    {
      icon: Star,
      title: "Reviews & Ratings",
      description: "Make informed decisions with authentic reviews from the community.",
      color: "bg-primary/10 text-primary",
    },
  ];

  return (
    <section className="py-24 bg-background" id="features">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Features</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Everything You Need to Rent Smart
          </h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools to make peer-to-peer rentals safe, easy, and rewarding.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary/30 shadow-card card-hover"
            >
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
