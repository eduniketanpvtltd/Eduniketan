import { supabase } from './supabase';

const isSupabaseConfigured =
  process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes('xyzcompany');

let localDb = {
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

// Database Operations
export const dbStore = {
  // ENQUIRIES
  getEnquiries: async (status) => {
    if (isSupabaseConfigured) {
      let query = supabase.from('enquiries').select('*').order('created_at', { ascending: false });
      if (status) query = query.eq('status', status);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let res = [...localDb.enquiries];
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
      const { data, error } = await supabase.from('enquiries').insert([payload]).select();
      if (!error && data) return data[0];
    }
    localDb.enquiries.unshift(record);
    return record;
  },

  updateEnquiry: async (id, status) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('enquiries').update({ status }).eq('id', id).select();
      if (!error && data) return data[0];
    }
    const idx = localDb.enquiries.findIndex((e) => e.id === id);
    if (idx !== -1) {
      localDb.enquiries[idx].status = status;
      return localDb.enquiries[idx];
    }
    return null;
  },

  deleteEnquiry: async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('enquiries').delete().eq('id', id);
    }
    localDb.enquiries = localDb.enquiries.filter((e) => e.id !== id);
    return true;
  },

  // FEEDBACK
  getFeedback: async (all = false) => {
    if (isSupabaseConfigured) {
      let query = supabase.from('feedback').select('*').order('created_at', { ascending: false });
      if (!all) query = query.eq('is_approved', true);
      const { data, error } = await query;
      if (!error && data) return data;
    }
    let res = [...localDb.feedback];
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
      const { data, error } = await supabase.from('feedback').insert([payload]).select();
      if (!error && data) return data[0];
    }
    localDb.feedback.unshift(record);
    return record;
  },

  updateFeedback: async (id, updates) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('feedback').update(updates).eq('id', id).select();
      if (!error && data) return data[0];
    }
    const idx = localDb.feedback.findIndex((f) => f.id === id);
    if (idx !== -1) {
      localDb.feedback[idx] = { ...localDb.feedback[idx], ...updates };
      return localDb.feedback[idx];
    }
    return null;
  },

  deleteFeedback: async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('feedback').delete().eq('id', id);
    }
    localDb.feedback = localDb.feedback.filter((f) => f.id !== id);
    return true;
  },

  // ALBUMS (Multi-Photo)
  getAlbums: async (category) => {
    if (isSupabaseConfigured) {
      let query = supabase.from('albums').select('*').order('created_at', { ascending: false });
      if (category && category !== 'All') query = query.eq('category', category);
      const { data, error } = await query;
      if (!error && data) {
        return data.map(a => ({
          ...a,
          images: Array.isArray(a.images) ? a.images : (a.images ? JSON.parse(a.images) : [])
        }));
      }
    }
    let res = [...localDb.albums];
    if (category && category !== 'All') res = res.filter((a) => a.category === category);
    return res;
  },

  createAlbum: async (payload) => {
    const record = {
      id: `alb-${Date.now()}`,
      ...payload,
      images: payload.images || [],
      createdAt: new Date().toISOString(),
    };
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('albums').insert([payload]).select();
      if (!error && data) return data[0];
    }
    localDb.albums.unshift(record);
    return record;
  },

  updateAlbum: async (id, updates) => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('albums').update(updates).eq('id', id).select();
      if (!error && data) return data[0];
    }
    const idx = localDb.albums.findIndex((a) => a.id === id);
    if (idx !== -1) {
      localDb.albums[idx] = { ...localDb.albums[idx], ...updates };
      return localDb.albums[idx];
    }
    return null;
  },

  deleteAlbum: async (id) => {
    if (isSupabaseConfigured) {
      await supabase.from('albums').delete().eq('id', id);
    }
    localDb.albums = localDb.albums.filter((a) => a.id !== id);
    return true;
  },

  // STATS
  getStats: async () => {
    if (isSupabaseConfigured) {
      const { data, error } = await supabase.from('stats').select('*');
      if (!error && data) return data;
    }
    return localDb.stats;
  },
};
