import { NextResponse } from 'next/server';
import { dbStore } from '@/lib/dbStore';
import { deleteGalleryPhoto } from '@/lib/supabase';

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (Array.isArray(body.images) && body.images.length > 0 && !body.imageUrl) {
      body.imageUrl = body.images[0].url;
    }

    const album = await dbStore.updateAlbum(id, body);
    return NextResponse.json({ success: true, data: album });
  } catch (error) {
    console.error('Error updating album:', error);
    return NextResponse.json({ success: false, error: 'Failed to update album' }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    // Fetch album to check image deletion for storage cleanup
    const albums = await dbStore.getAlbums();
    const target = albums.find((a) => a.id === id);
    if (target) {
      if (target.imageUrl) await deleteGalleryPhoto(target.imageUrl);
      if (Array.isArray(target.images)) {
        for (const img of target.images) {
          if (img.url) await deleteGalleryPhoto(img.url);
        }
      }
    }

    await dbStore.deleteAlbum(id);
    return NextResponse.json({ success: true, message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    return NextResponse.json({ success: false, error: 'Failed to delete album' }, { status: 500 });
  }
}
