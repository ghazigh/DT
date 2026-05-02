// landing_page/src/components/interactive/ContactForm.tsx — Observatory
import { useState, type FormEvent } from 'react';
import { INTERESTS, pilotRequestSchema, type PilotRequest } from '@/lib/validation';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const interestLabels: Record<(typeof INTERESTS)[number], string> = {
  pilot: 'Pilot (utility / municipality)',
  partnership: 'Partnership',
  investment: 'Investment',
  press: 'Press',
  other: 'Other'
};

export default function ContactForm({ defaultInterest }: { defaultInterest?: string }) {
  const [status, setStatus] = useState<Status>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const form = new FormData(e.currentTarget);
    const payload: Record<string, string> = Object.fromEntries(form.entries()) as any;

    const result = pilotRequestSchema.safeParse(payload);
    if (!result.success) {
      const flat = result.error.flatten();
      const fieldErrors: Record<string, string> = {};
      for (const [k, v] of Object.entries(flat.fieldErrors)) {
        if (v && v[0]) fieldErrors[k] = v[0];
      }
      setErrors(fieldErrors);
      return;
    }

    setStatus('submitting');
    try {
      const res = await fetch('/api/pilot-request', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(result.data satisfies PilotRequest)
      });
      if (!res.ok) throw new Error(`Request failed: ${res.status}`);
      setStatus('success');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-ink bg-paper p-10">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-1.5 w-1.5 rounded-full bg-lime animate-pulse-dot"></span>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-lime-deep">TRANSMISSION · RECEIVED</span>
        </div>
        <h2 className="font-display text-4xl text-ink leading-tight font-semibold">Thank you.</h2>
        <p className="mt-6 text-ink-mid leading-relaxed">
          We'll reply within two business days. If it's urgent, email us at{' '}
          <a className="text-lime-deep no-underline hover:underline" href="mailto:hello@satlab.io">hello@satlab.io</a>.
        </p>
      </div>
    );
  }

  const kicker = 'block mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft';
  const input =
    'w-full border border-line bg-paper px-4 py-3.5 text-ink placeholder:text-ink-soft focus:border-lime-deep focus:outline-none transition-colors';

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div aria-hidden="true" className="absolute left-[-9999px] top-[-9999px]">
        <label htmlFor="honeypot">Do not fill</label>
        <input type="text" id="honeypot" name="honeypot" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="name" className={kicker}>NAME</label>
          <input id="name" name="name" required className={input} />
          {errors.name && <p className="mt-2 font-mono text-[11px] text-ink">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className={kicker}>EMAIL</label>
          <input id="email" name="email" type="email" required className={input} />
          {errors.email && <p className="mt-2 font-mono text-[11px] text-ink">{errors.email}</p>}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label htmlFor="organization" className={kicker}>ORGANIZATION</label>
          <input id="organization" name="organization" required className={input} />
          {errors.organization && <p className="mt-2 font-mono text-[11px] text-ink">{errors.organization}</p>}
        </div>
        <div>
          <label htmlFor="role" className={kicker}>ROLE</label>
          <input id="role" name="role" required className={input} />
          {errors.role && <p className="mt-2 font-mono text-[11px] text-ink">{errors.role}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="interest" className={kicker}>INTEREST</label>
        <select id="interest" name="interest" required defaultValue={defaultInterest ?? 'pilot'} className={input}>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>{interestLabels[i]}</option>
          ))}
        </select>
        {errors.interest && <p className="mt-2 font-mono text-[11px] text-ink">{errors.interest}</p>}
      </div>

      <div>
        <label htmlFor="message" className={kicker}>MESSAGE</label>
        <textarea id="message" name="message" required rows={7} className={input + ' resize-y'} placeholder="Tell us what you're trying to solve." />
        {errors.message && <p className="mt-2 font-mono text-[11px] text-ink">{errors.message}</p>}
      </div>

      <div className="flex items-center gap-5 pt-2">
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center gap-3 border border-ink bg-ink px-6 py-3.5 text-paper font-mono text-[11px] uppercase tracking-[0.18em] hover:bg-lime hover:border-lime hover:text-ink disabled:opacity-50 transition-colors"
        >
          {status === 'submitting' ? 'SENDING…' : 'SEND TRANSMISSION'}
          {status !== 'submitting' && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M7 2l4 4-4 4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
            </svg>
          )}
        </button>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-soft">
          REPLY · WITHIN 2 BUSINESS DAYS
        </span>
      </div>

      {status === 'error' && (
        <p className="text-sm text-ink">
          Something went wrong. Try again, or email us at <a className="underline" href="mailto:hello@satlab.io">hello@satlab.io</a>.
        </p>
      )}
    </form>
  );
}
