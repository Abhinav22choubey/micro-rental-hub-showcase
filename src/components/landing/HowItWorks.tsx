import { Upload, Handshake, Wallet } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      number: "01",
      title: "List Your Item",
      description: "Take photos, set your price, and publish in minutes. It's completely free to list.",
      color: "from-primary to-primary/80",
    },
    {
      icon: Handshake,
      number: "02",
      title: "Connect & Rent",
      description: "Chat with interested renters, negotiate terms, and confirm the rental.",
      color: "from-accent to-accent/80",
    },
    {
      icon: Wallet,
      number: "03",
      title: "Earn Money",
      description: "Receive payments directly. Build your trust score and unlock premium features.",
      color: "from-primary to-accent",
    },
  ];

  return (
    <section className="py-24 bg-card" id="how-it-works">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">How It Works</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Start Earning in 3 Simple Steps
          </h2>
          <p className="text-muted-foreground text-lg">
            Whether you want to rent or lend, our platform makes it seamless and secure.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative group"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 left-[60%] w-[80%] h-[2px] bg-gradient-to-r from-border to-transparent" />
              )}

              <div className="bg-background rounded-2xl p-8 shadow-card card-hover text-center">
                {/* Number badge */}
                <span className="text-6xl font-extrabold text-muted/30 absolute top-4 right-6">
                  {step.number}
                </span>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-primary-foreground" />
                </div>

                <h3 className="text-xl font-bold text-foreground mb-3">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
