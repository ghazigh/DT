// landing_page/src/pages/api/pilot-request.ts
import type { APIRoute } from 'astro';
import { pilotRequestSchema } from '@/lib/validation';

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ ok: false, error: 'Invalid JSON' }), {
      status: 400,
      headers: { 'content-type': 'application/json' }
    });
  }

  const parsed = pilotRequestSchema.safeParse(body);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ ok: false, error: 'Validation failed', issues: parsed.error.flatten() }),
      { status: 422, headers: { 'content-type': 'application/json' } }
    );
  }

  const env = (locals as any)?.runtime?.env ?? import.meta.env;
  const webhook: string | undefined = env.PILOT_WEBHOOK_URL;

  if (webhook) {
    try {
      await fetch(webhook, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          text: `New Sat Lab enquiry — ${parsed.data.interest}`,
          payload: parsed.data
        })
      });
    } catch (err) {
      console.error('pilot-request webhook failed', err);
    }
  } else {
    console.log('pilot-request (no webhook configured)', parsed.data);
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  });
};
