import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_HOST: z.string().url(),
});

export const env = envSchema.parse(process.env);
