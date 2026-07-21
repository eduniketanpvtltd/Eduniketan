import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Check credentials against Supabase admin_users table or default admin credentials
    let adminUser = null;

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xyzcompany')) {
      const { data, error } = await supabase
        .from('admin_users')
        .select('*')
        .eq('email', email)
        .eq('password', password)
        .single();

      if (!error && data) {
        adminUser = data;
      }
    }

    // Default admin fallback
    if (!adminUser && email === 'admin@eduniketan.com' && password === 'eduniketan-admin-2026') {
      adminUser = { id: 'admin-1', email, name: 'Souvik & Saif (Eduniketan Admin)' };
    }

    if (!adminUser) {
      return NextResponse.json({ success: false, error: 'Invalid email or password' }, { status: 401 });
    }

    return NextResponse.json({
      success: true,
      user: { id: adminUser.id, email: adminUser.email, name: adminUser.name },
      token: 'admin-auth-session-token-2026',
    });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ success: false, error: 'Server authentication error' }, { status: 500 });
  }
}
