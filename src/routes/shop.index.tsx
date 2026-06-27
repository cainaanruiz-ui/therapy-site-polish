import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useCartStore, formatMoney } from "@/stores/cartStore";
import { Loader2, ShoppingBag } from "lucide-react";
import { PRODUCTS_QUERY, storefrontApiRequest, type ShopifyProduct } from "@/lib/shopify";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/")({
  component: ShopPage,
  head: () => ({
    meta: [
      { title: "Wellness Shop — Happy 2 Help Counseling" },
      {
        name: "description",
        content:
          "Fidgets, sensory tools, and calming wellness items thoughtfully chosen to support your mental health journey.",
      },
      { property: "og:title", content: "Wellness Shop — Happy 2 Help Counseling" },
      {
        property: "og:description",
        content: "Fidgets and wellness tools to support your mental health.",
      },
    ],
  }),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <SiteLayout>
        <div className="text-center py-32">
          <p className="text-muted-foreground">Unable to load the shop.</p>
          <Button
            className="mt-4"
            onClick={() => {
              router.invalidate();
              reset();
            }}
          >
            Try again
          </Button>
        </div>
      </SiteLayout>
    );
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="py-32 text-center text-muted-foreground">Page not found</div>
    </SiteLayout>
  ),
});

function ShopPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: async () => {
      const res = await storefrontApiRequest<{ products: { edges: ShopifyProduct[] } }>(
        PRODUCTS_QUERY,
        { first: 50 },
      );
      return res?.data?.products?.edges ?? [];
    },
  });

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-16 md:pt-20 pb-10">
        <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Shop</div>
        <h1 className="font-display text-5xl md:text-6xl text-primary max-w-3xl leading-[1.05]">
          Wellness tools for everyday calm.
        </h1>
        <p className="mt-5 text-lg text-muted-foreground max-w-2xl">
          A small, thoughtful collection of fidgets and sensory tools chosen to support your mental
          health journey between sessions.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 sm:px-8 pb-24">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : error ? (
          <div className="text-center py-20 text-muted-foreground">
            Unable to load products. Please try again later.
          </div>
        ) : !products || products.length === 0 ? (
          <div className="text-center py-20 rounded-3xl border border-dashed border-border">
            <ShoppingBag className="w-10 h-10 mx-auto text-accent mb-4" />
            <h2 className="font-display text-2xl text-primary">No products yet</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              Our curated wellness collection is coming soon.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.node.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product }: { product: ShopifyProduct }) {
  const addItem = useCartStore((s) => s.addItem);
  const isLoading = useCartStore((s) => s.isLoading);
  const node = product.node;
  const variant = node.variants.edges[0]?.node;
  const image = node.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success(`${node.title} added to cart`);
  };

  return (
    <div className="group rounded-3xl bg-card border border-border overflow-hidden flex flex-col">
      <Link
        to="/shop/$handle"
        params={{ handle: node.handle }}
        className="block aspect-square bg-secondary/40 overflow-hidden"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText ?? node.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            <ShoppingBag className="w-8 h-8" />
          </div>
        )}
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <Link
          to="/shop/$handle"
          params={{ handle: node.handle }}
          className="font-display text-xl text-primary hover:underline"
        >
          {node.title}
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {node.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-foreground">
            {formatMoney(
              node.priceRange.minVariantPrice.amount,
              node.priceRange.minVariantPrice.currencyCode,
            )}
          </span>
          <Button onClick={handleAdd} className="rounded-full" size="sm" disabled={isLoading || !variant?.availableForSale}>
            {variant?.availableForSale === false ? "Sold out" : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}