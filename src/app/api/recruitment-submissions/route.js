import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const formId = searchParams.get('formId');
    const submissions = await dbStore.getRecruitmentSubmissions(formId);
    return NextResponse.json({ success: true, count: submissions.length, data: submissions });
  } catch (error) {
    console.error('Error fetching submissions:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch submissions' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { formId, formTitle, data } = body;

    if (!formId) {
      return NextResponse.json({ success: false, error: 'formId is required.' }, { status: 400 });
    }

    // Verify form exists and is published
    const form = await dbStore.getRecruitmentFormById(formId);
    if (!form) {
      return NextResponse.json({ success: false, error: 'Form not found.' }, { status: 404 });
    }
    if (!form.isPublished) {
      return NextResponse.json({ success: false, error: 'This form is not currently accepting submissions.' }, { status: 403 });
    }
    // Check deadline
    if (form.deadline) {
      const deadline = new Date(form.deadline);
      deadline.setHours(23, 59, 59, 999);
      if (new Date() > deadline) {
        return NextResponse.json({ success: false, error: 'The application deadline for this form has passed.' }, { status: 403 });
      }
    }

    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    const submission = await dbStore.createRecruitmentSubmission({
      formId,
      formTitle: formTitle || form.title,
      data: data || {},
      ipAddress,
    });

    return NextResponse.json({ success: true, data: submission }, { status: 201 });
  } catch (error) {
    console.error('Error creating submission:', error);
    return NextResponse.json({ success: false, error: 'Failed to save submission' }, { status: 500 });
  }
}
