## Custom CardPointe Checkout — Build Plan

Replace Shopify checkout with a custom flow on your Lovable site using CardPointe's Hosted iFrame Tokenizer. You'll still source/fulfill products via CJ Dropshipping manually.

### What gets built

1. **Product catalog (Lovable Cloud)**
   - `products` table: id, name, description, price_cents, image_url, cj_product_id, inventory, active
   - Admin page `/admin/products` (auth-gated) to add/edit products
   - Public `/shop` and `/product/:id` pages read from this table

2. **Cart**
   - Client-side cart (Zustand) persisted to localStorage
   - Cart drawer with quantity, remove, subtotal
   - `/cart` page

3. **Checkout flow** (`/checkout`)
   - Customer info form (name, email, shipping address)
   - Shipping cost (flat rate to start — configurable)
   - Tax (flat % to start — configurable per state later)
   - CardPointe Hosted iFrame Tokenizer embedded to collect card → returns a token
   - On submit: server function takes token + order details, calls CardPointe Gateway API to authorize/capture payment
   - Creates `orders` + `order_items` rows, clears cart, redirects to `/order-confirmation/:id`

4. **Order management**
   - `orders` table: id, user_email, total_cents, status, shipping_address, cardpointe_retref, created_at
   - `order_items` table: order_id, product_id, quantity, price_cents
   - Admin page `/admin/orders` showing all orders + status (pending → fulfilled → shipped)
   - Manual "Mark as ordered on CJ" / "Mark as shipped" buttons + tracking number field

5. **Email notifications** (Resend)
   - Order confirmation to customer
   - New order alert to you

### What you'll need to provide (later, when ready)
- CardPointe merchant ID (MID)
- CardPointe API username + password
- CardPointe Tokenizer site key
- Whether you want sandbox or production credentials first
- Resend API key (for emails) — or skip emails for v1

### Technical details
- Server functions handle all CardPointe API calls (never expose credentials to browser)
- Tokenizer iframe collects card data → PCI scope stays minimal
- Tables get RLS: products public-read, orders user-scoped + admin-all via `user_roles`
- CJ integration stays manual for v1 (you copy orders into CJ); CJ API automation can come later

### Build order
1. DB schema (products, orders, order_items, user_roles)
2. Admin product CRUD
3. Shop + product detail pages reading from DB
4. Cart store + drawer
5. Checkout page with shipping/customer form (no payment yet)
6. CardPointe iframe + tokenization
7. Server function for charge + order creation
8. Order confirmation page
9. Admin orders dashboard
10. Email notifications (optional)

### Out of scope for v1
- Automated CJ fulfillment via their API
- Multi-warehouse shipping calc
- Discount codes
- Subscriptions/recurring billing
- Refunds UI (can be done manually via CardPointe dashboard for now)

I'll start with steps 1–4 in this first pass so you can see the shape, then we'll wire payment last once you have your CardPointe creds.