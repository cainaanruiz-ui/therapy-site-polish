import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/auth")({
  component: AuthPage,
  head: () => ({
    meta: [
      { title: "Sign In — Happy 2 Help Counseling" },
      { name: "description", content: "Admin sign in for Happy 2 Help Counseling." },
    ],
  }),
});

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      navigate({ to: "/admin/billing" });
    }
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-md px-5 sm:px-8 pt-20 pb-24">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-[var(--shadow-card)]">
          <h1 className="font-display text-3xl text-primary text-center">Admin Sign In</h1>
          <p className="mt-2 text-sm text-muted-foreground text-center">
            Sign in to access billing and admin tools.
          </p>
          <form onSubmit={handleSignIn} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full rounded-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign In"}
            </Button>
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}
