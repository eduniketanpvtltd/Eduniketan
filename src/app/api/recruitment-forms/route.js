import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const publishedOnly = searchParams.get('published') === 'true';
    const forms = await dbStore.getRecruitmentForms(publishedOnly);
    return NextResponse.json({ success: true, count: forms.length, data: forms });
  } catch (error) {
    console.error('Error fetching recruitment forms:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch forms' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, description, fields, isPublished, deadline } = body;

    if (!title || !title.trim()) {
      return NextResponse.json({ success: false, error: 'Form title is required.' }, { status: 400 });
    }

    const form = await dbStore.createRecruitmentForm({ title, description, fields, isPublished, deadline });
    return NextResponse.json({ success: true, data: form }, { status: 201 });
  } catch (error) {
    console.error('Error creating recruitment form:', error);
    return NextResponse.json({ success: false, error: 'Failed to create form' }, { status: 500 });
  }
}
