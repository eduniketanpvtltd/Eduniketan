// Direct Supabase DDL via POST to the postgrest schema endpoint
// This approach creates a temporary RPC function to run DDL

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ckjkngdidervdyfzosyv.supabase.co';
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNramtuZ2RpZGVydmR5Znpvc3l2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4NDU0MTgwMSwiZXhwIjoyMTAwMTE3ODAxfQ.R3Ff9_SJ7v50NzCqVR8ZR8cisA8kg8PCol7OUr_CHik';

const supabase = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false }
});

// Use the Supabase REST API "pg-sodium" or direct call approach
// Supabase exposes /rest/v1/rpc/<function> for calling PG functions
// We'll try calling pgsodium or pgcrypto built-ins, or use a raw query via the Realtime API

async function tryDirectSQL() {
  console.log('Trying to create tables via Supabase...\n');

  // Strategy: Use supabase.schema() which maps to PostgREST schema switching
  // Then use the admin client to call the internal pg function

  // Step 1: Check if tables already exist via REST introspection
  const formsRes = await fetch(`${SUPABASE_URL}/rest/v1/recruitment_forms?limit=0`, {
    headers: {
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'apikey': SERVICE_KEY,
    }
  });
  
  if (formsRes.status === 200) {
    console.log('✅ recruitment_forms table already exists!');
    return;
  }
  
  console.log(`recruitment_forms status: ${formsRes.status} — table needs to be created`);

  // Step 2: Use PostgREST to call the built-in pg_catalog functions
  // Try calling pg_query_settings or similar
  
  // Method: Use Supabase's internal SQL endpoint via the edge runtime
  // The /sql endpoint is available on hosted Supabase when called with service role
  const sqlEndpoints = [
    `${SUPABASE_URL}/pg-meta/v1/query`,
    `${SUPABASE_URL}/rest/v1/rpc/query`,
    `${SUPABASE_URL}/pg/query`,
  ];

  const CREATE_SQL = `
    CREATE TABLE IF NOT EXISTS public.recruitment_forms (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT DEFAULT '',
      fields JSONB DEFAULT '[]'::jsonb,
      is_published BOOLEAN DEFAULT false,
      deadline DATE,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
    );
    CREATE TABLE IF NOT EXISTS public.recruitment_submissions (
      id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
      form_id UUID REFERENCES public.recruitment_forms(id) ON DELETE CASCADE,
      form_title TEXT NOT NULL,
      data JSONB DEFAULT '{}'::jsonb,
      status TEXT DEFAULT 'NEW',
      ip_address TEXT,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_rec_subs_form_id ON public.recruitment_submissions(form_id);
    ALTER TABLE public.recruitment_forms ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.recruitment_submissions ENABLE ROW LEVEL SECURITY;
  `;

  for (const endpoint of sqlEndpoints) {
    const r = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SERVICE_KEY}`,
        'apikey': SERVICE_KEY,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: CREATE_SQL })
    });
    console.log(`${endpoint}: ${r.status} ${await r.text().then(t => t.slice(0, 100))}`);
    if (r.status === 200) {
      console.log('✅ Tables created!');
      break;
    }
  }
}

tryDirectSQL().catch(console.error);
