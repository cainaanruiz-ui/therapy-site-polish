import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useCartStore, formatCents } from "@/stores/cartStore";
import { Loader2, ArrowLeft, Minus, Plus } from "lucide-react";
import { getProductBySlug } from "@/lib/products.functions";
import { toast } from "sonner";

export const Route = createFileRoute("/shop/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — Wellness Shop` },
      { name: "description", content: "Wellness product from Happy 2 Help Counseling." },
    ],
  }),
  errorComponent: ({ reset }) => {
    const router = useRouter();
    return (
      <SiteLayout>
        <div className="text-center py-32">
          <p className="text-muted-foreground">Couldn't load this product.</p>
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
      <div className="py-32 text-center text-muted-foreground">Product not found</div>
    </SiteLayout>
  ),
});

function ProductPage() {
  const { handle } = Route.useParams();
  const fetchProduct = useServerFn(getProductBySlug);
  const { data: product, isLoading } = useQuery({
    queryKey: ["product", handle],
    queryFn: () => fetchProduct({ data: { slug: handle } }),
  });
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);

  if (isLoading) {
    return (
      <SiteLayout>
        <div className="flex justify-center py-32">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </SiteLayout>
    );
  }

  if (!product) {
    return (
      <SiteLayout>
        <div className="mx-auto max-w-3xl px-5 sm:px-8 py-24 text-center">
          <h1 className="font-display text-4xl text-primary">Product not found</h1>
          <Link
            to="/shop"
            className="mt-6 inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Back to shop
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const handleAdd = () => {
    addItem(
      {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        imageUrl: product.image_url,
        priceCents: product.price_cents,
      },
      quantity,
    );
    toast.success(`${product.name} added to cart`);
  };

  return (
    <SiteLayout>
      <section className="mx-auto max-w-6xl px-5 sm:px-8 pt-10 pb-20">
        <Link
          to="/shop"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-8"
        >
          <ArrowLeft size={14} /> Back to shop
        </Link>
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/40 border border-border">
            {product.image_url && (
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
              {product.name}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {formatCents(product.price_cents)}
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            <div className="mt-8 flex items-center gap-4">
              <div className="inline-flex items-center border border-border rounded-full">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={14} />
                </Button>
                <span className="w-8 text-center text-sm">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <Button onClick={handleAdd} className="flex-1 rounded-full" size="lg">
                Add to cart
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}