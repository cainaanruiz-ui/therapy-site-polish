import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { checkIsAdmin } from "@/lib/admin.functions";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/_authenticated/admin")({
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const check = useServerFn(checkIsAdmin);
  const { data, isLoading } = useQuery({
    queryKey: ["isAdmin"],
    queryFn: () => check(),
  });

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  };

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (!data?.isAdmin) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-2xl px-5 sm:px-8 py-20">
          <h1 className="font-display text-3xl text-primary">Not an admin yet</h1>
          <p className="mt-3 text-muted-foreground">
            Your account is signed in but doesn't have admin access. Run this SQL in the backend
            to grant yourself admin (replace with your user id):
          </p>
          <pre className="mt-4 rounded-lg bg-muted p-4 text-xs overflow-auto">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('${data?.userId ?? "<your-user-id>"}', 'admin');`}
          </pre>
          <p className="mt-3 text-xs text-muted-foreground">Your user id: {data?.userId}</p>
          <Button onClick={handleSignOut} variant="outline" className="mt-6">
            Sign out
          </Button>
        </div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <h1 className="font-display text-3xl text-primary">Admin</h1>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/products"
              className="text-sm text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              Products
            </Link>
            <Link
              to="/admin/orders"
              className="text-sm text-muted-foreground hover:text-primary"
              activeProps={{ className: "text-primary font-semibold" }}
            >
              Orders
            </Link>
            <Button onClick={handleSignOut} variant="outline" size="sm">
              Sign out
            </Button>
          </div>
        </div>
        <Outlet />
      </section>
    </SiteLayout>
  );
}