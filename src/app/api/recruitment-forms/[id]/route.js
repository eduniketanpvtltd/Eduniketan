import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const form = await dbStore.getRecruitmentFormById(id);
    if (!form) {
      return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: form });
  } catch (error) {
    console.error('Error fetching recruitment form:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch form' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await dbStore.updateRecruitmentForm(id, body);
    if (!updated) {
      return NextResponse.json({ success: false, error: 'Form not found' }, { status: 404 });
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error('Error updating recruitment form:', error);
    return NextResponse.json({ success: false, error: 'Failed to update form' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbStore.deleteRecruitmentForm(id);
    return NextResponse.json({ success: true, message: 'Form deleted' });
  } catch (error) {
    console.error('Error deleting recruitment form:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete form' }, { status: 500 });
  }
}
