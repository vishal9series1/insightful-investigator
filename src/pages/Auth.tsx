import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Shield, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock authentication delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    toast({
      title: isLogin ? "Welcome back!" : "Account created",
      description: isLogin 
        ? "You've been signed in successfully." 
        : "Your account has been created. Welcome aboard!",
    });

    setIsLoading(false);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary via-primary/90 to-primary/80 p-12 flex-col justify-between relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white rounded-full blur-3xl" />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Fraud Detection</h1>
              <p className="text-white/70 text-sm">AI-Powered Security</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 space-y-8">
          <div>
            <h2 className="text-4xl font-bold text-white leading-tight">
              Protect your business<br />with intelligent fraud<br />detection
            </h2>
            <p className="mt-4 text-white/80 text-lg max-w-md">
              Leverage advanced AI to detect, analyze, and prevent fraudulent activities in real-time.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">99.2%</p>
              <p className="text-sm text-white/70">Detection Rate</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">&lt;2s</p>
              <p className="text-sm text-white/70">Response Time</p>
            </div>
            <div className="w-px h-12 bg-white/20" />
            <div className="text-center">
              <p className="text-3xl font-bold text-white">24/7</p>
              <p className="text-sm text-white/70">Monitoring</p>
            </div>
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-white/60 text-sm">
            Trusted by 500+ enterprises worldwide
          </p>
        </div>
      </div>

      {/* Right Panel - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <div className="w-full max-w-md space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 justify-center mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold">Fraud Detection</span>
          </div>

          <div className="text-center lg:text-left">
            <h2 className="text-2xl font-bold">
              {isLogin ? "Welcome back" : "Create an account"}
            </h2>
            <p className="text-muted-foreground mt-2">
              {isLogin 
                ? "Enter your credentials to access your dashboard" 
                : "Start your 14-day free trial, no credit card required"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required={!isLogin}
                  className="h-12"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end">
                <button type="button" className="text-sm text-primary hover:underline">
                  Forgot password?
                </button>
              </div>
            )}

            <Button type="submit" className="w-full h-12 text-base" disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  {isLogin ? "Sign in" : "Create account"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                {isLogin ? "New to the platform?" : "Already have an account?"}
              </span>
            </div>
          </div>

          <Button
            type="button"
            variant="outline"
            className="w-full h-12"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Create an account" : "Sign in instead"}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By continuing, you agree to our{" "}
            <a href="#" className="underline hover:text-foreground">Terms of Service</a>
            {" "}and{" "}
            <a href="#" className="underline hover:text-foreground">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
