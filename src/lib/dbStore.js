import fs from 'fs';
import path from 'path';
import { supabase } from './supabase.js';

const DATA_FILE = path.join(process.cwd(), 'src', 'data', 'db.json');

const isSupabaseConfigured =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xyzcompany');

const defaultDbData = {
  recruitmentForms: [],
  recruitmentSubmissions: [],
  enquiries: [
    {
      id: 'enq-1',
      name: 'Dr. Rajesh Kumar',
      institution: 'Lovely Professional University',
      email: 'tpo@lpu.co.in',
      phone: '+91 98765 43210',
      product: 'Placement Mastery Program',
      message: 'Requesting PEP proposal for 500+ CSE students.',
      status: 'NEW',
      createdAt: new Date().toISOString(),
    },
  ],
  feedback: [
    {
      id: 'fb-1',
      authorName: 'Training & Placement Officer',
      institution: 'Lovely Professional University (LPU)',
      role: 'TPO',
      rating: 5,
      comment: "TheEduBootCamp transformed how our students prepare for technical assessments. The EduCode platform's autograding provided immediate clarity to our TPO team.",
      isApproved: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fb-2',
      authorName: 'Head of Academic Affairs',
      institution: 'Pyramid College of Business & Tech',
      role: 'Faculty',
      rating: 5,
      comment: "Eduniketan's structured Placement Mastery Program gave our non-CS engineering students the confidence to excel in aptitude, GD, and coding rounds.",
      isApproved: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
    {
      id: 'fb-3',
      authorName: 'Aman Sharma',
      institution: 'LPU B.Tech CSE Student',
      role: 'Student',
      rating: 5,
      comment: 'The autograder test cases on TheEduCode helped me clear the online screening round for product companies!',
      isApproved: true,
      isFeatured: true,
      createdAt: new Date().toISOString(),
    },
  ],
  albums: [
    {
      id: 'alb-1',
      title: 'LPU Placement Enhancement Kickoff',
      category: 'Campus Visits',
      date: '2023',
      location: 'LPU Punjab Campus',
      caption: 'Official kickoff of TheEduBootCamp PEP session with over 500+ student attendees and TPO department heads.',
      gradient: 'from-blue-600 to-indigo-800',
      imageUrl: null,
      images: [
        { id: 'img-1-1', url: null, caption: 'Opening keynote by University Placement Director and Eduniketan Founders.' },
        { id: 'img-1-2', url: null, caption: 'Over 500+ engineering students participating in the initial assessment test.' },
        { id: 'img-1-3', url: null, caption: 'Live interactive autograder demonstration on TheEduCode platform.' },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'alb-2',
      title: 'Pyramid College MoU Ceremony',
      category: 'MOU Signings',
      date: '2024',
      location: 'PCBT Campus Phagwara',
      caption: 'Signing of official Memorandum of Understanding for annual Placement Mastery Program delivery.',
      gradient: 'from-teal-600 to-emerald-800',
      imageUrl: null,
      images: [
        { id: 'img-2-1', url: null, caption: 'Signing of official Memorandum of Understanding between leadership teams.' },
        { id: 'img-2-2', url: null, caption: 'MoU document exchange ceremony with Academic Deans and TPO heads.' },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'alb-3',
      title: 'West Bengal Engineering Workshop',
      category: 'Workshops',
      date: '2024',
      location: 'Kolkata Tech Hub',
      caption: 'Technical workshop on LeetCode patterns and autograder test strategies for non-CS engineering branches.',
      gradient: 'from-indigo-600 to-purple-800',
      imageUrl: null,
      images: [
        { id: 'img-3-1', url: null, caption: 'Hands-on problem solving session covering DSA speed techniques.' },
        { id: 'img-3-2', url: null, caption: 'Interactive Q&A session with active corporate SDE mentors.' },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'alb-4',
      title: 'Eduniketan Annual Strategy Meeting',
      category: 'Team Events',
      date: '2024',
      location: 'Corporate HQ',
      caption: 'Founders Souvik Gupta & Saif Siddique aligning roadmap for expanding campus autograder software.',
      gradient: 'from-amber-600 to-orange-800',
      imageUrl: null,
      images: [
        { id: 'img-4-1', url: null, caption: 'Founders Souvik Gupta & Saif Siddique reviewing product roadmap.' },
        { id: 'img-4-2', url: null, caption: 'Core engineering team presenting upcoming autograder enhancements.' },
      ],
      createdAt: new Date().toISOString(),
    },
    {
      id: 'alb-5',
      title: 'Live GD & Mock Interview Bootcamp',
      category: 'Workshops',
      date: '2025',
      location: 'Online Live Platform',
      caption: 'Interactive live group discussion feedback session conducted by corporate SDE mentors.',
      gradient: 'from-cyan-600 to-blue-800',
      imageUrl: null,
      images: [
        { id: 'img-5-1', url: null, caption: 'Live Group Discussion panel evaluation with real-time feedback scorecards.' },
        { id: 'img-5-2', url: null, caption: '1-on-1 mock interview coaching session delivered over TheEduLive.' },
      ],
      createdAt: new Date().toISOString(),
    },
  ],
  stats: [
    { key: 'students', value: 15000, suffix: '+', label: 'Students Onboarded' },
    { key: 'campuses', value: 25, suffix: '+', label: 'Campus Partners' },
    { key: 'uptime', value: 99, suffix: '.9%', label: 'Platform Uptime' },
    { key: 'nps', value: 91, suffix: '/100', label: 'Faculty NPS Score' },
  ],
};

function loadLocalDb() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(content);
      return {
        enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : defaultDbData.enquiries,
        feedback: Array.isArray(parsed.feedback) ? parsed.feedback : defaultDbData.feedback,
        albums: Array.isArray(parsed.albums) ? parsed.albums : defaultDbData.albums,
        stats: Array.isArray(parsed.stats) ? parsed.stats : defaultDbData.stats,
        recruitmentForms: Array.isArray(parsed.recruitmentForms) ? parsed.recruitmentForms : defaultDbData.recruitmentForms,
        recruitmentSubmissions: Array.isArray(parsed.recruitmentSubmissions) ? parsed.recruitmentSubmissions : defaultDbData.recruitmentSubmissions,
      };
    }
  } catch (err) {
    console.error('Error reading local data file:', err);
  }
  saveLocalDb(defaultDbData);
  return defaultDbData;
}

function saveLocalDb(data) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving local data file:', err);
  }
}

