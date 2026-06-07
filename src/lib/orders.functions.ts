import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const addressSchema = z.object({
  line1: z.string().min(1).max(255),
  line2: z.string().max(255).optional().nullable(),
  city: z.string().min(1).max(120),
  state: z.string().min(1).max(120),
  postal_code: z.string().min(1).max(20),
  country: z.string().min(2).max(2).default("US"),
});

const checkoutInput = z.object({
  customer_name: z.string().min(1).max(255),
  customer_email: z.string().email().max(255),
  phone: z.string().max(40).optional().nullable(),
  shipping_address: addressSchema,
  items: z
    .array(z.object({ product_id: z.string().uuid(), quantity: z.number().int().min(1).max(100) }))
    .min(1)
    .max(50),
  // Placeholder until CardPointe is wired in
  card_token: z.string().max(2000).optional().nullable(),
});

export const createOrder = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => checkoutInput.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    // Re-price on server using DB values
    const ids = data.items.map((i) => i.product_id);
    const { data: products, error: prodErr } = await supabaseAdmin
      .from("products")
      .select("id, name, price_cents, active, inventory")
      .in("id", ids);
    if (prodErr) throw new Error(prodErr.message);
    if (!products || products.length !== ids.length) throw new Error("One or more products were not found.");

    let subtotal = 0;
    const lineItems = data.items.map((it) => {
      const p = products.find((x) => x.id === it.product_id)!;
      if (!p.active) throw new Error(`Product unavailable: ${p.name}`);
      const line = p.price_cents * it.quantity;
      subtotal += line;
      return {
        product_id: p.id,
        product_name: p.name,
        quantity: it.quantity,
        unit_price_cents: p.price_cents,
      };
    });

    // Flat shipping + no tax for v1; configurable later
    const shipping_cents = subtotal > 0 ? 599 : 0;
    const tax_cents = 0;
    const total = subtotal + shipping_cents + tax_cents;

    // TODO: when CardPointe creds are provided, charge here and store retref before insert.
    const status = data.card_token ? "paid" : "pending";

    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .insert({
        customer_name: data.customer_name,
        customer_email: data.customer_email,
        phone: data.phone ?? null,
        shipping_address: data.shipping_address,
        subtotal_cents: subtotal,
        shipping_cents,
        tax_cents,
        total_cents: total,
        status,
      })
      .select("id")
      .single();
    if (orderErr) throw new Error(orderErr.message);

    const { error: itemsErr } = await supabaseAdmin
      .from("order_items")
      .insert(lineItems.map((li) => ({ ...li, order_id: order.id })));
    if (itemsErr) throw new Error(itemsErr.message);

    return { orderId: order.id, totalCents: total };
  });

export const getOrderPublic = createServerFn({ method: "GET" })
  .inputValidator((input: { id: string }) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select("id, customer_name, customer_email, total_cents, subtotal_cents, shipping_cents, tax_cents, status, created_at, order_items(product_name, quantity, unit_price_cents)")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return order;
  });