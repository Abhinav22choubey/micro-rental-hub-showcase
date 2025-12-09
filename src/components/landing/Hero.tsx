import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Drill, Camera, Guitar, Projector, Briefcase, ChefHat } from "lucide-react";

const Hero = () => {
  const floatingItems = [
    { icon: Drill, delay: "0s", position: "top-20 left-[10%]" },
    { icon: Camera, delay: "0.5s", position: "top-32 right-[15%]" },
    { icon: Guitar, delay: "1s", position: "bottom-40 left-[8%]" },
    { icon: Projector, delay: "1.5s", position: "top-48 left-[25%]" },
    { icon: Briefcase, delay: "2s", position: "bottom-32 right-[10%]" },
    { icon: ChefHat, delay: "2.5s", position: "top-24 right-[30%]" },
  ];

  return (
    <section className="relative min-h-screen gradient-hero pt-24 overflow-hidden">
      {/* Floating Items */}
      <div className="absolute inset-0 pointer-events-none">
        {floatingItems.map((item, index) => (
          <div
            key={index}
            className={`absolute ${item.position} animate-float opacity-20`}
            style={{ animationDelay: item.delay }}
          >
            <item.icon className="w-12 h-12 md:w-16 md:h-16 text-primary" />
          </div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent border border-accent/20 mb-8 animate-fade-up">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-semibold">India's First Micro-Item Rental Network</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 animate-fade-up stagger-1">
            Rent Anything.{" "}
            <span className="text-gradient">Lend Anything.</span>
            <br />
            <span className="text-primary">Earn Every Day.</span>
          </h1>

          {/* Tagline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up stagger-2">
            Turn your idle items into income. From power tools to party supplies, 
            connect with neighbors who need what you have.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up stagger-3">
            <Button variant="hero" size="xl" asChild>
              <Link to="/search">
                Get Started
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button variant="outline" size="xl" asChild>
              <Link to="/add-item">Add Your Item</Link>
            </Button>
            <Button variant="secondary" size="xl" asChild>
              <Link to="/search">Browse Items</Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-lg mx-auto mt-16 animate-fade-up stagger-4">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">2K+</p>
              <p className="text-sm text-muted-foreground">Active Items</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">500+</p>
              <p className="text-sm text-muted-foreground">Happy Users</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-foreground">₹50K+</p>
              <p className="text-sm text-muted-foreground">Earned</p>
            </div>
          </div>
        </div>
      </div>

      {/* Wave decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-card"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;
