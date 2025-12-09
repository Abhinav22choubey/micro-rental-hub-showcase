import { Star, Quote } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "College Student, Delhi",
      content: "I earned ₹3,000 last month just by renting out my camera and tripod on weekends. Best side hustle ever!",
      rating: 5,
      avatar: "PS",
    },
    {
      name: "Rahul Verma",
      role: "Homeowner, Mumbai",
      content: "Needed a drill for one day. Found one 500m away for ₹100. Saved money and met a great neighbor!",
      rating: 5,
      avatar: "RV",
    },
    {
      name: "Anita Patel",
      role: "Event Planner, Bangalore",
      content: "The emergency rental feature saved my event. Got a projector delivered within an hour. Incredible service!",
      rating: 5,
      avatar: "AP",
    },
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-3 mb-4">
            Loved by Our Community
          </h2>
          <p className="text-muted-foreground text-lg">
            See what our users are saying about their rental experiences.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card rounded-2xl p-8 shadow-card card-hover border border-border relative"
            >
              <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/20" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
