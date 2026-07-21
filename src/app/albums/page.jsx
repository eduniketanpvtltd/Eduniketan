'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import {
  X,
  Image as ImageIcon,
  MapPin,
  ZoomIn,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Layers
} from 'lucide-react';

export default function AlbumsPage() {
  const [filter, setFilter] = useState('All');
  const [activeAlbum, setActiveAlbum] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [galleryItems, setGalleryItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = ['All', 'Campus Visits', 'MOU Signings', 'Workshops', 'Team Events'];

  useEffect(() => {
    fetchAlbums();
  }, [filter]);

  const fetchAlbums = async () => {
    setLoading(true);
    try {
      const url = filter === 'All' ? '/api/albums' : `/api/albums?category=${encodeURIComponent(filter)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.success) {
        setGalleryItems(data.data);
      }
    } catch (err) {
      console.error('Error fetching gallery albums:', err);
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (album) => {
    setActiveAlbum(album);
    setCurrentPhotoIndex(0);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    const photos = Array.isArray(activeAlbum.images) && activeAlbum.images.length > 0
      ? activeAlbum.images
      : [{ url: activeAlbum.imageUrl, caption: activeAlbum.caption }];
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    if (!activeAlbum) return;
    const photos = Array.isArray(activeAlbum.images) && activeAlbum.images.length > 0
      ? activeAlbum.images
      : [{ url: activeAlbum.imageUrl, caption: activeAlbum.caption }];
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  return (
    <div className="space-y-12 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="teal">Gallery & Events</Badge>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Albums & <span className="gradient-text">Campus Moments</span>
        </h1>
        <p className="text-slate-600 text-lg">
          Highlights from our campus visits, MoU signing ceremonies, live student bootcamps, and team events across India.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                filter === cat
                  ? 'bg-blue-700 text-white shadow-md'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      {loading ? (
        <div className="text-center py-16 text-slate-500 text-xs flex items-center justify-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-blue-600" /> Loading gallery albums...
        </div>
      ) : galleryItems.length === 0 ? (
        <div className="text-center py-16 text-slate-500 text-xs bg-slate-100 rounded-2xl">
          No albums match the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryItems.map((item) => {
            const photos = Array.isArray(item.images) && item.images.length > 0
              ? item.images
              : [{ url: item.imageUrl, caption: item.caption }];
            const coverPhoto = photos[0]?.url || item.imageUrl;

            return (
              <Card
                key={item.id}
                onClick={() => openLightbox(item)}
                className="p-0 overflow-hidden cursor-pointer group border-slate-200 hover:border-blue-300 flex flex-col justify-between"
              >
                <div>
                  {/* Visual Image Header */}
                  {coverPhoto ? (
                    <div className="h-52 w-full overflow-hidden bg-slate-100 relative group-hover:scale-105 transition-transform duration-300">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={coverPhoto} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-md text-slate-900 uppercase tracking-wider border border-white/50">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-600 text-white shadow-xs flex items-center gap-1">
                          <Layers className="w-3 h-3" /> {photos.length} Photos
                        </span>
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 text-white text-xs font-semibold flex items-center justify-between">
                        <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5 text-teal-400" /> {item.location}</span>
                        <span className="text-[11px] opacity-80">{item.date}</span>
                      </div>
                    </div>
                  ) : (
                    <div className={`h-48 bg-gradient-to-br ${item.gradient || 'from-blue-600 to-indigo-800'} p-6 flex flex-col justify-between text-white relative overflow-hidden`}>
                      <div className="absolute right-3 top-3 opacity-20 group-hover:opacity-40 transition-opacity">
                        <ImageIcon className="w-24 h-24" />
                      </div>
                      <div className="flex justify-between items-center relative z-10">
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 uppercase tracking-wider">
                          {item.category}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-white/30 text-white flex items-center gap-1">
                          <Layers className="w-3 h-3" /> {photos.length} Photos
                        </span>
                      </div>
                      <div className="relative z-10">
                        <div className="flex items-center gap-1.5 text-xs text-white/90">
                          <MapPin className="w-3.5 h-3.5" /> {item.location} • {item.date}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 space-y-2">
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{item.caption}</p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0 text-xs font-bold text-blue-700 flex items-center gap-1">
                  View Album Slideshow ({photos.length} Photos) <ZoomIn className="w-3.5 h-3.5" />
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Multi-Photo Lightbox Modal */}
      {activeAlbum && (() => {
        const photos = Array.isArray(activeAlbum.images) && activeAlbum.images.length > 0
          ? activeAlbum.images
          : [{ url: activeAlbum.imageUrl, caption: activeAlbum.caption }];

        const currentPhoto = photos[currentPhotoIndex] || {};

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in">
            <div className="relative w-full max-w-4xl bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800 flex flex-col max-h-[90vh]">

              {/* Lightbox Header */}
              <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between text-white shrink-0">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant="teal">{activeAlbum.category}</Badge>
                    <span className="text-xs text-slate-400 font-semibold">{activeAlbum.location} • {activeAlbum.date}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-1">{activeAlbum.title}</h3>
                </div>

                <button
                  onClick={() => setActiveAlbum(null)}
                  className="text-slate-400 hover:text-white p-2 rounded-full bg-slate-800 hover:bg-slate-700 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Photo Display Stage */}
              <div className="relative flex-grow flex items-center justify-center bg-black min-h-[350px] overflow-hidden group">
                {currentPhoto.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={currentPhoto.url}
                    alt={currentPhoto.caption || activeAlbum.title}
                    className="max-h-[60vh] max-w-full object-contain mx-auto"
                  />
                ) : (
                  <div className={`w-full h-full min-h-[350px] bg-gradient-to-br ${activeAlbum.gradient || 'from-blue-600 to-indigo-800'} p-8 flex flex-col justify-center items-center text-white text-center`}>
                    <ImageIcon className="w-16 h-16 text-white/40 mb-3" />
                    <h4 className="text-xl font-bold">{activeAlbum.title}</h4>
                    <p className="text-xs text-slate-200 mt-2 max-w-md">{currentPhoto.caption || activeAlbum.caption}</p>
                  </div>
                )}

                {/* Left / Right Nav Arrows */}
                {photos.length > 1 && (
                  <>
                    <button
                      onClick={handlePrevPhoto}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all hover:scale-110 shadow-lg"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={handleNextPhoto}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 hover:bg-slate-900 text-white border border-slate-700 transition-all hover:scale-110 shadow-lg"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}

                {/* Counter Badge */}
                <div className="absolute top-4 right-4 bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-teal-300 border border-slate-700">
                  Photo {currentPhotoIndex + 1} of {photos.length}
                </div>
              </div>

              {/* Photo Caption & Info Footer */}
              <div className="p-6 bg-slate-900 border-t border-slate-800 text-white space-y-3 shrink-0">
                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-teal-400 uppercase tracking-widest block">
                    Photo Caption ({currentPhotoIndex + 1}/{photos.length})
                  </span>
                  <p className="text-sm font-semibold text-slate-100 leading-relaxed">
                    {currentPhoto.caption || activeAlbum.caption}
                  </p>
                </div>

                {/* Thumbnail Strip */}
                {photos.length > 1 && (
                  <div className="flex items-center gap-2 pt-2 overflow-x-auto pb-1">
                    {photos.map((p, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentPhotoIndex(idx)}
                        className={`w-14 h-14 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                          currentPhotoIndex === idx
                            ? 'border-teal-400 scale-105 shadow-md'
                            : 'border-slate-700 opacity-60 hover:opacity-100'
                        }`}
                      >
                        {p.url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.url} alt={`Thumb ${idx + 1}`} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                            #{idx + 1}
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
