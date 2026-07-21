import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const all = searchParams.get('all') === 'true';

    const feedbackList = await dbStore.getFeedback(all);
    return NextResponse.json({ success: true, count: feedbackList.length, data: feedbackList });
  } catch (error) {
    console.error('Error fetching feedback:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch feedback' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { authorName, institution, role, rating, comment } = body;

    if (!authorName || !institution || !comment) {
      return NextResponse.json(
        { success: false, error: 'Author name, institution, and feedback message are required.' },
        { status: 400 }
      );
    }

    const feedback = await dbStore.createFeedback({
      authorName,
      institution,
      role: role || 'Student',
      rating: Number(rating) || 5,
      comment,
    });

    return NextResponse.json({ success: true, data: feedback }, { status: 201 });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    return NextResponse.json({ success: false, error: 'Failed to save feedback' }, { status: 500 });
  }
}
