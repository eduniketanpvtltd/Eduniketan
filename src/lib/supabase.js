import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ckjkngdidervdyfzosyv.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNramtuZ2RpZGVydmR5Znpvc3l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ1NDE4MDEsImV4cCI6MjEwMDExNzgwMX0.W2iftTGoRqkdExsY8Dq0TRIruLQWes2qEgja95Cj5e8';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceRoleKey);

/**
 * Upload photo file to Supabase Storage bucket 'eduniketan-gallery'
 * Returns public URL string
 */
export async function uploadGalleryPhoto(file) {
  if (!file) return null;

  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `albums/${fileName}`;

    // Upload to Supabase storage bucket 'eduniketan-gallery'
    const { data, error } = await supabase.storage
      .from('eduniketan-gallery')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

    if (error) {
      console.warn('Supabase storage bucket error (will use base64 fallback if unconfigured):', error.message);
      // Fallback: convert to base64 Data URL so upload works immediately out-of-the-box
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    }

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from('eduniketan-gallery')
      .getPublicUrl(filePath);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error('Error uploading image to Supabase:', err);
    // Fallback to Data URL
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  }
}

/**
 * Delete photo file from Supabase Storage bucket
 */
export async function deleteGalleryPhoto(imageUrl) {
  if (!imageUrl || !imageUrl.includes('eduniketan-gallery')) return;

  try {
    const path = imageUrl.split('eduniketan-gallery/').pop();
    if (path) {
      await supabase.storage.from('eduniketan-gallery').remove([path]);
    }
  } catch (err) {
    console.error('Error deleting photo from Supabase storage:', err);
  }
}
