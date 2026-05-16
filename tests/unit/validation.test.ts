import { describe, it, expect } from 'vitest';
import { pilotRequestSchema } from '@/lib/validation';

const validPayload = {
  name: 'Alex Example',
  email: 'alex@example.com',
  organization: 'Utility Co.',
  role: 'VP Transmission & Distribution',
  interest: 'pilot',
  message: 'We run 8,000 km of transmission and want to pilot a 100 km corridor.'
};

describe('pilotRequestSchema', () => {
  it('accepts a well-formed payload', () => {
    const result = pilotRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
  });

  it('rejects an invalid email', () => {
    const result = pilotRequestSchema.safeParse({ ...validPayload, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('requires name between 2 and 120 characters', () => {
    expect(pilotRequestSchema.safeParse({ ...validPayload, name: 'A' }).success).toBe(false);
    expect(pilotRequestSchema.safeParse({ ...validPayload, name: 'A'.repeat(121) }).success).toBe(false);
    expect(pilotRequestSchema.safeParse({ ...validPayload, name: 'Alex' }).success).toBe(true);
  });

  it('requires a recognized interest value', () => {
    const result = pilotRequestSchema.safeParse({ ...validPayload, interest: 'spam' });
    expect(result.success).toBe(false);
  });

  it('rejects messages over 4000 characters', () => {
    const longMessage = 'x'.repeat(4001);
    const result = pilotRequestSchema.safeParse({ ...validPayload, message: longMessage });
    expect(result.success).toBe(false);
  });

  it('strips optional honeypot field if absent', () => {
    const result = pilotRequestSchema.safeParse(validPayload);
    expect(result.success).toBe(true);
    if (result.success) {
      expect('honeypot' in result.data).toBe(false);
    }
  });

  it('rejects payload when honeypot field is filled (bot signal)', () => {
    const result = pilotRequestSchema.safeParse({ ...validPayload, honeypot: 'bot filled this' });
    expect(result.success).toBe(false);
  });
});
