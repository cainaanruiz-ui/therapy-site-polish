import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { getOrderPublic } from "@/lib/orders.functions";
import { formatCents } from "@/stores/cartStore";
import { CheckCircle2, Loader2 } from "lucide-react";

export const Route = createFileRoute("/order-confirmation/$id")({
  component: OrderConfirmation,
  head: () => ({ meta: [{ title: "Order confirmed — Happy 2 Help" }] }),
});

function OrderConfirmation() {
  const { id } = Route.useParams();
  const fetchOrder = useServerFn(getOrderPublic);
  const { data: order, isLoading } = useQuery({
    queryKey: ["order", id],
    queryFn: () => fetchOrder({ data: { id } }),
  });

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (!order) {
    return (
      <SiteLayout>
        <div className="py-32 text-center text-muted-foreground">Order not found.</div>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="mx-auto max-w-2xl px-5 sm:px-8 py-16 text-center">
        <CheckCircle2 className="w-14 h-14 mx-auto text-primary mb-4" />
        <h1 className="font-display text-4xl text-primary">Thank you, {order.customer_name}!</h1>
        <p className="mt-3 text-muted-foreground">
          We received your order. A confirmation will be emailed to {order.customer_email}.
        </p>
        <div className="mt-8 text-left rounded-2xl border border-border bg-card p-5">
          <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
            Order #{order.id.slice(0, 8)}
          </div>
          <ul className="space-y-2 text-sm">
            {order.order_items?.map((it, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {it.quantity}× {it.product_name}
                </span>
                <span>{formatCents(it.unit_price_cents * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 pt-3 border-t border-border space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCents(order.subtotal_cents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCents(order.shipping_cents)}</span>
            </div>
            <div className="flex justify-between font-semibold pt-2">
              <span>Total</span>
              <span>{formatCents(order.total_cents)}</span>
            </div>
          </div>
        </div>
        <Link
          to="/shop"
          className="mt-8 inline-block rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90"
        >
          Continue shopping
        </Link>
      </section>
    </SiteLayout>
  );
}