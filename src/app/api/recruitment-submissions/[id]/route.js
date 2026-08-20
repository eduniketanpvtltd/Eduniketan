import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const submissions = await dbStore.getRecruitmentSubmissions();
    const sub = submissions.find((s) => s.id === id);
    if (!sub) return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: sub });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch submission' }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const updated = await dbStore.updateRecruitmentSubmission(id, body);
    if (!updated) return NextResponse.json({ success: false, error: 'Submission not found' }, { status: 404 });
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to update submission' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbStore.deleteRecruitmentSubmission(id);
    return NextResponse.json({ success: true, message: 'Submission deleted' });
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete submission' }, { status: 500 });
  }
}
