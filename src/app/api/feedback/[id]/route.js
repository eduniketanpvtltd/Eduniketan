import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const feedback = await dbStore.updateFeedback(id, body);
    return NextResponse.json({ success: true, data: feedback });
  } catch (error) {
    console.error('Error updating feedback:', error);
    return NextResponse.json({ success: false, error: 'Failed to update feedback' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbStore.deleteFeedback(id);
    return NextResponse.json({ success: true, message: 'Feedback deleted' });
  } catch (error) {
    console.error('Error deleting feedback:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete feedback' }, { status: 500 });
  }
}
