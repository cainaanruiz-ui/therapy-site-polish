CREATE TYPE public.session_status AS ENUM ('logged', 'submitted', 'paid');

CREATE TABLE public.therapists (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text,
    split_percent numeric(5,2) NOT NULL DEFAULT 55.00,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.therapists TO authenticated;
GRANT ALL ON public.therapists TO service_role;
ALTER TABLE public.therapists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage therapists"
ON public.therapists
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Therapists can view themselves"
ON public.therapists
FOR SELECT TO authenticated
USING (email = auth.email());

CREATE TABLE public.service_types (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    therapist_id uuid REFERENCES public.therapists(id) ON DELETE CASCADE NOT NULL,
    name text NOT NULL,
    intake_cents integer NOT NULL DEFAULT 0,
    session_cents integer NOT NULL DEFAULT 0,
    duration_minutes integer,
    insurance_payer text,
    notes text,
    active boolean NOT NULL DEFAULT true,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.service_types TO authenticated;
GRANT ALL ON public.service_types TO service_role;
ALTER TABLE public.service_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage service types"
ON public.service_types
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Therapists can view their service types"
ON public.service_types
FOR SELECT TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.therapists t
    WHERE t.id = service_types.therapist_id AND t.email = auth.email()
));

CREATE TABLE public.sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    therapist_id uuid REFERENCES public.therapists(id) ON DELETE RESTRICT NOT NULL,
    service_type_id uuid REFERENCES public.service_types(id) ON DELETE RESTRICT,
    client_name text NOT NULL,
    client_insurance text,
    session_date date NOT NULL,
    is_intake boolean NOT NULL DEFAULT false,
    units integer NOT NULL DEFAULT 1,
    billed_cents integer NOT NULL DEFAULT 0,
    therapist_split_cents integer GENERATED ALWAYS AS (round(billed_cents * (split_percent / 100))) STORED,
    split_percent numeric(5,2) NOT NULL DEFAULT 55.00,
    status public.session_status NOT NULL DEFAULT 'logged',
    notes text,
    created_by uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.sessions TO authenticated;
GRANT ALL ON public.sessions TO service_role;
ALTER TABLE public.sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage all sessions"
ON public.sessions
FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Therapists can view their own sessions"
ON public.sessions
FOR SELECT TO authenticated
USING (EXISTS (
    SELECT 1 FROM public.therapists t
    WHERE t.id = sessions.therapist_id AND t.email = auth.email()
));

INSERT INTO public.therapists (name, email, split_percent)
VALUES
    ('Luis E. Ruiz, LCSW', NULL, 55.00),
    ('Karen Sanchez, M.Ed.', NULL, 55.00),
    ('Brittany Henson, MSW', NULL, 55.00)
ON CONFLICT DO NOTHING;