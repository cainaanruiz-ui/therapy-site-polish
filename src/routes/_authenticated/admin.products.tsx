import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { adminListProducts, deleteProduct, upsertProduct } from "@/lib/admin.functions";
import { formatCents } from "@/stores/cartStore";
import { Loader2, Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/products")({
  component: ProductsAdmin,
});

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  price_cents: number;
  image_url: string | null;
  cj_product_id: string | null;
  inventory: number;
  active: boolean;
};

function ProductsAdmin() {
  const list = useServerFn(adminListProducts);
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin-products"], queryFn: () => list() });
  const [editing, setEditing] = useState<Product | null>(null);
  const [open, setOpen] = useState(false);

  const onSaved = () => {
    qc.invalidateQueries({ queryKey: ["admin-products"] });
    qc.invalidateQueries({ queryKey: ["products"] });
    setOpen(false);
  };

  return (
    <div>
      <div className="flex justify-end mb-4">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() => setEditing(null)}
              className="rounded-full"
            >
              <Plus className="w-4 h-4 mr-2" /> New product
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-xl">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit product" : "New product"}</DialogTitle>
            </DialogHeader>
            <ProductForm initial={editing} onSaved={onSaved} />
          </DialogContent>
        </Dialog>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-6 h-6 animate-spin text-primary" />
        </div>
      ) : !data || data.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border py-16 text-center text-muted-foreground">
          No products yet. Click "New product" to add your first item.
        </div>
      ) : (
        <div className="rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr className="text-left">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Inventory</th>
                <th className="px-4 py-3">Active</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody>
              {data.map((p) => {
                const product = p as Product;
                return (
                  <tr key={product.id} className="border-t border-border">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {product.image_url && (
                          <img
                            src={product.image_url}
                            alt=""
                            className="w-10 h-10 rounded object-cover"
                          />
                        )}
                        <div>
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-muted-foreground">/{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{formatCents(product.price_cents)}</td>
                    <td className="px-4 py-3">{product.inventory}</td>
                    <td className="px-4 py-3">{product.active ? "Yes" : "No"}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setEditing(product);
                          setOpen(true);
                        }}
                      >
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <DeleteBtn id={product.id} onDone={onSaved} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function DeleteBtn({ id, onDone }: { id: string; onDone: () => void }) {
  const del = useServerFn(deleteProduct);
  const [busy, setBusy] = useState(false);
  return (
    <Button
      variant="ghost"
      size="icon"
      disabled={busy}
      onClick={async () => {
        if (!confirm("Delete this product?")) return;
        setBusy(true);
        try {
          await del({ data: { id } });
          toast.success("Deleted");
          onDone();
        } catch (e) {
          toast.error(e instanceof Error ? e.message : "Failed");
        } finally {
          setBusy(false);
        }
      }}
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  );
}

function ProductForm({
  initial,
  onSaved,
}: {
  initial: Product | null;
  onSaved: () => void;
}) {
  const save = useServerFn(upsertProduct);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState(initial?.name ?? "");
  const [slug, setSlug] = useState(initial?.slug ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");
  const [price, setPrice] = useState(
    initial ? (initial.price_cents / 100).toFixed(2) : "",
  );
  const [imageUrl, setImageUrl] = useState(initial?.image_url ?? "");
  const [cjId, setCjId] = useState(initial?.cj_product_id ?? "");
  const [inventory, setInventory] = useState(initial?.inventory ?? 0);
  const [active, setActive] = useState(initial?.active ?? true);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      await save({
        data: {
          id: initial?.id,
          name,
          slug:
            slug.trim() ||
            name
              .toLowerCase()
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-|-$/g, ""),
          description: description || null,
          price_cents: Math.round(parseFloat(price) * 100),
          image_url: imageUrl || null,
          cj_product_id: cjId || null,
          inventory: Number(inventory),
          active,
        },
      });
      toast.success("Saved");
      onSaved();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed");
    } finally {
      setBusy(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input required value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="space-y-2">
        <Label>Slug (URL)</Label>
        <Input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          placeholder="auto-generated from name"
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          rows={4}
          value={description ?? ""}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Price (USD)</Label>
          <Input
            required
            type="number"
            step="0.01"
            min="0"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Inventory</Label>
          <Input
            type="number"
            min="0"
            value={inventory}
            onChange={(e) => setInventory(Number(e.target.value))}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Image URL</Label>
        <Input
          type="url"
          value={imageUrl ?? ""}
          onChange={(e) => setImageUrl(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>CJ Dropshipping product ID (optional)</Label>
        <Input value={cjId ?? ""} onChange={(e) => setCjId(e.target.value)} />
      </div>
      <div className="flex items-center justify-between rounded-lg border border-border p-3">
        <div>
          <Label>Active</Label>
          <p className="text-xs text-muted-foreground">Visible in the shop</p>
        </div>
        <Switch checked={active} onCheckedChange={setActive} />
      </div>
      <Button type="submit" disabled={busy} className="w-full rounded-full">
        {busy ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}