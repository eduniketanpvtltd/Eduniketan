import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status } = body;

    const enquiry = await dbStore.updateEnquiry(id, status);
    return NextResponse.json({ success: true, data: enquiry });
  } catch (error) {
    console.error('Error updating enquiry:', error);
    return NextResponse.json({ success: false, error: 'Failed to update enquiry status' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    await dbStore.deleteEnquiry(id);
    return NextResponse.json({ success: true, message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete enquiry' }, { status: 500 });
  }
}
