"use client";

import { useState } from "react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await authClient.signIn.email({
        email,
        password,
      });

      if (error) {
        toast.error(error.message || "Failed to sign in");
      } else {
        toast.success("Welcome back!");
        router.push("/dashboard"); // Redirect after login
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bloom-card p-10 bg-background/80 backdrop-blur-xl border border-border/50 shadow-2xl shadow-primary/5">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-serif font-medium tracking-tight text-foreground mb-2">
          Welcome back
        </h1>
        <p className="text-muted-foreground text-sm">
          Enter your details to access your library.
        </p>
      </div>

      <form onSubmit={handleSignIn} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-muted-foreground font-normal ml-1">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-surface-soft"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between ml-1">
            <Label htmlFor="password" className="text-muted-foreground font-normal">Password</Label>
            <Link href="#" className="text-xs text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-surface-soft"
          />
        </div>

        <Button 
          type="submit" 
          className="w-full h-12 rounded-full text-[15px] shadow-md shadow-primary/20 hover:scale-[1.02] transition-transform" 
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="size-4 animate-spin" /> : "Sign In"}
        </Button>
      </form>

      <div className="mt-8 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline font-medium">
          Create one
        </Link>
      </div>
    </div>
  );
}
