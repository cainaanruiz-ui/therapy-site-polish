import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Button } from "@/components/ui/button";
import { useCartStore, formatMoney } from "@/stores/cartStore";
import { Loader2, ArrowLeft, Minus, Plus } from "lucide-react";
import {
  PRODUCT_BY_HANDLE_QUERY,
  storefrontApiRequest,
  type ShopifyProductNode,
} from "@/lib/shopify";
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
  const { data: product, isLoading } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: async () => {
      const res = await storefrontApiRequest<{ productByHandle: ShopifyProductNode | null }>(
        PRODUCT_BY_HANDLE_QUERY,
        { handle },
      );
      const node = res?.data?.productByHandle ?? null;
      // Only therapy-centered products belong on this site
      if (!node || node.productType !== "Therapy & Wellness") return null;
      return node;
    },
  });
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

  // Initialize selected options from the first available variant once loaded
  if (product && Object.keys(selectedOptions).length === 0 && product.variants.edges.length > 0) {
    const initial =
      product.variants.edges.find((v) => v.node.availableForSale)?.node ??
      product.variants.edges[0].node;
    const opts: Record<string, string> = {};
    for (const so of initial.selectedOptions ?? []) opts[so.name] = so.value;
    setSelectedOptions(opts);
  }

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

  const allVariants = product.variants.edges.map((e) => e.node);
  const options = (product.options ?? []).filter(
    (o) => o.values.length > 1 || o.name.toLowerCase() !== "title",
  );

  const matchesSelection = (v: (typeof allVariants)[number]) =>
    (v.selectedOptions ?? []).every((so) => selectedOptions[so.name] === so.value);

  const variant =
    allVariants.find(matchesSelection) ??
    allVariants.find((v) => v.availableForSale) ??
    allVariants[0];

  const isValueAvailable = (name: string, value: string) =>
    allVariants.some(
      (v) =>
        v.availableForSale &&
        (v.selectedOptions ?? []).every((so) =>
          so.name === name ? so.value === value : selectedOptions[so.name] === so.value,
        ),
    );

  const image = product.images.edges[0]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions ?? [],
    });
    toast.success(`${product.title} added to cart`);
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
            {image && (
              <img
                src={image.url}
                alt={image.altText ?? product.title}
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              {variant
                ? formatMoney(variant.price.amount, variant.price.currencyCode)
                : formatMoney(
                    product.priceRange.minVariantPrice.amount,
                    product.priceRange.minVariantPrice.currencyCode,
                  )}
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {options.length > 0 && (
              <div className="mt-8 space-y-5">
                {options.map((opt) => (
                  <div key={opt.name}>
                    <p className="text-sm font-medium text-foreground mb-2">
                      {opt.name}
                      {selectedOptions[opt.name] && (
                        <span className="text-muted-foreground font-normal">
                          {" "}
                          — {selectedOptions[opt.name]}
                        </span>
                      )}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.map((value) => {
                        const selected = selectedOptions[opt.name] === value;
                        const available = isValueAvailable(opt.name, value);
                        return (
                          <button
                            key={value}
                            type="button"
                            onClick={() =>
                              setSelectedOptions((prev) => ({ ...prev, [opt.name]: value }))
                            }
                            className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                              selected
                                ? "border-primary bg-primary text-primary-foreground"
                                : available
                                  ? "border-border bg-background text-foreground hover:border-primary/60"
                                  : "border-border/60 bg-secondary/40 text-muted-foreground/60 line-through"
                            }`}
                          >
                            {value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

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
              <Button
                onClick={handleAdd}
                className="flex-1 rounded-full"
                size="lg"
                disabled={isAdding || !variant?.availableForSale}
              >
                {variant?.availableForSale === false ? "Sold out" : isAdding ? "Adding…" : "Add to cart"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}