import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { PRODUCT_BY_HANDLE_QUERY, storefrontApiRequest } from "@/lib/shopify";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cartStore";
import { Loader2, ArrowLeft, Minus, Plus } from "lucide-react";

export const Route = createFileRoute("/shop/$handle")({
  component: ProductPage,
  head: ({ params }) => ({
    meta: [
      { title: `${params.handle.replace(/-/g, " ")} — Wellness Shop` },
      { name: "description", content: "Wellness product from Happy 2 Help Counseling." },
    ],
  }),
});

interface ProductDetail {
  id: string;
  title: string;
  description: string;
  handle: string;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  images: { edges: Array<{ node: { url: string; altText: string | null } }> };
  variants: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        price: { amount: string; currencyCode: string };
        availableForSale: boolean;
        selectedOptions: Array<{ name: string; value: string }>;
      };
    }>;
  };
  options: Array<{ name: string; values: string[] }>;
}

async function fetchProduct(handle: string): Promise<ProductDetail | null> {
  const data = await storefrontApiRequest(PRODUCT_BY_HANDLE_QUERY, { handle });
  return data?.data?.product || null;
}

function ProductPage() {
  const { handle } = Route.useParams();
  const { data: product, isLoading } = useQuery({
    queryKey: ["shopify-product", handle],
    queryFn: () => fetchProduct(handle),
  });
  const [variantIdx, setVariantIdx] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [imgIdx, setImgIdx] = useState(0);
  const addItem = useCartStore((s) => s.addItem);
  const isAdding = useCartStore((s) => s.isLoading);

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
          <p className="mt-3 text-muted-foreground">We couldn't find that item.</p>
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

  const variant = product.variants.edges[variantIdx]?.node;
  const images = product.images.edges;
  const mainImage = images[imgIdx]?.node;

  const handleAdd = async () => {
    if (!variant) return;
    await addItem({
      product: { node: product },
      variantId: variant.id,
      variantTitle: variant.title,
      price: variant.price,
      quantity,
      selectedOptions: variant.selectedOptions || [],
    });
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
          <div>
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/40 border border-border">
              {mainImage && (
                <img
                  src={mainImage.url}
                  alt={mainImage.altText || product.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {images.length > 1 && (
              <div className="mt-4 flex gap-3 flex-wrap">
                {images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 ${
                      i === imgIdx ? "border-primary" : "border-border"
                    }`}
                  >
                    <img src={img.node.url} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="font-display text-4xl md:text-5xl text-primary leading-tight">
              {product.title}
            </h1>
            <p className="mt-4 text-2xl font-semibold text-foreground">
              ${parseFloat(variant?.price.amount || product.priceRange.minVariantPrice.amount).toFixed(2)}
            </p>
            <p className="mt-6 text-muted-foreground leading-relaxed whitespace-pre-line">
              {product.description}
            </p>

            {product.variants.edges.length > 1 && (
              <div className="mt-8">
                <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">
                  Options
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((v, i) => (
                    <button
                      key={v.node.id}
                      onClick={() => setVariantIdx(i)}
                      className={`px-4 py-2 rounded-full text-sm border ${
                        i === variantIdx
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-background hover:bg-accent/30"
                      }`}
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
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
                disabled={isAdding || !variant || !variant.availableForSale}
                className="flex-1 rounded-full"
                size="lg"
              >
                {isAdding ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : !variant?.availableForSale ? (
                  "Sold out"
                ) : (
                  "Add to cart"
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}