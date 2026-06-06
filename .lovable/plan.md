
## Goal

Add a small online store to Happy 2 Help Counseling for wellness products (fidgets, sensory tools, calming items) — without disrupting the existing therapy site.

## Approach

Use **Shopify** as the backend (handles inventory, payments, checkout, shipping, taxes). You'll get a development store for free while building, and only need a paid Shopify plan once you're ready to actually sell. Lovable handles checkout via Shopify's secure flow — no need to build cart/payment logic from scratch.

## What I'll build

### New routes
- `/shop` — Product catalog grid (image, name, price, "Add to cart")
- `/shop/$handle` — Single product page (gallery, description, variant selector, quantity, add to cart)
- `/cart` — Cart drawer or page with line items, quantities, subtotal, "Checkout" button that hands off to Shopify's hosted checkout

### Header/footer updates
- Add a "Shop" link to the main nav (alongside Services, Team, Contact)
- Cart icon in the header showing item count

### Design
- Match the existing warm, calming counseling aesthetic (same fonts, palette, rounded cards)
- Product cards styled like the existing service cards for consistency
- Wellness-focused copy framing the shop as an extension of the practice's care

### State
- Cart stored in `localStorage` (persists across page loads) with React context
- Product data fetched live from Shopify Storefront API

## What you'll do

1. Approve the Shopify enable step — I'll prompt you to choose **Create a new store** (free dev store) or **Connect existing store**
2. After enabling, add your products in the Shopify admin (or I can help script initial products)
3. When ready to launch: claim the store (starts 30-day free Shopify trial), then pick a Shopify plan to accept real payments

## Cost note

- **Building**: $0 — development store is free for as long as you need
- **Going live**: Requires a paid Shopify subscription after the 30-day trial that starts when you claim the store
- See [Shopify's pricing page](https://www.shopify.com/pricing) for current plans

## Next step

I'll ask you to pick **new store** vs **existing store**, then enable the Shopify integration.
