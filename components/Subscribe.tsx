"use client";

import React, { useState } from "react";

// Email capture for a static site. With no backend, this is configured at
// build time via env vars (no secrets or personal addresses committed):
//   1. NEXT_PUBLIC_SUBSCRIBE_ENDPOINT -> POSTs {email} to your form provider
//      (Formspree, Buttondown, Mailchimp embedded endpoint, a serverless fn...).
//   2. Else, if NEXT_PUBLIC_SUBSCRIBE_EMAIL is set -> opens a mailto: to it.
//   3. Else -> captures the address to localStorage and tells the visitor to
//      configure a provider. No hardcoded destination address ships in the
//      bundle.

const ENDPOINT = process.env.NEXT_PUBLIC_SUBSCRIBE_ENDPOINT || "";
const TO_EMAIL = process.env.NEXT_PUBLIC_SUBSCRIBE_EMAIL || "";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Subscribe({ compact = false }: { compact?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error" | "sending">("idle");
  const [msg, setMsg] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setStatus("error");
      setMsg("Please enter a valid email address.");
      return;
    }
    try {
      localStorage.setItem("guide529.subscriber", email);
    } catch {
      /* ignore */
    }

    if (ENDPOINT) {
      setStatus("sending");
      try {
        const res = await fetch(ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, list: "529-weekly" }),
        });
        if (res.ok) {
          setStatus("ok");
          setMsg("You're subscribed. Watch your inbox for the weekly top-10.");
          setEmail("");
          return;
        }
        throw new Error("Bad response");
      } catch {
        // fall through to mailto
      }
    }

    // No provider endpoint succeeded. If a destination address is configured,
    // open the visitor's mail client; otherwise just confirm the local capture.
    if (TO_EMAIL && typeof window !== "undefined") {
      const subject = encodeURIComponent("Subscribe me to the weekly 529 reading list");
      const body = encodeURIComponent(`Please add ${email} to the weekly 529 & college-funding digest.`);
      window.location.href = `mailto:${TO_EMAIL}?subject=${subject}&body=${body}`;
      setStatus("ok");
      setMsg("We opened your email app to finish subscribing.");
    } else {
      setStatus("ok");
      setMsg(
        "Saved on this device. To deliver the digest, configure a subscribe endpoint (NEXT_PUBLIC_SUBSCRIBE_ENDPOINT)."
      );
    }
    setEmail("");
  }

  return (
    <div className={compact ? "" : "card bg-gradient-to-br from-brand-600 to-brand-800 text-white"}>
      {!compact && (
        <>
          <h3 className="text-lg font-bold">Get the weekly top-10, automatically</h3>
          <p className="mt-1 text-sm text-brand-100">
            Every week we surface the ten best new articles on 529s, financial aid, and paying for college. No spam, unsubscribe anytime.
          </p>
        </>
      )}
      <form onSubmit={submit} className="mt-3 flex flex-col gap-2 sm:flex-row">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status !== "idle") setStatus("idle");
          }}
          placeholder="you@example.com"
          aria-label="Email address"
          className={
            "w-full rounded-lg px-4 py-2.5 text-sm text-slate-900 outline-none ring-2 ring-transparent focus:ring-brand-300 " +
            (compact ? "border border-slate-300 dark:bg-white" : "")
          }
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className={
            "shrink-0 rounded-lg px-5 py-2.5 text-sm font-semibold transition disabled:opacity-60 " +
            (compact
              ? "bg-brand-600 text-white hover:bg-brand-700"
              : "bg-white text-brand-700 hover:bg-brand-50")
          }
        >
          {status === "sending" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {status === "ok" && (
        <p className={"mt-2 text-sm font-medium " + (compact ? "text-accent-600 dark:text-accent-400" : "text-accent-100")}>
          {msg}
        </p>
      )}
      {status === "error" && (
        <p className={"mt-2 text-sm font-medium " + (compact ? "text-red-600" : "text-amber-200")}>{msg}</p>
      )}
      {!compact && (
        <p className="mt-2 text-xs text-brand-200">
          We never sell your address. This is an educational project, not financial advice.
        </p>
      )}
    </div>
  );
}
