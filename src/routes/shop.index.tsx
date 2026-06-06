import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { PRODUCTS_QUERY, ShopifyProduct, storefrontApiRequest } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ShoppingBag } from "lucide-react";

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
});

async function fetchProducts(): Promise<ShopifyProduct[]> {
  const data = await storefrontApiRequest(PRODUCTS_QUERY, { first: 50, query: null });
  return data?.data?.products?.edges || [];
}

function ShopPage() {
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["shopify-products"],
    queryFn: fetchProducts,
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
            <h2 className="font-display text-2xl text-primary">No products found</h2>
            <p className="mt-2 text-muted-foreground max-w-md mx-auto">
              The shop is coming soon. Check back shortly for our curated wellness collection.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.node.id} product={product} />
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
  const variant = product.node.variants.edges[0]?.node;
  const image = product.node.images.edges[0]?.node;
  const price = product.node.priceRange.minVariantPrice;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product,
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity: 1,
      selectedOptions: variant.selectedOptions || [],
    });
  };

  return (
    <div className="group rounded-3xl bg-card border border-border overflow-hidden flex flex-col">
      <Link
        to="/shop/$handle"
        params={{ handle: product.node.handle }}
        className="block aspect-square bg-secondary/40 overflow-hidden"
      >
        {image ? (
          <img
            src={image.url}
            alt={image.altText || product.node.title}
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
          params={{ handle: product.node.handle }}
          className="font-display text-xl text-primary hover:underline"
        >
          {product.node.title}
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.node.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-foreground">
            ${parseFloat(price.amount).toFixed(2)}
          </span>
          <Button
            onClick={handleAdd}
            disabled={isLoading || !variant || !variant.availableForSale}
            className="rounded-full"
            size="sm"
          >
            {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Add to cart"}
          </Button>
        </div>
      </div>
    </div>
  );
}