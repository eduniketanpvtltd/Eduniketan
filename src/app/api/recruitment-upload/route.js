import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file size (max 10MB)
    const MAX_SIZE = 10 * 1024 * 1024;
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: 'File size exceeds 10MB limit' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'gif', 'txt', 'xls', 'xlsx', 'ppt', 'pptx', 'zip'];
    if (!allowedExtensions.includes(fileExt)) {
      return NextResponse.json({ success: false, error: `File type .${fileExt} is not allowed` }, { status: 400 });
    }

    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `submissions/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isSupabaseConfigured =
      Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
      !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xyzcompany');

    if (isSupabaseConfigured) {
      const { data, error } = await supabaseAdmin.storage
        .from('eduniketan-recruitment')
        .upload(filePath, buffer, {
          contentType: file.type || 'application/octet-stream',
          cacheControl: '3600',
          upsert: false,
        });

      if (error) {
        console.warn('Supabase recruitment upload error:', error.message);
        // Return a data URI fallback for dev mode
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type || 'application/octet-stream'};base64,${base64}`;
        return NextResponse.json({ success: true, url: dataUrl, fileName: file.name, fallback: true });
      }

      const { data: publicUrlData } = supabaseAdmin.storage
        .from('eduniketan-recruitment')
        .getPublicUrl(filePath);

      return NextResponse.json({
        success: true,
        url: publicUrlData.publicUrl,
        fileName: file.name,
        filePath,
      });
    } else {
      // Local fallback — return a data URI
      const base64 = buffer.toString('base64');
      const dataUrl = `data:${file.type || 'application/octet-stream'};base64,${base64}`;
      return NextResponse.json({ success: true, url: dataUrl, fileName: file.name, fallback: true });
    }
  } catch (error) {
    console.error('Recruitment file upload error:', error);
    return NextResponse.json({ success: false, error: 'Upload failed' }, { status: 500 });
  }
}
