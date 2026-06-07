import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCartStore, formatCents } from "@/stores/cartStore";
import { createOrder } from "@/lib/orders.functions";
import { toast } from "sonner";
import { Lock } from "lucide-react";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({ meta: [{ title: "Checkout — Happy 2 Help" }] }),
});

function CheckoutPage() {
  const navigate = useNavigate();
  const items = useCartStore((s) => s.items);
  const subtotal = items.reduce((s, i) => s + i.priceCents * i.quantity, 0);
  const shipping = subtotal > 0 ? 599 : 0;
  const total = subtotal + shipping;

  const submit = useServerFn(createOrder);
  const clearCart = useCartStore((s) => s.clearCart);
  const [busy, setBusy] = useState(false);

  const [form, setForm] = useState({
    customer_name: "",
    customer_email: "",
    phone: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postal_code: "",
  });

  const onChange = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [k]: e.target.value });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;
    setBusy(true);
    try {
      const result = await submit({
        data: {
          customer_name: form.customer_name,
          customer_email: form.customer_email,
          phone: form.phone || null,
          shipping_address: {
            line1: form.line1,
            line2: form.line2 || null,
            city: form.city,
            state: form.state,
            postal_code: form.postal_code,
            country: "US",
          },
          items: items.map((i) => ({ product_id: i.productId, quantity: i.quantity })),
        },
      });
      clearCart();
      toast.success("Order placed!");
      navigate({ to: "/order-confirmation/$id", params: { id: result.orderId } });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to place order");
    } finally {
      setBusy(false);
    }
  };

  if (items.length === 0) {
    return (
      <SiteLayout>
        <section className="mx-auto max-w-2xl px-5 sm:px-8 py-24 text-center">
          <h1 className="font-display text-4xl text-primary">Your cart is empty</h1>
          <Link to="/shop" className="mt-6 inline-block text-primary hover:underline">
            Browse the shop →
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-5xl px-5 sm:px-8 py-12">
        <h1 className="font-display text-4xl text-primary mb-8">Checkout</h1>

        <div className="grid md:grid-cols-[1fr_360px] gap-10">
          <form onSubmit={onSubmit} className="space-y-6">
            <div>
              <h2 className="font-semibold text-lg mb-4">Contact</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <Label>Full name</Label>
                  <Input required value={form.customer_name} onChange={onChange("customer_name")} />
                </div>
                <div className="space-y-1">
                  <Label>Email</Label>
                  <Input
                    type="email"
                    required
                    value={form.customer_email}
                    onChange={onChange("customer_email")}
                  />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <Label>Phone (optional)</Label>
                  <Input type="tel" value={form.phone} onChange={onChange("phone")} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-4">Shipping address</h2>
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2 space-y-1">
                  <Label>Address line 1</Label>
                  <Input required value={form.line1} onChange={onChange("line1")} />
                </div>
                <div className="sm:col-span-2 space-y-1">
                  <Label>Address line 2 (optional)</Label>
                  <Input value={form.line2} onChange={onChange("line2")} />
                </div>
                <div className="space-y-1">
                  <Label>City</Label>
                  <Input required value={form.city} onChange={onChange("city")} />
                </div>
                <div className="space-y-1">
                  <Label>State</Label>
                  <Input required maxLength={2} value={form.state} onChange={onChange("state")} />
                </div>
                <div className="space-y-1">
                  <Label>ZIP</Label>
                  <Input required value={form.postal_code} onChange={onChange("postal_code")} />
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-dashed border-border p-5 bg-muted/30">
              <div className="flex items-center gap-2 text-sm font-medium">
                <Lock className="w-4 h-4" /> Payment
              </div>
              <p className="mt-2 text-sm text-muted-foreground">
                Card payment via CardPointe will appear here once your merchant credentials are
                added. For now, you can place a test order and we'll capture payment manually.
              </p>
            </div>

            <Button type="submit" disabled={busy} size="lg" className="w-full rounded-full">
              {busy ? "Placing order..." : `Place order · ${formatCents(total)}`}
            </Button>
          </form>

          <aside className="rounded-2xl border border-border bg-card p-5 h-fit sticky top-20">
            <h2 className="font-semibold mb-4">Order summary</h2>
            <ul className="space-y-3">
              {items.map((i) => (
                <li key={i.productId} className="flex justify-between text-sm">
                  <span className="truncate pr-2">
                    {i.quantity}× {i.name}
                  </span>
                  <span>{formatCents(i.priceCents * i.quantity)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 pt-4 border-t border-border space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatCents(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{formatCents(shipping)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span>{formatCents(total)}</span>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </SiteLayout>
  );
}