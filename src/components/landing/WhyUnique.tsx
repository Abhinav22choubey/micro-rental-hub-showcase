import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const WhyUnique = () => {
  const benefits = [
    "No upfront costs — listing is 100% free",
    "Hyper-local focus for faster pickups",
    "Built-in trust & verification system",
    "Earn eco-points and sustainability badges",
    "Emergency rental priority feature",
    "Secure in-app chat with item context",
  ];

  return (
    <section className="py-24 bg-card overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Why Choose Us</span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-6">
              The Smarter Way to Rent & Earn
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Unlike traditional rental platforms, Micro Rental Hub focuses on everyday items 
              you already own. Turn that idle drill, camera, or party speaker into passive income.
            </p>

            <ul className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full gradient-accent flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-accent-foreground" />
                  </div>
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>

            <Button variant="hero" size="lg" asChild>
              <Link to="/search">
                Explore Rentals
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="absolute inset-0 gradient-primary rounded-3xl blur-3xl opacity-20" />
            <div className="relative bg-background rounded-3xl p-8 shadow-elevated border border-border">
              {/* Mock Dashboard Preview */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">📷</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Canon DSLR Camera</div>
                    <div className="text-sm text-accent font-medium">₹500/day • 2.1 km away</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    Available
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🔧</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Power Drill Kit</div>
                    <div className="text-sm text-accent font-medium">₹150/day • 0.8 km away</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                    Rented
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl">🎸</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-foreground">Acoustic Guitar</div>
                    <div className="text-sm text-accent font-medium">₹200/day • 1.5 km away</div>
                  </div>
                  <div className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-semibold">
                    Available
                  </div>
                </div>

                <div className="pt-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Your Trust Score</span>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-32 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full w-[85%] gradient-accent rounded-full" />
                      </div>
                      <span className="text-sm font-semibold text-accent">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUnique;
