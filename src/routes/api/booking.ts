import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const BOOKING_API_URL = "https://h2h-booking-api-198737903207.us-east1.run.app";

const bookingSchema = z.object({
  name: z.string().trim().min(1).max(120),
  email: z.string().trim().email().max(254),
  times: z.string().trim().max(500).optional().default(""),
  message: z.string().trim().max(3000).optional().default(""),
});

export const Route = createFileRoute("/api/booking")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const apiKey = process.env.BOOKING_API_KEY;

        if (!apiKey) {
          console.error("BOOKING_API_KEY is not configured.");
          return Response.json(
            { error: "Booking is temporarily unavailable. Please call or email us directly." },
            { status: 500 },
          );
        }

        let payload: z.infer<typeof bookingSchema>;
        try {
          payload = bookingSchema.parse(await request.json());
        } catch (error) {
          console.error("Invalid booking request:", error);
          return Response.json(
            { error: "Please enter a valid name and email before sending." },
            { status: 400 },
          );
        }

        try {
          const response = await fetch(`${BOOKING_API_URL}/send`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "x-api-key": apiKey,
            },
            body: JSON.stringify(payload),
          });

          if (!response.ok) {
            const details = await response.text();
            console.error("Google booking backend failed:", response.status, details);
            return Response.json(
              { error: "The booking email could not be sent. Please email or call us directly." },
              { status: 502 },
            );
          }

          return Response.json({ ok: true });
        } catch (error) {
          console.error("Booking request failed:", error);
          return Response.json(
            { error: "The booking email could not be sent. Please email or call us directly." },
            { status: 502 },
          );
        }
      },
    },
  },
});
