import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const enquiries = await dbStore.getEnquiries(status);
    return NextResponse.json({ success: true, count: enquiries.length, data: enquiries });
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, institution, email, phone, product, message } = body;

    if (!name || !institution || !email || !phone) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: name, institution, email, and phone are required.' },
        { status: 400 }
      );
    }

    const enquiry = await dbStore.createEnquiry({
      name,
      institution,
      email,
      phone,
      product: product || 'General Enquiry',
      message: message || '',
    });

    return NextResponse.json({ success: true, data: enquiry }, { status: 201 });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    return NextResponse.json({ success: false, error: 'Failed to save enquiry' }, { status: 500 });
  }
}
