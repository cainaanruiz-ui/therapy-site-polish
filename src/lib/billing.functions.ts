import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export type Therapist = {
  id: string;
  name: string;
  email: string | null;
  split_percent: number;
  active: boolean;
};

export type ServiceType = {
  id: string;
  therapist_id: string;
  name: string;
  intake_cents: number;
  session_cents: number;
  duration_minutes: number | null;
  insurance_payer: string | null;
  notes: string | null;
  active: boolean;
};

export type Session = {
  id: string;
  therapist_id: string;
  service_type_id: string | null;
  client_name: string;
  client_insurance: string | null;
  session_date: string;
  is_intake: boolean;
  duration_minutes: number | null;
  units: number;
  billed_cents: number;
  therapist_split_cents: number;
  split_percent: number;
  status: "logged" | "submitted" | "paid";
  notes: string | null;
  therapist: Therapist;
  service_type: ServiceType | null;
};

export const listTherapists = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("therapists")
      .select("*")
      .order("name");
    if (error) throw new Error(error.message);
    return (data ?? []) as Therapist[];
  });

export type TherapistInput = Omit<Therapist, "id"> & { id?: string };

export const upsertTherapist = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: TherapistInput) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { id, ...rest } = data;
    const payload = {
      ...rest,
      updated_at: new Date().toISOString(),
    };
    const { data: result, error } =
      id && id !== "new"
        ? await context.supabase.from("therapists").update(payload).eq("id", id).select().single()
        : await context.supabase.from("therapists").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return result as Therapist;
  });

export const listServiceTypes = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("service_types")
      .select("*")
      .eq("active", true)
      .order("name");
    if (error) throw new Error(error.message);
    return (data ?? []) as ServiceType[];
  });

export type ServiceTypeInput = Omit<ServiceType, "id"> & { id?: string };

export const upsertServiceType = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: ServiceTypeInput) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { id, ...rest } = data;
    const payload = {
      ...rest,
      updated_at: new Date().toISOString(),
    };
    const { data: result, error } =
      id && id !== "new"
        ? await context.supabase.from("service_types").update(payload).eq("id", id).select().single()
        : await context.supabase.from("service_types").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return result as ServiceType;
  });

export const listSessions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("sessions")
      .select("*, therapist:therapist_id(*), service_type:service_type_id(*)")
      .order("session_date", { ascending: false });
    if (error) throw new Error(error.message);
    return (data ?? []) as unknown as Session[];
  });

export type SessionInput = Omit<
  Session,
  "id" | "therapist_split_cents" | "created_at" | "updated_at" | "therapist" | "service_type"
> & { id?: string };

export const upsertSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: SessionInput) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { id, ...rest } = data;
    const payload = {
      ...rest,
      created_by: context.userId,
      updated_at: new Date().toISOString(),
    };
    const { data: result, error } =
      id && id !== "new"
        ? await context.supabase.from("sessions").update(payload).eq("id", id).select().single()
        : await context.supabase.from("sessions").insert(payload).select().single();
    if (error) throw new Error(error.message);
    return result as unknown as Session;
  });

export const updateSessionStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string; status: Session["status"] }) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { error } = await context.supabase
      .from("sessions")
      .update({ status: data.status, updated_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteSession = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { error } = await context.supabase.from("sessions").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteTherapist = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { count } = await context.supabase
      .from("sessions")
      .select("id", { count: "exact", head: true })
      .eq("therapist_id", data.id);
    if ((count ?? 0) > 0) {
      throw new Error(
        "This therapist has logged sessions. Delete or reassign those sessions first, or mark the therapist inactive.",
      );
    }

    await context.supabase.from("service_types").delete().eq("therapist_id", data.id);
    const { error } = await context.supabase.from("therapists").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });

export const deleteServiceType = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { id: string }) => input)
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { error } = await context.supabase.from("service_types").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });
