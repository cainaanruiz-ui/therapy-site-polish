import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  listTherapists,
  listServiceTypes,
  listSessions,
  upsertSession,
  updateSessionStatus,
  deleteSession,
  type Session,
  type ServiceType,
  type Therapist,
} from "@/lib/billing.functions";
import { useServerFn } from "@tanstack/react-start";
import { formatMoney } from "@/stores/cartStore";
import { Plus, Trash2, CheckCircle2, CircleDollarSign } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/_authenticated/admin/billing")({
  component: BillingPage,
  head: () => ({
    meta: [
      { title: "Billing — Happy 2 Help Counseling" },
      { name: "description", content: "Therapist billing and payout dashboard." },
    ],
  }),
});

function BillingPage() {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Session | null>(null);

  const fetchTherapists = useServerFn(listTherapists);
  const fetchServiceTypes = useServerFn(listServiceTypes);
  const fetchSessions = useServerFn(listSessions);
  const saveSession = useServerFn(upsertSession);
  const setStatus = useServerFn(updateSessionStatus);
  const removeSession = useServerFn(deleteSession);

  const { data: therapists = [] } = useQuery({
    queryKey: ["therapists"],
    queryFn: fetchTherapists,
  });
  const { data: serviceTypes = [] } = useQuery({
    queryKey: ["service-types"],
    queryFn: fetchServiceTypes,
  });
  const { data: sessions = [] } = useQuery({
    queryKey: ["sessions"],
    queryFn: fetchSessions,
  });

  const saveMutation = useMutation({
    mutationFn: saveSession,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      setOpen(false);
      setEditing(null);
      toast.success("Session saved");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const statusMutation = useMutation({
    mutationFn: setStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: removeSession,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["sessions"] }),
    onError: (err: Error) => toast.error(err.message),
  });

  const totals = therapists.map((t) => {
    const therapistSessions = sessions.filter((s) => s.therapist_id === t.id);
    const billed = therapistSessions.reduce((sum, s) => sum + s.billed_cents, 0);
    const payout = therapistSessions.reduce((sum, s) => sum + s.therapist_split_cents, 0);
    return { ...t, billed, payout, count: therapistSessions.length };
  });

  return (
    <div className="mx-auto max-w-6xl px-5 sm:px-8 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl text-primary">Billing</h1>
          <p className="mt-1 text-muted-foreground">
            Log sessions, track billed amounts, and calculate therapist payouts.
          </p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              className="rounded-full"
              onClick={() => setEditing(null)}
            >
              <Plus className="w-4 h-4 mr-2" /> Log Session
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Session" : "Log Session"}</DialogTitle>
            </DialogHeader>
            <SessionForm
              therapists={therapists}
              serviceTypes={serviceTypes}
              initial={editing}
              onSubmit={(data) =>
                saveMutation.mutate({
                  data: { ...data, id: editing?.id },
                })
              }
              loading={saveMutation.isPending}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {totals.map((t) => (
          <div
            key={t.id}
            className="rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-card)]"
          >
            <h3 className="font-display text-xl text-primary">{t.name}</h3>
            <p className="text-sm text-muted-foreground">{t.split_percent}% split</p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Billed</div>
                <div className="text-lg font-semibold">{formatMoney((t.billed / 100).toFixed(2))}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-muted-foreground">Payout</div>
                <div className="text-lg font-semibold text-accent">{formatMoney((t.payout / 100).toFixed(2))}</div>
              </div>
            </div>
            <div className="mt-3 text-sm text-muted-foreground">{t.count} sessions logged</div>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-secondary/50 text-left">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Therapist</th>
              <th className="px-4 py-3 font-medium">Client</th>
              <th className="px-4 py-3 font-medium">Service</th>
              <th className="px-4 py-3 font-medium text-right">Billed</th>
              <th className="px-4 py-3 font-medium text-right">Payout (55%)</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sessions.map((s) => (
              <tr key={s.id} className="hover:bg-secondary/20">
                <td className="px-4 py-3 whitespace-nowrap">{s.session_date}</td>
                <td className="px-4 py-3">{s.therapist?.name}</td>
                <td className="px-4 py-3">
                  {s.client_name}
                  {s.client_insurance && (
                    <span className="block text-xs text-muted-foreground">{s.client_insurance}</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  {s.is_intake ? "Intake" : "Session"}
                  {s.service_type?.name && (
                    <span className="block text-xs text-muted-foreground">{s.service_type.name}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">{formatMoney((s.billed_cents / 100).toFixed(2))}</td>
                <td className="px-4 py-3 text-right text-accent">
                  {formatMoney((s.therapist_split_cents / 100).toFixed(2))}
                </td>
                <td className="px-4 py-3">
                  <Badge
                    variant={s.status === "paid" ? "default" : s.status === "submitted" ? "secondary" : "outline"}
                  >
                    {s.status}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {s.status !== "paid" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Mark paid"
                        onClick={() => statusMutation.mutate({ data: { id: s.id, status: "paid" } })}
                      >
                        <CircleDollarSign className="w-4 h-4" />
                      </Button>
                    )}
                    {s.status === "paid" && (
                      <Button
                        variant="ghost"
                        size="icon"
                        title="Mark logged"
                        onClick={() => statusMutation.mutate({ data: { id: s.id, status: "logged" } })}
                      >
                        <CheckCircle2 className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Edit"
                      onClick={() => {
                        setEditing(s);
                        setOpen(true);
                      }}
                    >
                      <Plus className="w-4 h-4 rotate-45" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete"
                      onClick={() => deleteMutation.mutate({ data: { id: s.id } })}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-muted-foreground">
                  No sessions logged yet. Click "Log Session" to add one.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SessionForm({
  therapists,
  serviceTypes,
  initial,
  onSubmit,
  loading,
}: {
  therapists: Therapist[];
  serviceTypes: ServiceType[];
  initial: Session | null;
  onSubmit: (data: Omit<Session, "id" | "therapist_split_cents" | "created_at" | "updated_at" | "therapist" | "service_type">) => void;
  loading: boolean;
}) {
  const [form, setForm] = useState({
    therapist_id: initial?.therapist_id ?? therapists[0]?.id ?? "",
    service_type_id: initial?.service_type_id ?? "",
    client_name: initial?.client_name ?? "",
    client_insurance: initial?.client_insurance ?? "",
    session_date: initial?.session_date ?? new Date().toISOString().split("T")[0],
    is_intake: initial?.is_intake ?? false,
    units: initial?.units ?? 1,
    billed_cents: initial ? (initial.billed_cents / 100).toFixed(2) : "",
    split_percent: initial?.split_percent ?? 55,
    status: initial?.status ?? "logged",
    notes: initial?.notes ?? "",
  });

  const selectedTherapist = therapists.find((t) => t.id === form.therapist_id);
  const selectedService = serviceTypes.find((st) => st.id === form.service_type_id);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cents = Math.round(parseFloat(form.billed_cents) * 100);
    onSubmit({
      therapist_id: form.therapist_id,
      service_type_id: form.service_type_id || null,
      client_name: form.client_name,
      client_insurance: form.client_insurance || null,
      session_date: form.session_date,
      is_intake: form.is_intake,
      units: Number(form.units),
      billed_cents: cents,
      split_percent: Number(form.split_percent),
      status: form.status,
      notes: form.notes || null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Therapist</Label>
          <Select
            value={form.therapist_id}
            onValueChange={(v) =>
              setForm((f) => ({
                ...f,
                therapist_id: v,
                split_percent: therapists.find((t) => t.id === v)?.split_percent ?? 55,
              }))
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select therapist" />
            </SelectTrigger>
            <SelectContent>
              {therapists.map((t) => (
                <SelectItem key={t.id} value={t.id}>
                  {t.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Split %</Label>
          <Input
            type="number"
            min={0}
            max={100}
            step={0.01}
            value={form.split_percent}
            onChange={(e) => setForm({ ...form, split_percent: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Client Name</Label>
          <Input value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} required />
        </div>
        <div className="space-y-2">
          <Label>Insurance / Payer</Label>
          <Input
            value={form.client_insurance}
            onChange={(e) => setForm({ ...form, client_insurance: e.target.value })}
            placeholder="e.g. Aetna"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Date</Label>
          <Input
            type="date"
            value={form.session_date}
            onChange={(e) => setForm({ ...form, session_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Units</Label>
          <Input
            type="number"
            min={1}
            value={form.units}
            onChange={(e) => setForm({ ...form, units: Number(e.target.value) })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Service Type</Label>
        <Select
          value={form.service_type_id}
          onValueChange={(v) => {
            const st = serviceTypes.find((x) => x.id === v);
            const amount = form.is_intake ? st?.intake_cents : st?.session_cents;
            setForm((f) => ({
              ...f,
              service_type_id: v,
              billed_cents: amount ? (amount / 100).toFixed(2) : f.billed_cents,
            }));
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select service type (optional)" />
          </SelectTrigger>
          <SelectContent>
            {serviceTypes
              .filter((st) => st.therapist_id === form.therapist_id)
              .map((st) => (
                <SelectItem key={st.id} value={st.id}>
                  {st.name} — {st.duration_minutes ? `${st.duration_minutes} min` : "no duration"}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center gap-2">
        <input
          id="is_intake"
          type="checkbox"
          checked={form.is_intake}
          onChange={(e) => {
            const checked = e.target.checked;
            const amount = checked ? selectedService?.intake_cents : selectedService?.session_cents;
            setForm((f) => ({
              ...f,
              is_intake: checked,
              billed_cents: amount ? (amount / 100).toFixed(2) : f.billed_cents,
            }));
          }}
          className="h-4 w-4 rounded border-border text-primary"
        />
        <Label htmlFor="is_intake" className="font-normal">
          This is an intake/evaluation
        </Label>
      </div>

      <div className="space-y-2">
        <Label>Billed Amount ($)</Label>
        <Input
          type="number"
          min={0}
          step={0.01}
          value={form.billed_cents}
          onChange={(e) => setForm({ ...form, billed_cents: e.target.value })}
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Status</Label>
        <Select value={form.status} onValueChange={(v) => setForm({ ...form, status: v as Session["status"] })}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="logged">Logged</SelectItem>
            <SelectItem value="submitted">Submitted</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Notes</Label>
        <Input value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
      </div>

      <Button type="submit" className="w-full rounded-full" disabled={loading}>
        {loading ? "Saving…" : "Save Session"}
      </Button>
    </form>
  );
}
