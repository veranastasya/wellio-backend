import { z } from 'zod';
import { ImportSource, ImportStatus } from '../common/types';

export const ImportJobSchema = z.object({
  id: z.string().uuid(),
  client_id: z.string().uuid(),
  source: z.enum(['manual', 'mfp', 'fatsecret']),
  status: z.enum(['pending', 'processing', 'done', 'failed']),
  file_id: z.string().uuid().nullable(),
  created_at: z.string().datetime(),
  updated_at: z.string().datetime(),
});

export const CreateImportJobSchema = ImportJobSchema.omit({ 
  id: true, 
  status: true, 
  created_at: true, 
  updated_at: true 
});

export type ImportJob = z.infer<typeof ImportJobSchema>;
export type CreateImportJob = z.infer<typeof CreateImportJobSchema>;
