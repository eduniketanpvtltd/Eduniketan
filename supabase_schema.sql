-- Eduniketan Production Supabase Database Schema

-- ============================================================
-- RECRUITMENT FORM SYSTEM (added 2026-08)
-- ============================================================

-- 6. Recruitment Forms Table (dynamic form builder schema)
CREATE TABLE IF NOT EXISTS public.recruitment_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  fields JSONB DEFAULT '[]'::jsonb, -- Array of field definition objects
  is_published BOOLEAN DEFAULT false,
  deadline DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Recruitment Submissions Table
CREATE TABLE IF NOT EXISTS public.recruitment_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  form_id UUID REFERENCES public.recruitment_forms(id) ON DELETE CASCADE,
  form_title TEXT NOT NULL,
  data JSONB DEFAULT '{}'::jsonb, -- { fieldId: value } map
  status TEXT DEFAULT 'NEW', -- NEW | REVIEWED | SHORTLISTED | REJECTED
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for fast filtering by form
CREATE INDEX IF NOT EXISTS idx_recruitment_submissions_form_id
  ON public.recruitment_submissions(form_id);

-- Recruitment file storage bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('eduniketan-recruitment', 'eduniketan-recruitment', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Read Recruitment Files"
ON storage.objects FOR SELECT
USING (bucket_id = 'eduniketan-recruitment');

CREATE POLICY "Public Upload Recruitment Files"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'eduniketan-recruitment');

CREATE POLICY "Public Delete Recruitment Files"
ON storage.objects FOR DELETE
USING (bucket_id = 'eduniketan-recruitment');

-- ============================================================

-- 1. Create Enquiries Table
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  institution TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  product TEXT DEFAULT 'General Enquiry',
  message TEXT,
  status TEXT DEFAULT 'NEW',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Feedback Table (Real-Time Student/TPO Reviews)
CREATE TABLE IF NOT EXISTS public.feedback (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  author_name TEXT NOT NULL,
  institution TEXT NOT NULL,
  role TEXT DEFAULT 'Student',
  rating INT DEFAULT 5,
  comment TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Albums Table (Supports Multi-Photo Arrays with Per-Image Captions)
CREATE TABLE IF NOT EXISTS public.albums (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  location TEXT,
  date TEXT,
  caption TEXT NOT NULL, -- Album description/overview
  image_url TEXT,       -- Cover image URL
  gradient TEXT DEFAULT 'from-blue-600 to-indigo-800',
  images JSONB DEFAULT '[]'::jsonb, -- Array of { id, url, caption }
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3b. Create Separate Album Images Table (Optional relational model)
CREATE TABLE IF NOT EXISTS public.album_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  album_id UUID REFERENCES public.albums(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  caption TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create Stats Table
CREATE TABLE IF NOT EXISTS public.stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  value INT NOT NULL,
  suffix TEXT DEFAULT '',
  label TEXT NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create Admin Users Table
CREATE TABLE IF NOT EXISTS public.admin_users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Insert Default Admin User
INSERT INTO public.admin_users (email, password, name)
VALUES ('admin@eduniketan.com', 'eduniketan-admin-2026', 'Souvik & Saif (Eduniketan Admin)')
ON CONFLICT (email) DO NOTHING;

-- Insert Default Stats Metrics
INSERT INTO public.stats (key, value, suffix, label)
VALUES 
  ('students', 15000, '+', 'Students Onboarded'),
  ('campuses', 25, '+', 'Campus Partners'),
  ('uptime', 99, '.9%', 'Platform Uptime'),
  ('nps', 91, '/100', 'Faculty NPS Score')
ON CONFLICT (key) DO NOTHING;

-- 6. Setup Supabase Storage Bucket Policies for 'eduniketan-gallery'
INSERT INTO storage.buckets (id, name, public) 
VALUES ('eduniketan-gallery', 'eduniketan-gallery', true)
ON CONFLICT (id) DO NOTHING;

-- Allow Public Access to eduniketan-gallery Bucket
CREATE POLICY "Public Read Access" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'eduniketan-gallery');

CREATE POLICY "Public Upload Access" 
ON storage.objects FOR INSERT 
WITH CHECK (bucket_id = 'eduniketan-gallery');

CREATE POLICY "Public Delete Access" 
ON storage.objects FOR DELETE 
USING (bucket_id = 'eduniketan-gallery');
