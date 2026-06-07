import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { adminListOrders, updateOrder } from "@/lib/admin.functions";
import { formatCents } from "@/stores/cartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/orders")({
  component: OrdersAdmin,
});

type OrderRow = {
  id: string;
  customer_name: string;
  customer_email: string;
  phone: string | null;
  shipping_address: {
    line1: string;
    line2?: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  total_cents: number;
  subtotal_cents: number;
  shipping_cents: number;
  tax_cents: number;
  status: string;
  tracking_number: string | null;
  carrier: string | null;
  notes: string | null;
  created_at: string;
  order_items: Array<{
    product_name: string;
    quantity: number;
    unit_price_cents: number;
  }>;
};

const STATUSES = ["pending", "paid", "fulfilled", "shipped", "cancelled", "refunded"] as const;

function OrdersAdmin() {
  const list = useServerFn(adminListOrders);
  const { data, isLoading } = useQuery({ queryKey: ["admin-orders"], queryFn: () => list() });
  const [openId, setOpenId] = useState<string | null>(null);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-border py-16 text-center text-muted-foreground">
        No orders yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {(data as OrderRow[]).map((o) => (
        <div key={o.id} className="rounded-2xl border border-border bg-card overflow-hidden">
          <button
            onClick={() => setOpenId(openId === o.id ? null : o.id)}
            className="w-full px-5 py-4 flex items-center justify-between gap-4 hover:bg-muted/30"
          >
            <div className="text-left">
              <div className="font-medium">{o.customer_name}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(o.created_at).toLocaleString()} · {o.customer_email}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex px-2 py-1 rounded-full bg-secondary text-xs uppercase tracking-wide">
                {o.status}
              </span>
              <span className="font-semibold">{formatCents(o.total_cents)}</span>
              {openId === o.id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </button>
          {openId === o.id && <OrderDetail order={o} />}
        </div>
      ))}
    </div>
  );
}

function OrderDetail({ order }: { order: OrderRow }) {
  const update = useServerFn(updateOrder);
  const qc = useQueryClient();
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [tracking, setTracking] = useState(order.tracking_number ?? "");
  const [carrier, setCarrier] = useState(order.carrier ?? "");

  const save = async () => {
    setBusy(true);
    try {
      await update({
        data: {
          id: order.id,
          status: status as (typeof STATUSES)[number],
          tracking_number: tracking || null,
          carrier: carrier || null,
        },
      });
      toast.success("Order updated");
      qc.invalidateQueries({ queryKey: ["admin-orders"] });
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  const addr = order.shipping_address;

  return (
    <div className="px-5 pb-5 pt-2 border-t border-border space-y-4">
      <div className="grid md:grid-cols-2 gap-4 text-sm">
        <div>
          <div className="text-xs uppercase text-muted-foreground mb-2">Shipping</div>
          <div>{order.customer_name}</div>
          <div>{addr.line1}</div>
          {addr.line2 && <div>{addr.line2}</div>}
          <div>
            {addr.city}, {addr.state} {addr.postal_code}
          </div>
          <div>{addr.country}</div>
          {order.phone && <div className="mt-1">📞 {order.phone}</div>}
        </div>
        <div>
          <div className="text-xs uppercase text-muted-foreground mb-2">Items</div>
          <ul className="space-y-1">
            {order.order_items.map((it, i) => (
              <li key={i} className="flex justify-between">
                <span>
                  {it.quantity}× {it.product_name}
                </span>
                <span>{formatCents(it.unit_price_cents * it.quantity)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 pt-3 border-t border-border space-y-1 text-xs">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{formatCents(order.subtotal_cents)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>{formatCents(order.shipping_cents)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCents(order.total_cents)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3 pt-2">
        <div className="space-y-1">
          <Label className="text-xs">Status</Label>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUSES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Carrier</Label>
          <Input value={carrier} onChange={(e) => setCarrier(e.target.value)} />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Tracking #</Label>
          <Input value={tracking} onChange={(e) => setTracking(e.target.value)} />
        </div>
      </div>
      <Button onClick={save} disabled={busy} size="sm" className="rounded-full">
        {busy ? "Saving..." : "Save changes"}
      </Button>
    </div>
  );
}