'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { uploadGalleryPhoto } from '@/lib/supabase';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import RecruitmentAdminTab from '@/components/ui/RecruitmentAdminTab';
import {
  Inbox,
  Star,
  Image as ImageIcon,
  Download,
  CheckCircle2,
  Clock,
  Trash2,
  LogOut,
  RefreshCw,
  Plus,
  Building2,
  Mail,
  Phone,
  Edit,
  UploadCloud,
  X,
  MapPin,
  Calendar,
  Layers,
  Briefcase
} from 'lucide-react';

export default function AdminDashboardPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('albums');
  const [enquiries, setEnquiries] = useState([]);
  const [feedback, setFeedback] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [statusFilter, setStatusFilter] = useState('ALL');

  // New Album form state
  const [newAlbum, setNewAlbum] = useState({
    title: '',
    category: 'Campus Visits',
    location: '',
    date: '2026',
    caption: '',
    gradient: 'from-blue-600 to-indigo-800',
    images: [], // array of { id, url, caption }
  });
  const [tempCaption, setTempCaption] = useState('');
  const [albumSuccess, setAlbumSuccess] = useState('');

  // Editing Album state
  const [editingAlbum, setEditingAlbum] = useState(null);
  const [editTempCaption, setEditTempCaption] = useState('');
  const [updatingAlbum, setUpdatingAlbum] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('eduniketan_admin_token');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchData();
  }, [router]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [enqRes, fbRes, albRes] = await Promise.all([
        fetch('/api/enquiries'),
        fetch('/api/feedback?all=true'),
        fetch('/api/albums'),
      ]);

      const [enqData, fbData, albData] = await Promise.all([
        enqRes.json(),
        fbRes.json(),
        albRes.json(),
      ]);

      if (enqData.success) setEnquiries(enqData.data);
      if (fbData.success) setFeedback(fbData.data);
      if (albData.success) setAlbums(albData.data);
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('eduniketan_admin_token');
    localStorage.removeItem('eduniketan_admin_user');
    router.push('/admin/login');
  };

  // Add photo to NEW Album draft
  const handleAddPhotoToNewAlbum = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    const publicUrl = await uploadGalleryPhoto(file);

    if (publicUrl) {
      const newPhotoObj = {
        id: `img-${Date.now()}`,
        url: publicUrl,
        caption: tempCaption || file.name.replace(/\.[^/.]+$/, ''),
      };
      setNewAlbum((prev) => ({
        ...prev,
        imageUrl: prev.imageUrl || publicUrl,
        images: [...prev.images, newPhotoObj],
      }));
      setTempCaption('');
    }
    setUploadingImage(false);
  };

  const handleRemovePhotoFromNewAlbum = (photoId) => {
    setNewAlbum((prev) => {
      const updatedImages = prev.images.filter((img) => img.id !== photoId);
      return {
        ...prev,
        images: updatedImages,
        imageUrl: updatedImages.length > 0 ? updatedImages[0].url : '',
      };
    });
  };

  const handleUpdateNewPhotoCaption = (photoId, newCap) => {
    setNewAlbum((prev) => ({
      ...prev,
      images: prev.images.map((img) => (img.id === photoId ? { ...img, caption: newCap } : img)),
    }));
  };

  // Create Album
  const handleCreateAlbum = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/albums', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAlbum),
      });

      const data = await res.json();
      if (data.success) {
        setAlbums((prev) => [data.data, ...prev]);
        setAlbumSuccess('Album published with ' + (newAlbum.images.length || 1) + ' photos!');
        setNewAlbum({
          title: '',
          category: 'Campus Visits',
          location: '',
          date: '2026',
          caption: '',
          gradient: 'from-blue-600 to-indigo-800',
          images: [],
        });
        setTempCaption('');
        setTimeout(() => setAlbumSuccess(''), 3000);
      }
    } catch (err) {
      console.error('Error creating album:', err);
    }
  };

  // Add photo to EDITING Album
  const handleAddPhotoToEditingAlbum = async (e) => {
    const file = e.target.files?.[0];
    if (!file || !editingAlbum) return;

    setUploadingImage(true);
    const publicUrl = await uploadGalleryPhoto(file);

    if (publicUrl) {
      const newPhotoObj = {
        id: `img-${Date.now()}`,
        url: publicUrl,
        caption: editTempCaption || file.name.replace(/\.[^/.]+$/, ''),
      };
      setEditingAlbum((prev) => ({
        ...prev,
        imageUrl: prev.imageUrl || publicUrl,
        images: [...(prev.images || []), newPhotoObj],
      }));
      setEditTempCaption('');
    }
    setUploadingImage(false);
  };

  const handleRemovePhotoFromEditingAlbum = (photoId) => {
    setEditingAlbum((prev) => {
      const updatedImages = (prev.images || []).filter((img) => img.id !== photoId);
      return {
        ...prev,
        images: updatedImages,
        imageUrl: updatedImages.length > 0 ? updatedImages[0].url : '',
      };
    });
  };

  const handleUpdateEditingPhotoCaption = (photoId, newCap) => {
    setEditingAlbum((prev) => ({
      ...prev,
      images: (prev.images || []).map((img) => (img.id === photoId ? { ...img, caption: newCap } : img)),
    }));
  };

  // Save Edited Album
  const handleSaveEditedAlbum = async (e) => {
    e.preventDefault();
    if (!editingAlbum) return;
    setUpdatingAlbum(true);

    try {
      const res = await fetch(`/api/albums/${editingAlbum.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingAlbum),
      });

      const data = await res.json();
      if (data.success) {
        setAlbums((prev) =>
          prev.map((a) => (a.id === editingAlbum.id ? data.data : a))
        );
        setEditingAlbum(null);
      }
    } catch (err) {
      console.error('Error updating album:', err);
    } finally {
      setUpdatingAlbum(false);
    }
  };

  // Delete Album
  const handleDeleteAlbum = async (id) => {
    if (!confirm('Delete this album and all its photos?')) return;

    try {
      const res = await fetch(`/api/albums/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setAlbums((prev) => prev.filter((a) => a.id !== id));
      }
    } catch (err) {
      console.error('Error deleting album:', err);
    }
  };

  // Enquiries Status Handlers
  const handleStatusChange = async (id, newStatus) => {
    try {
      const res = await fetch(`/api/enquiries/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setEnquiries((prev) =>
          prev.map((e) => (e.id === id ? { ...e, status: newStatus } : e))
        );
      }
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleDeleteEnquiry = async (id) => {
    if (!confirm('Delete enquiry?')) return;
    try {
      const res = await fetch(`/api/enquiries/${id}`, { method: 'DELETE' });
      if (res.ok) setEnquiries((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error('Error deleting enquiry:', err);
    }
  };

  const handleToggleFeedback = async (id, isApproved) => {
    try {
      const res = await fetch(`/api/feedback/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isApproved }),
      });
      const data = await res.json();
      if (data.success) {
        setFeedback((prev) =>
          prev.map((f) => (f.id === id ? { ...f, isApproved } : f))
        );
      }
    } catch (err) {
      console.error('Error toggling feedback:', err);
    }
  };

  const handleDeleteFeedback = async (id) => {
    if (!confirm('Delete feedback?')) return;
    try {
      const res = await fetch(`/api/feedback/${id}`, { method: 'DELETE' });
      if (res.ok) setFeedback((prev) => prev.filter((f) => f.id !== id));
    } catch (err) {
      console.error('Error deleting feedback:', err);
    }
  };

  const exportCSV = () => {
    if (enquiries.length === 0) return;
    const headers = ['ID,Name,Institution,Email,Phone,Product,Status,Message,SubmittedAt'];
    const rows = enquiries.map((e) =>
      `"${e.id}","${e.name}","${e.institution}","${e.email}","${e.phone}","${e.product}","${e.status}","${(e.message || '').replace(/"/g, '""')}","${new Date(e.createdAt).toLocaleString()}"`
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers, ...rows].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `Eduniketan_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredEnquiries = statusFilter === 'ALL'
    ? enquiries
    : enquiries.filter((e) => e.status === statusFilter);

  return (
    <div className="space-y-8 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-200 pb-6">
        <div>
          <Badge variant="blue">Eduniketan Admin Portal</Badge>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-1">
            Gallery & Operations Management
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button onClick={fetchData} variant="outline" size="sm" className="gap-1.5">
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} /> Sync Data
          </Button>
          <Button onClick={handleLogout} variant="ghost" size="sm" className="gap-1.5 text-red-600 hover:bg-red-50">
            <LogOut className="w-3.5 h-3.5" /> Logout
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-4 text-sm font-bold">
        <button
          onClick={() => setActiveTab('albums')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'albums'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <ImageIcon className="w-4 h-4" /> Multi-Photo Gallery Albums ({albums.length})
        </button>

        <button
          onClick={() => setActiveTab('enquiries')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'enquiries'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Inbox className="w-4 h-4" /> Demo & Contact Enquiries ({enquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'feedback'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Star className="w-4 h-4" /> Feedback Stream ({feedback.length})
        </button>

        <button
          onClick={() => setActiveTab('recruitment')}
          className={`pb-3 flex items-center gap-2 border-b-2 transition-colors ${
            activeTab === 'recruitment'
              ? 'border-blue-700 text-blue-700'
              : 'border-transparent text-slate-500 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" /> Recruitment Forms
        </button>
      </div>

      {/* Tab 1: Multi-Photo Gallery Albums Manager */}
      {activeTab === 'albums' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Create Multi-Photo Album Form */}
          <Card className="lg:col-span-5 p-6 border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-blue-600" /> Create Multi-Photo Album
            </h3>

            {albumSuccess && (
              <div className="p-3 text-xs bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-200 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{albumSuccess}</span>
              </div>
            )}

            <form onSubmit={handleCreateAlbum} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Album Title *</label>
                <input
                  type="text"
                  required
                  placeholder="LPU MoU Signing Ceremony"
                  value={newAlbum.title}
                  onChange={(e) => setNewAlbum({ ...newAlbum, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                <select
                  value={newAlbum.category}
                  onChange={(e) => setNewAlbum({ ...newAlbum, category: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                >
                  <option value="Campus Visits">Campus Visits</option>
                  <option value="MOU Signings">MOU Signings</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Team Events">Team Events</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    placeholder="LPU Punjab"
                    value={newAlbum.location}
                    onChange={(e) => setNewAlbum({ ...newAlbum, location: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Year / Date</label>
                  <input
                    type="text"
                    placeholder="2026"
                    value={newAlbum.date}
                    onChange={(e) => setNewAlbum({ ...newAlbum, date: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Album Description *</label>
                <textarea
                  rows={2}
                  required
                  placeholder="Overview description of this campus event..."
                  value={newAlbum.caption}
                  onChange={(e) => setNewAlbum({ ...newAlbum, caption: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              {/* Add Photo with Individual Caption Section */}
              <div className="pt-2 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    Album Photos ({newAlbum.images.length})
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold">Each photo gets an individual caption</span>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Caption for next photo (optional):
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. MoU document exchange with Vice-Chancellor"
                    value={tempCaption}
                    onChange={(e) => setTempCaption(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none mb-2"
                  />
                </div>

                <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-2xl p-3 text-center cursor-pointer transition-colors relative bg-slate-50/50">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAddPhotoToNewAlbum}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <UploadCloud className="w-6 h-6 mx-auto text-blue-600 mb-1" />
                  <span className="text-xs font-bold text-slate-700 block">
                    {uploadingImage ? 'Uploading photo to Supabase...' : '+ Add Photo to Album'}
                  </span>
                </div>

                {/* Added Photos List */}
                {newAlbum.images.length > 0 && (
                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {newAlbum.images.map((img, idx) => (
                      <div key={img.id || idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-200">
                        {img.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={img.url} alt="Photo" className="w-12 h-12 rounded-lg object-cover border shrink-0" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                            P{idx + 1}
                          </div>
                        )}

                        <div className="flex-grow min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 block">Photo #{idx + 1} Caption:</span>
                          <input
                            type="text"
                            value={img.caption}
                            onChange={(e) => handleUpdateNewPhotoCaption(img.id, e.target.value)}
                            className="w-full px-2 py-1 text-xs border border-slate-200 rounded-md focus:outline-none"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => handleRemovePhotoFromNewAlbum(img.id)}
                          className="text-red-500 hover:bg-red-50 p-1 rounded-md shrink-0"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button type="submit" variant="primary" size="sm" disabled={uploadingImage} className="w-full gap-1.5 mt-2">
                <Plus className="w-4 h-4" /> Publish Album ({newAlbum.images.length} Photos)
              </Button>
            </form>
          </Card>

          {/* Published Albums Display */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">
              Published Albums ({albums.length})
            </h3>

            {albums.length === 0 ? (
              <Card className="p-8 text-center text-slate-500 text-xs">
                No albums published yet.
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {albums.map((alb) => {
                  const photos = Array.isArray(alb.images) ? alb.images : [];
                  const coverPhoto = alb.imageUrl || (photos.length > 0 ? photos[0].url : null);

                  return (
                    <Card key={alb.id} className="p-4 space-y-3 border-slate-200 flex flex-col justify-between hover:border-blue-300">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Badge variant="teal">{alb.category}</Badge>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                            {photos.length || (coverPhoto ? 1 : 0)} Photos
                          </span>
                        </div>

                        {/* Cover Photo */}
                        {coverPhoto ? (
                          <div className="w-full h-36 rounded-xl overflow-hidden bg-slate-100 relative border border-slate-200">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={coverPhoto} alt={alb.title} className="w-full h-full object-cover" />
                          </div>
                        ) : (
                          <div className={`h-24 rounded-xl bg-gradient-to-br ${alb.gradient || 'from-blue-600 to-indigo-800'} p-4 flex flex-col justify-end text-white text-xs font-bold`}>
                            <span>{alb.location} • {alb.date}</span>
                          </div>
                        )}

                        <h4 className="text-base font-bold text-slate-900">{alb.title}</h4>
                        <p className="text-xs text-slate-600 line-clamp-2">{alb.caption}</p>

                        {/* Per-Photo Captions Preview */}
                        {photos.length > 0 && (
                          <div className="pt-2 space-y-1">
                            <span className="text-[10px] font-bold text-slate-400 block uppercase">Photo Captions Sample:</span>
                            {photos.slice(0, 2).map((p, i) => (
                              <div key={i} className="text-[11px] text-slate-700 bg-slate-50 px-2 py-1 rounded border border-slate-100 truncate">
                                • {p.caption || 'Photo ' + (i + 1)}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                        <button
                          onClick={() => {
                            setEditingAlbum(alb);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 font-bold flex items-center gap-1.5"
                        >
                          <Edit className="w-3.5 h-3.5" /> Edit Album & Photos
                        </button>

                        <button
                          onClick={() => handleDeleteAlbum(alb.id)}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-bold flex items-center gap-1.5"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
                    </Card>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Edit Album Modal */}
      {editingAlbum && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl p-6 shadow-2xl space-y-4 border border-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Edit Album & Photo Captions</h3>
                <span className="text-xs text-slate-500">Update photos and individual captions</span>
              </div>
              <button onClick={() => setEditingAlbum(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEditedAlbum} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Album Title *</label>
                  <input
                    type="text"
                    required
                    value={editingAlbum.title}
                    onChange={(e) => setEditingAlbum({ ...editingAlbum, title: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Category *</label>
                  <select
                    value={editingAlbum.category}
                    onChange={(e) => setEditingAlbum({ ...editingAlbum, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none bg-white"
                  >
                    <option value="Campus Visits">Campus Visits</option>
                    <option value="MOU Signings">MOU Signings</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Team Events">Team Events</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Album Description *</label>
                <textarea
                  rows={2}
                  required
                  value={editingAlbum.caption}
                  onChange={(e) => setEditingAlbum({ ...editingAlbum, caption: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-200 rounded-xl focus:outline-none"
                ></textarea>
              </div>

              {/* Photos List & Captions Editor */}
              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-slate-900">
                    Album Photos & Captions ({(editingAlbum.images || []).length})
                  </h4>
                </div>

                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {(editingAlbum.images || []).map((img, idx) => (
                    <div key={img.id || idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                      {img.url ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={img.url} alt="Photo" className="w-14 h-14 rounded-lg object-cover border shrink-0" />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 font-bold text-xs">
                          P{idx + 1}
                        </div>
                      )}

                      <div className="flex-grow min-w-0">
                        <label className="text-[10px] font-bold text-slate-400 block mb-1">
                          Photo #{idx + 1} Caption:
                        </label>
                        <input
                          type="text"
                          value={img.caption || ''}
                          onChange={(e) => handleUpdateEditingPhotoCaption(img.id, e.target.value)}
                          className="w-full px-2 py-1 text-xs border border-slate-200 rounded-lg focus:outline-none bg-white"
                        />
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemovePhotoFromEditingAlbum(img.id)}
                        className="text-red-600 hover:bg-red-50 p-1.5 rounded-lg shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add New Photo to existing album */}
                <div className="pt-2 border-t border-slate-100">
                  <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                    Caption for next uploaded photo:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Student Q&A session"
                    value={editTempCaption}
                    onChange={(e) => setEditTempCaption(e.target.value)}
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 rounded-xl focus:outline-none mb-2"
                  />

                  <div className="border-2 border-dashed border-slate-200 hover:border-blue-400 rounded-xl p-3 text-center cursor-pointer relative bg-slate-50">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleAddPhotoToEditingAlbum}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                    <span className="text-xs font-bold text-blue-700 block">
                      {uploadingImage ? 'Uploading photo...' : '+ Add Another Photo to Album'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button type="button" variant="ghost" size="sm" onClick={() => setEditingAlbum(null)}>
                  Cancel
                </Button>
                <Button type="submit" variant="primary" size="sm" disabled={updatingAlbum}>
                  {updatingAlbum ? 'Saving Changes...' : 'Save Album & Captions'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Tab 2: Enquiries Inbox */}
      {activeTab === 'enquiries' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-100 p-4 rounded-2xl">
            <div className="flex items-center gap-2 text-xs font-bold">
              <span>Filter Status:</span>
              {['ALL', 'NEW', 'CONTACTED', 'CLOSED'].map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={`px-3 py-1 rounded-full transition-all ${
                    statusFilter === st
                      ? 'bg-blue-700 text-white'
                      : 'bg-white text-slate-700 border border-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <Button onClick={exportCSV} variant="primary" size="sm" className="gap-1.5 text-xs">
              <Download className="w-4 h-4" /> Export Inbox to CSV
            </Button>
          </div>

          {filteredEnquiries.length === 0 ? (
            <Card className="p-8 text-center text-slate-500 text-xs">
              No enquiries match the selected filter.
            </Card>
          ) : (
            <div className="space-y-4">
              {filteredEnquiries.map((e) => (
                <Card key={e.id} className="p-6 border-slate-200 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-3">
                      <h3 className="text-base font-bold text-slate-900">{e.name}</h3>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
                        {e.institution}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] text-slate-400 font-medium">
                        {new Date(e.createdAt).toLocaleString()}
                      </span>
                      <Badge
                        variant={
                          e.status === 'NEW'
                            ? 'amber'
                            : e.status === 'CONTACTED'
                            ? 'blue'
                            : 'slate'
                        }
                      >
                        {e.status}
                      </Badge>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                      <a href={`mailto:${e.email}`} className="font-semibold text-blue-700 hover:underline">
                        {e.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                      <a href={`tel:${e.phone}`} className="font-semibold text-slate-800">
                        {e.phone}
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-indigo-600 shrink-0" />
                      <span className="font-bold text-slate-900">Interest: {e.product}</span>
                    </div>
                  </div>

                  {e.message && (
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-700 italic border border-slate-200/60">
                      &ldquo;{e.message}&rdquo;
                    </div>
                  )}

                  <div className="pt-2 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500">Update Lead Status:</span>
                      <button
                        onClick={() => handleStatusChange(e.id, 'NEW')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          e.status === 'NEW' ? 'bg-amber-600 text-white' : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        New
                      </button>
                      <button
                        onClick={() => handleStatusChange(e.id, 'CONTACTED')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          e.status === 'CONTACTED' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        Contacted
                      </button>
                      <button
                        onClick={() => handleStatusChange(e.id, 'CLOSED')}
                        className={`px-2.5 py-1 rounded-lg transition-colors ${
                          e.status === 'CLOSED' ? 'bg-emerald-600 text-white' : 'bg-slate-100 hover:bg-slate-200'
                        }`}
                      >
                        Closed
                      </button>
                    </div>

                    <button
                      onClick={() => handleDeleteEnquiry(e.id)}
                      className="text-red-600 hover:text-red-800 p-1.5 rounded-lg hover:bg-red-50 flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" /> Delete
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Feedback Stream */}
      {activeTab === 'feedback' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {feedback.map((f) => (
              <Card key={f.id} className="p-6 border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(f.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Badge variant={f.isApproved ? 'emerald' : 'slate'}>
                    {f.isApproved ? 'Published' : 'Hidden'}
                  </Badge>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed font-medium">&ldquo;{f.comment}&rdquo;</p>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{f.authorName}</div>
                    <div className="text-[11px] text-teal-700 font-semibold">{f.institution} ({f.role})</div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleFeedback(f.id, !f.isApproved)}
                      className={`px-3 py-1 rounded-lg font-bold transition-colors ${
                        f.isApproved ? 'bg-amber-100 text-amber-800' : 'bg-emerald-600 text-white'
                      }`}
                    >
                      {f.isApproved ? 'Unpublish' : 'Approve'}
                    </button>
                    <button
                      onClick={() => handleDeleteFeedback(f.id)}
                      className="text-red-600 hover:bg-red-50 p-1 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Recruitment Forms */}
      {activeTab === 'recruitment' && (
        <RecruitmentAdminTab />
      )}
    </div>
  );
}

