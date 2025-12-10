import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Package, Mail, Lock, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  displayName: z.string().min(2, "Name must be at least 2 characters").optional(),
});

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; displayName?: string }>({});

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user && !loading) {
      navigate("/dashboard");
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    try {
      authSchema.parse({
        email,
        password,
        displayName: isLogin ? undefined : displayName,
      });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: typeof errors = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            newErrors[err.path[0] as keyof typeof errors] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        if (error.message.includes("Invalid login credentials")) {
          toast.error("Invalid email or password");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } else {
      const { error } = await signUp(email, password, displayName);
      if (error) {
        if (error.message.includes("User already registered")) {
          toast.error("This email is already registered. Please log in.");
        } else {
          toast.error(error.message);
        }
      } else {
        toast.success("Account created! Redirecting to dashboard...");
        navigate("/dashboard");
      }
    }
    
    setIsSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center shadow-soft">
              <Package className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">MicroRental Hub</h1>
              <p className="text-sm text-muted-foreground">Rent Anything, Earn Every Day</p>
            </div>
          </div>

          {/* Form */}
          <div className="bg-card rounded-2xl p-8 shadow-soft border border-border">
            <h2 className="text-xl font-bold text-foreground mb-2">
              {isLogin ? "Welcome back!" : "Create your account"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {isLogin
                ? "Enter your credentials to access your account"
                : "Join thousands of users renting and earning"}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-foreground">Full Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="displayName"
                      type="text"
                      placeholder="John Doe"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {errors.displayName && (
                    <p className="text-sm text-destructive">{errors.displayName}</p>
                  )}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
              </div>

              <Button type="submit" className="w-full" variant="hero" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {isLogin ? "Signing in..." : "Creating account..."}
                  </>
                ) : (
                  isLogin ? "Sign In" : "Create Account"
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                  type="button"
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setErrors({});
                  }}
                  className="ml-2 text-primary font-semibold hover:underline"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Illustration */}
      <div className="hidden lg:flex flex-1 gradient-primary items-center justify-center p-12">
        <div className="text-center text-primary-foreground max-w-md">
          <div className="w-24 h-24 mx-auto mb-8 bg-primary-foreground/20 rounded-full flex items-center justify-center">
            <Package className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-bold mb-4">
            Start Renting Today
          </h2>
          <p className="text-lg opacity-90 mb-8">
            Join India's first micro-item rental network. List your items, discover what's nearby, and start earning.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold">10K+</p>
              <p className="text-sm opacity-80">Active Users</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold">50K+</p>
              <p className="text-sm opacity-80">Items Listed</p>
            </div>
            <div className="bg-primary-foreground/10 rounded-xl p-4">
              <p className="text-2xl font-bold">₹5L+</p>
              <p className="text-sm opacity-80">Earned</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
