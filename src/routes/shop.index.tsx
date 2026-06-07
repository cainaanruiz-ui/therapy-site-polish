import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useCartStore, formatCents } from "@/stores/cartStore";
import { Loader2, ShoppingBag } from "lucide-react";
import { listProducts } from "@/lib/products.functions";
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

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  inventory: number;
  active: boolean;
};

function ShopPage() {
  const fetchProducts = useServerFn(listProducts);
  const { data: products, isLoading, error } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
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
              <ProductCard key={p.id} product={p as Product} />
            ))}
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);

  const handleAdd = () => {
    addItem({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      imageUrl: product.image_url,
      priceCents: product.price_cents,
    });
    toast.success(`${product.name} added to cart`);
  };

  return (
    <div className="group rounded-3xl bg-card border border-border overflow-hidden flex flex-col">
      <Link
        to="/shop/$handle"
        params={{ handle: product.slug }}
        className="block aspect-square bg-secondary/40 overflow-hidden"
      >
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
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
          params={{ handle: product.slug }}
          className="font-display text-xl text-primary hover:underline"
        >
          {product.name}
        </Link>
        <p className="mt-2 text-sm text-muted-foreground line-clamp-2 flex-1">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <span className="text-lg font-semibold text-foreground">
            {formatCents(product.price_cents)}
          </span>
          <Button onClick={handleAdd} className="rounded-full" size="sm">
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
}