// Database Operations
export const dbStore = {
  // ENQUIRIES
  getEnquiries: async (status) => {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });
        if (status) query = query.eq('status', status);
        const { data, error } = await query;
        if (!error && data) {
          return data.map((e) => ({
            ...e,
            createdAt: e.created_at || e.createdAt,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch enquiries error, falling back to disk db:', err);
      }
    }
    const db = loadLocalDb();
    let res = [...db.enquiries];
    if (status) res = res.filter((e) => e.status === status);
    return res;
  },

  createEnquiry: async (payload) => {
    const record = {
      id: `enq-${Date.now()}`,
      ...payload,
      status: 'NEW',
      createdAt: new Date().toISOString(),
    };
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('enquiries').insert([payload]).select();
        if (!error && data && data.length > 0) {
          const rec = { ...data[0], createdAt: data[0].created_at || record.createdAt };
          const db = loadLocalDb();
          db.enquiries.unshift(rec);
          saveLocalDb(db);
          return rec;
        }
      } catch (err) {
        console.warn('Supabase create enquiry error, using disk db:', err);
      }
    }
    const db = loadLocalDb();
    db.enquiries.unshift(record);
    saveLocalDb(db);
    return record;
  },

  updateEnquiry: async (id, status) => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('enquiries').update({ status }).eq('id', id).select();
        if (!error && data && data.length > 0) {
          const rec = { ...data[0], createdAt: data[0].created_at };
          const db = loadLocalDb();
          const idx = db.enquiries.findIndex((e) => e.id === id);
          if (idx !== -1) {
            db.enquiries[idx] = rec;
            saveLocalDb(db);
          }
          return rec;
        }
      } catch (err) {
        console.warn('Supabase update enquiry error:', err);
      }
    }
    const db = loadLocalDb();
    const idx = db.enquiries.findIndex((e) => e.id === id);
    if (idx !== -1) {
      db.enquiries[idx].status = status;
      saveLocalDb(db);
      return db.enquiries[idx];
    }
    return null;
  },

  deleteEnquiry: async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('enquiries').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete enquiry error:', err);
      }
    }
    const db = loadLocalDb();
    db.enquiries = db.enquiries.filter((e) => e.id !== id);
    saveLocalDb(db);
    return true;
  },

  // FEEDBACK
  getFeedback: async (all = false) => {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('feedback').select('*').order('created_at', { ascending: false });
        if (!all) query = query.eq('is_approved', true);
        const { data, error } = await query;
        if (!error && data) {
          return data.map((f) => ({
            id: f.id,
            authorName: f.author_name || f.authorName,
            institution: f.institution,
            role: f.role,
            rating: f.rating,
            comment: f.comment,
            isApproved: f.is_approved !== undefined ? f.is_approved : f.isApproved,
            isFeatured: f.is_featured !== undefined ? f.is_featured : f.isFeatured,
            createdAt: f.created_at || f.createdAt,
          }));
        }
      } catch (err) {
        console.warn('Supabase fetch feedback error:', err);
      }
    }
    const db = loadLocalDb();
    let res = [...db.feedback];
    if (!all) res = res.filter((f) => f.isApproved);
    return res;
  },

  createFeedback: async (payload) => {
    const record = {
      id: `fb-${Date.now()}`,
      ...payload,
      isApproved: true,
      isFeatured: payload.rating >= 4,
      createdAt: new Date().toISOString(),
    };
    if (isSupabaseConfigured) {
      try {
        const supabasePayload = {
          author_name: payload.authorName,
          institution: payload.institution,
          role: payload.role,
          rating: payload.rating,
          comment: payload.comment,
          is_approved: true,
          is_featured: payload.rating >= 4,
        };
        const { data, error } = await supabase.from('feedback').insert([supabasePayload]).select();
        if (!error && data && data.length > 0) {
          const f = data[0];
          const rec = {
            id: f.id,
            authorName: f.author_name || record.authorName,
            institution: f.institution,
            role: f.role,
            rating: f.rating,
            comment: f.comment,
            isApproved: f.is_approved,
            isFeatured: f.is_featured,
            createdAt: f.created_at || record.createdAt,
          };
          const db = loadLocalDb();
          db.feedback.unshift(rec);
          saveLocalDb(db);
          return rec;
        }
      } catch (err) {
        console.warn('Supabase create feedback error:', err);
      }
    }
    const db = loadLocalDb();
    db.feedback.unshift(record);
    saveLocalDb(db);
    return record;
  },

  updateFeedback: async (id, updates) => {
    if (isSupabaseConfigured) {
      try {
        const supabaseUpdates = {};
        if (updates.isApproved !== undefined) supabaseUpdates.is_approved = updates.isApproved;
        if (updates.isFeatured !== undefined) supabaseUpdates.is_featured = updates.isFeatured;
        const { data, error } = await supabase.from('feedback').update(supabaseUpdates).eq('id', id).select();
        if (!error && data && data.length > 0) {
          const f = data[0];
          const rec = {
            id: f.id,
            authorName: f.author_name,
            institution: f.institution,
            role: f.role,
            rating: f.rating,
            comment: f.comment,
            isApproved: f.is_approved,
            isFeatured: f.is_featured,
            createdAt: f.created_at,
          };
          const db = loadLocalDb();
          const idx = db.feedback.findIndex((item) => item.id === id);
          if (idx !== -1) {
            db.feedback[idx] = rec;
            saveLocalDb(db);
          }
          return rec;
        }
      } catch (err) {
        console.warn('Supabase update feedback error:', err);
      }
    }
    const db = loadLocalDb();
    const idx = db.feedback.findIndex((f) => f.id === id);
    if (idx !== -1) {
      db.feedback[idx] = { ...db.feedback[idx], ...updates };
      saveLocalDb(db);
      return db.feedback[idx];
    }
    return null;
  },

  deleteFeedback: async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('feedback').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase delete feedback error:', err);
      }
    }
    const db = loadLocalDb();
    db.feedback = db.feedback.filter((f) => f.id !== id);
    saveLocalDb(db);
    return true;
  },

  // ALBUMS (Multi-Photo)
  getAlbums: async (category) => {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('albums').select('*').order('created_at', { ascending: false });
        if (category && category !== 'All') query = query.eq('category', category);
        const { data, error } = await query;
        if (!error && data) {
          return data.map((a) => ({
            id: a.id,
            title: a.title,
            category: a.category,
            location: a.location,
            date: a.date,
            caption: a.caption,
            gradient: a.gradient,
            imageUrl: a.image_url || a.imageUrl || null,
            images: Array.isArray(a.images)
              ? a.images
              : typeof a.images === 'string'
              ? JSON.parse(a.images)
              : [],
            createdAt: a.created_at || a.createdAt,
          }));
        }
      } catch (err) {
        console.warn('Supabase getAlbums error, falling back to disk db:', err);
      }
    }
    const db = loadLocalDb();
    let res = [...db.albums];
    if (category && category !== 'All') res = res.filter((a) => a.category === category);
    return res;
  },

  createAlbum: async (payload) => {
    const photoList = Array.isArray(payload.images) ? payload.images : [];
    const coverUrl = payload.imageUrl || (photoList.length > 0 ? photoList[0].url : null);
    const record = {
      id: `alb-${Date.now()}`,
      title: payload.title || '',
      category: payload.category || 'Campus Visits',
      location: payload.location || 'Campus Location',
      date: payload.date || '2026',
      caption: payload.caption || '',
      gradient: payload.gradient || 'from-blue-600 to-indigo-800',
      imageUrl: coverUrl,
      images: photoList,
      createdAt: new Date().toISOString(),
    };

    if (isSupabaseConfigured) {
      try {
        const supabasePayload = {
          title: record.title,
          category: record.category,
          location: record.location,
          date: record.date,
          caption: record.caption,
          gradient: record.gradient,
          image_url: record.imageUrl,
          images: record.images,
        };
        const { data, error } = await supabase.from('albums').insert([supabasePayload]).select();
        if (!error && data && data.length > 0) {
          const a = data[0];
          const rec = {
            id: a.id,
            title: a.title,
            category: a.category,
            location: a.location,
            date: a.date,
            caption: a.caption,
            gradient: a.gradient,
            imageUrl: a.image_url || record.imageUrl,
            images: Array.isArray(a.images)
              ? a.images
              : typeof a.images === 'string'
              ? JSON.parse(a.images)
              : record.images,
            createdAt: a.created_at || record.createdAt,
          };
          const db = loadLocalDb();
          db.albums.unshift(rec);
          saveLocalDb(db);
          return rec;
        }
      } catch (err) {
        console.warn('Supabase createAlbum error, using disk db fallback:', err);
      }
    }

    const db = loadLocalDb();
    db.albums.unshift(record);
    saveLocalDb(db);
    return record;
  },

  updateAlbum: async (id, updates) => {
    const photoList = Array.isArray(updates.images) ? updates.images : undefined;
    const coverUrl = updates.imageUrl !== undefined ? updates.imageUrl : (photoList && photoList.length > 0 ? photoList[0].url : undefined);

    if (isSupabaseConfigured) {
      try {
        const supabaseUpdates = {};
        if (updates.title !== undefined) supabaseUpdates.title = updates.title;
        if (updates.category !== undefined) supabaseUpdates.category = updates.category;
        if (updates.location !== undefined) supabaseUpdates.location = updates.location;
        if (updates.date !== undefined) supabaseUpdates.date = updates.date;
        if (updates.caption !== undefined) supabaseUpdates.caption = updates.caption;
        if (updates.gradient !== undefined) supabaseUpdates.gradient = updates.gradient;
        if (coverUrl !== undefined) supabaseUpdates.image_url = coverUrl;
        if (photoList !== undefined) supabaseUpdates.images = photoList;

        const { data, error } = await supabase.from('albums').update(supabaseUpdates).eq('id', id).select();
        if (!error && data && data.length > 0) {
          const a = data[0];
          const rec = {
            id: a.id,
            title: a.title,
            category: a.category,
            location: a.location,
            date: a.date,
            caption: a.caption,
            gradient: a.gradient,
            imageUrl: a.image_url,
            images: Array.isArray(a.images)
              ? a.images
              : typeof a.images === 'string'
              ? JSON.parse(a.images)
              : [],
            createdAt: a.created_at,
          };
          const db = loadLocalDb();
          const idx = db.albums.findIndex((alb) => alb.id === id);
          if (idx !== -1) {
            db.albums[idx] = rec;
            saveLocalDb(db);
          }
          return rec;
        }
      } catch (err) {
        console.warn('Supabase updateAlbum error:', err);
      }
    }

    const db = loadLocalDb();
    const idx = db.albums.findIndex((a) => a.id === id);
    if (idx !== -1) {
      const existing = db.albums[idx];
      const updatedImages = photoList !== undefined ? photoList : existing.images;
      const updatedCover = coverUrl !== undefined ? coverUrl : (updatedImages && updatedImages.length > 0 ? updatedImages[0].url : existing.imageUrl);

      db.albums[idx] = {
        ...existing,
        ...updates,
        imageUrl: updatedCover,
        images: updatedImages,
      };
      saveLocalDb(db);
      return db.albums[idx];
    }
    return null;
  },

  deleteAlbum: async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('albums').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteAlbum error:', err);
      }
    }
    const db = loadLocalDb();
    db.albums = db.albums.filter((a) => a.id !== id);
    saveLocalDb(db);
    return true;
  },

  // STATS
  getStats: async () => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('stats').select('*');
        if (!error && data) return data;
      } catch (err) {
        console.warn('Supabase getStats error:', err);
      }
    }
    const db = loadLocalDb();
    return db.stats;
  },

  // ============================================================
  // RECRUITMENT FORMS
  // ============================================================

  getRecruitmentForms: async (publishedOnly = false) => {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('recruitment_forms').select('*').order('created_at', { ascending: false });
        if (publishedOnly) query = query.eq('is_published', true);
        const { data, error } = await query;
        if (!error && data) {
          return data.map((f) => ({
            id: f.id,
            title: f.title,
            description: f.description,
            fields: Array.isArray(f.fields) ? f.fields : typeof f.fields === 'string' ? JSON.parse(f.fields) : [],
            isPublished: f.is_published,
            deadline: f.deadline,
            createdAt: f.created_at,
            updatedAt: f.updated_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase getRecruitmentForms error:', err);
      }
    }
    const db = loadLocalDb();
    let res = [...db.recruitmentForms];
    if (publishedOnly) res = res.filter((f) => f.isPublished);
    return res;
  },

  getRecruitmentFormById: async (id) => {
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('recruitment_forms').select('*').eq('id', id).single();
        if (!error && data) {
          return {
            id: data.id,
            title: data.title,
            description: data.description,
            fields: Array.isArray(data.fields) ? data.fields : typeof data.fields === 'string' ? JSON.parse(data.fields) : [],
            isPublished: data.is_published,
            deadline: data.deadline,
            createdAt: data.created_at,
            updatedAt: data.updated_at,
          };
        }
      } catch (err) {
        console.warn('Supabase getRecruitmentFormById error:', err);
      }
    }
    const db = loadLocalDb();
    return db.recruitmentForms.find((f) => f.id === id) || null;
  },

  createRecruitmentForm: async (payload) => {
    const record = {
      id: `form-${Date.now()}`,
      title: payload.title || 'Untitled Form',
      description: payload.description || '',
      fields: Array.isArray(payload.fields) ? payload.fields : [],
      isPublished: payload.isPublished || false,
      deadline: payload.deadline || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('recruitment_forms').insert([{
          title: record.title,
          description: record.description,
          fields: record.fields,
          is_published: record.isPublished,
          deadline: record.deadline,
        }]).select();
        if (!error && data && data.length > 0) {
          const f = data[0];
          const rec = {
            id: f.id,
            title: f.title,
            description: f.description,
            fields: Array.isArray(f.fields) ? f.fields : [],
            isPublished: f.is_published,
            deadline: f.deadline,
            createdAt: f.created_at,
            updatedAt: f.updated_at,
          };
          const db = loadLocalDb();
          db.recruitmentForms.unshift(rec);
          saveLocalDb(db);
          return rec;
        }
      } catch (err) {
        console.warn('Supabase createRecruitmentForm error:', err);
      }
    }
    const db = loadLocalDb();
    db.recruitmentForms.unshift(record);
    saveLocalDb(db);
    return record;
  },

  updateRecruitmentForm: async (id, updates) => {
    const supabaseUpdates = {};
    if (updates.title !== undefined) supabaseUpdates.title = updates.title;
    if (updates.description !== undefined) supabaseUpdates.description = updates.description;
    if (updates.fields !== undefined) supabaseUpdates.fields = updates.fields;
    if (updates.isPublished !== undefined) supabaseUpdates.is_published = updates.isPublished;
    if (updates.deadline !== undefined) supabaseUpdates.deadline = updates.deadline;
    supabaseUpdates.updated_at = new Date().toISOString();

    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('recruitment_forms').update(supabaseUpdates).eq('id', id).select();
        if (!error && data && data.length > 0) {
          const f = data[0];
          const rec = {
            id: f.id,
            title: f.title,
            description: f.description,
            fields: Array.isArray(f.fields) ? f.fields : [],
            isPublished: f.is_published,
            deadline: f.deadline,
            createdAt: f.created_at,
            updatedAt: f.updated_at,
          };
          const db = loadLocalDb();
          const idx = db.recruitmentForms.findIndex((fm) => fm.id === id);
          if (idx !== -1) { db.recruitmentForms[idx] = rec; saveLocalDb(db); }
          return rec;
        }
      } catch (err) {
        console.warn('Supabase updateRecruitmentForm error:', err);
      }
    }
    const db = loadLocalDb();
    const idx = db.recruitmentForms.findIndex((f) => f.id === id);
    if (idx !== -1) {
      db.recruitmentForms[idx] = { ...db.recruitmentForms[idx], ...updates, updatedAt: new Date().toISOString() };
      saveLocalDb(db);
      return db.recruitmentForms[idx];
    }
    return null;
  },

  deleteRecruitmentForm: async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('recruitment_forms').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteRecruitmentForm error:', err);
      }
    }
    const db = loadLocalDb();
    db.recruitmentForms = db.recruitmentForms.filter((f) => f.id !== id);
    db.recruitmentSubmissions = db.recruitmentSubmissions.filter((s) => s.formId !== id);
    saveLocalDb(db);
    return true;
  },

  // ============================================================
  // RECRUITMENT SUBMISSIONS
  // ============================================================

  getRecruitmentSubmissions: async (formId) => {
    if (isSupabaseConfigured) {
      try {
        let query = supabase.from('recruitment_submissions').select('*').order('created_at', { ascending: false });
        if (formId) query = query.eq('form_id', formId);
        const { data, error } = await query;
        if (!error && data) {
          return data.map((s) => ({
            id: s.id,
            formId: s.form_id,
            formTitle: s.form_title,
            data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data || {},
            status: s.status,
            ipAddress: s.ip_address,
            createdAt: s.created_at,
          }));
        }
      } catch (err) {
        console.warn('Supabase getRecruitmentSubmissions error:', err);
      }
    }
    const db = loadLocalDb();
    let res = [...db.recruitmentSubmissions];
    if (formId) res = res.filter((s) => s.formId === formId);
    res.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res;
  },

  createRecruitmentSubmission: async (payload) => {
    const record = {
      id: `sub-${Date.now()}`,
      formId: payload.formId,
      formTitle: payload.formTitle || '',
      data: payload.data || {},
      status: 'NEW',
      ipAddress: payload.ipAddress || '',
      createdAt: new Date().toISOString(),
    };
    if (isSupabaseConfigured) {
      try {
        const { data, error } = await supabase.from('recruitment_submissions').insert([{
          form_id: record.formId,
          form_title: record.formTitle,
          data: record.data,
          status: record.status,
          ip_address: record.ipAddress,
        }]).select();
        if (!error && data && data.length > 0) {
          const s = data[0];
          const rec = {
            id: s.id,
            formId: s.form_id,
            formTitle: s.form_title,
            data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data || {},
            status: s.status,
            ipAddress: s.ip_address,
            createdAt: s.created_at,
          };
          const db = loadLocalDb();
          db.recruitmentSubmissions.unshift(rec);
          saveLocalDb(db);
          return rec;
        }
      } catch (err) {
        console.warn('Supabase createRecruitmentSubmission error:', err);
      }
    }
    const db = loadLocalDb();
    db.recruitmentSubmissions.unshift(record);
    saveLocalDb(db);
    return record;
  },

  updateRecruitmentSubmission: async (id, updates) => {
    if (isSupabaseConfigured) {
      try {
        const sbUpdates = {};
        if (updates.status !== undefined) sbUpdates.status = updates.status;
        const { data, error } = await supabase.from('recruitment_submissions').update(sbUpdates).eq('id', id).select();
        if (!error && data && data.length > 0) {
          const s = data[0];
          const rec = {
            id: s.id,
            formId: s.form_id,
            formTitle: s.form_title,
            data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data || {},
            status: s.status,
            ipAddress: s.ip_address,
            createdAt: s.created_at,
          };
          const db = loadLocalDb();
          const idx = db.recruitmentSubmissions.findIndex((sub) => sub.id === id);
          if (idx !== -1) { db.recruitmentSubmissions[idx] = rec; saveLocalDb(db); }
          return rec;
        }
      } catch (err) {
        console.warn('Supabase updateRecruitmentSubmission error:', err);
      }
    }
    const db = loadLocalDb();
    const idx = db.recruitmentSubmissions.findIndex((s) => s.id === id);
    if (idx !== -1) {
      db.recruitmentSubmissions[idx] = { ...db.recruitmentSubmissions[idx], ...updates };
      saveLocalDb(db);
      return db.recruitmentSubmissions[idx];
    }
    return null;
  },

  deleteRecruitmentSubmission: async (id) => {
    if (isSupabaseConfigured) {
      try {
        await supabase.from('recruitment_submissions').delete().eq('id', id);
      } catch (err) {
        console.warn('Supabase deleteRecruitmentSubmission error:', err);
      }
    }
    const db = loadLocalDb();
    db.recruitmentSubmissions = db.recruitmentSubmissions.filter((s) => s.id !== id);
    saveLocalDb(db);
    return true;
  },
};

