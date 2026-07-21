import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    const albums = await dbStore.getAlbums(category);
    return NextResponse.json({ success: true, count: albums.length, data: albums });
  } catch (error) {
    console.error('Error fetching albums:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch albums' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { title, category, location, date, caption, gradient, imageUrl, images } = body;

    if (!title || !category || !caption) {
      return NextResponse.json({ success: false, error: 'Title, category, and description are required' }, { status: 400 });
    }

    const photoList = Array.isArray(images) ? images : [];
    const coverUrl = imageUrl || (photoList.length > 0 ? photoList[0].url : null);

    const album = await dbStore.createAlbum({
      title,
      category,
      location: location || 'Campus Location',
      date: date || '2026',
      caption,
      gradient: gradient || 'from-blue-600 to-indigo-800',
      imageUrl: coverUrl,
      images: photoList,
    });

    return NextResponse.json({ success: true, data: album }, { status: 201 });
  } catch (error) {
    console.error('Error creating multi-photo album:', error);
    return NextResponse.json({ success: false, error: 'Failed to create album' }, { status: 500 });
  }
}
