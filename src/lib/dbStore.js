import { supabaseAdmin } from './supabase.js';

export const dbStore = {
  // ============================================================
  // ENQUIRIES
  // ============================================================
  getEnquiries: async (status) => {
    let query = supabaseAdmin.from('enquiries').select('*').order('created_at', { ascending: false });
    if (status) query = query.eq('status', status);
    const { data, error } = await query;
    if (error) throw error;
    return data.map(e => ({ ...e, createdAt: e.created_at }));
  },
  createEnquiry: async (payload) => {
    const { data, error } = await supabaseAdmin.from('enquiries').insert([{
      ...payload,
      status: 'NEW'
    }]).select();
    if (error) throw error;
    return { ...data[0], createdAt: data[0].created_at };
  },
  updateEnquiry: async (id, status) => {
    const { data, error } = await supabaseAdmin.from('enquiries').update({ status }).eq('id', id).select();
    if (error) throw error;
    return { ...data[0], createdAt: data[0].created_at };
  },
  deleteEnquiry: async (id) => {
    const { error } = await supabaseAdmin.from('enquiries').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ============================================================
  // FEEDBACK
  // ============================================================
  getFeedback: async (all = false) => {
    let query = supabaseAdmin.from('feedback').select('*').order('created_at', { ascending: false });
    if (!all) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (error) throw error;
    return data.map(f => ({ ...f, isPublished: f.is_published, createdAt: f.created_at }));
  },
  createFeedback: async (payload) => {
    const { data, error } = await supabaseAdmin.from('feedback').insert([{
      ...payload,
      is_published: false
    }]).select();
    if (error) throw error;
    return { ...data[0], isPublished: data[0].is_published, createdAt: data[0].created_at };
  },
  updateFeedback: async (id, updates) => {
    const sbUpdates = {};
    if (updates.isPublished !== undefined) sbUpdates.is_published = updates.isPublished;
    if (updates.name !== undefined) sbUpdates.name = updates.name;
    if (updates.institution !== undefined) sbUpdates.institution = updates.institution;
    if (updates.role !== undefined) sbUpdates.role = updates.role;
    if (updates.message !== undefined) sbUpdates.message = updates.message;
    if (updates.rating !== undefined) sbUpdates.rating = updates.rating;
    const { data, error } = await supabaseAdmin.from('feedback').update(sbUpdates).eq('id', id).select();
    if (error) throw error;
    return { ...data[0], isPublished: data[0].is_published, createdAt: data[0].created_at };
  },
  deleteFeedback: async (id) => {
    const { error } = await supabaseAdmin.from('feedback').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ============================================================
  // ALBUMS
  // ============================================================
  getAlbums: async (category) => {
    let query = supabaseAdmin.from('albums').select('*').order('created_at', { ascending: false });
    if (category && category !== 'All') query = query.eq('category', category);
    const { data, error } = await query;
    if (error) throw error;
    return data.map(a => ({
      ...a,
      coverUrl: a.cover_url,
      isPublished: a.is_published,
      createdAt: a.created_at,
      photos: typeof a.photos === 'string' ? JSON.parse(a.photos) : (a.photos || [])
    }));
  },
  createAlbum: async (payload) => {
    const { data, error } = await supabaseAdmin.from('albums').insert([{
      ...payload,
      cover_url: payload.coverUrl,
      is_published: payload.isPublished
    }]).select();
    if (error) throw error;
    return { ...data[0], coverUrl: data[0].cover_url, isPublished: data[0].is_published, createdAt: data[0].created_at, photos: typeof data[0].photos === 'string' ? JSON.parse(data[0].photos) : (data[0].photos || []) };
  },
  updateAlbum: async (id, updates) => {
    const sbUpdates = {};
    if (updates.title !== undefined) sbUpdates.title = updates.title;
    if (updates.category !== undefined) sbUpdates.category = updates.category;
    if (updates.coverUrl !== undefined) sbUpdates.cover_url = updates.coverUrl;
    if (updates.photos !== undefined) sbUpdates.photos = updates.photos;
    if (updates.isPublished !== undefined) sbUpdates.is_published = updates.isPublished;
    const { data, error } = await supabaseAdmin.from('albums').update(sbUpdates).eq('id', id).select();
    if (error) throw error;
    return { ...data[0], coverUrl: data[0].cover_url, isPublished: data[0].is_published, createdAt: data[0].created_at, photos: typeof data[0].photos === 'string' ? JSON.parse(data[0].photos) : (data[0].photos || []) };
  },
  deleteAlbum: async (id) => {
    const { error } = await supabaseAdmin.from('albums').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ============================================================
  // STATS
  // ============================================================
  getStats: async () => {
    const { data, error } = await supabaseAdmin.from('stats').select('*').single();
    if (error) {
      if (error.code === 'PGRST116') {
        // Not found, return defaults
        return { totalStudents: 50000, collegesConnected: 120, placementRate: 94, activeWorkshops: 45 };
      }
      throw error;
    }
    return {
      totalStudents: data.total_students,
      collegesConnected: data.colleges_connected,
      placementRate: data.placement_rate,
      activeWorkshops: data.active_workshops
    };
  },

  // ============================================================
  // RECRUITMENT FORMS
  // ============================================================
  getRecruitmentForms: async (publishedOnly = false) => {
    let query = supabaseAdmin.from('recruitment_forms').select('*').order('created_at', { ascending: false });
    if (publishedOnly) query = query.eq('is_published', true);
    const { data, error } = await query;
    if (error) throw error;
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
  },
  getRecruitmentFormById: async (id) => {
    const { data, error } = await supabaseAdmin.from('recruitment_forms').select('*').eq('id', id).single();
    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }
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
  },
  createRecruitmentForm: async (payload) => {
    const { data, error } = await supabaseAdmin.from('recruitment_forms').insert([{
      title: payload.title || 'Untitled Form',
      description: payload.description || '',
      fields: Array.isArray(payload.fields) ? payload.fields : [],
      is_published: payload.isPublished || false,
      deadline: payload.deadline || null,
    }]).select();
    if (error) throw error;
    const f = data[0];
    return {
      id: f.id,
      title: f.title,
      description: f.description,
      fields: Array.isArray(f.fields) ? f.fields : [],
      isPublished: f.is_published,
      deadline: f.deadline,
      createdAt: f.created_at,
      updatedAt: f.updated_at,
    };
  },
  updateRecruitmentForm: async (id, updates) => {
    const supabaseUpdates = {};
    if (updates.title !== undefined) supabaseUpdates.title = updates.title;
    if (updates.description !== undefined) supabaseUpdates.description = updates.description;
    if (updates.fields !== undefined) supabaseUpdates.fields = updates.fields;
    if (updates.isPublished !== undefined) supabaseUpdates.is_published = updates.isPublished;
    if (updates.deadline !== undefined) supabaseUpdates.deadline = updates.deadline;
    supabaseUpdates.updated_at = new Date().toISOString();

    const { data, error } = await supabaseAdmin.from('recruitment_forms').update(supabaseUpdates).eq('id', id).select();
    if (error) throw error;
    const f = data[0];
    return {
      id: f.id,
      title: f.title,
      description: f.description,
      fields: Array.isArray(f.fields) ? f.fields : [],
      isPublished: f.is_published,
      deadline: f.deadline,
      createdAt: f.created_at,
      updatedAt: f.updated_at,
    };
  },
  deleteRecruitmentForm: async (id) => {
    const { error } = await supabaseAdmin.from('recruitment_forms').delete().eq('id', id);
    if (error) throw error;
    return true;
  },

  // ============================================================
  // RECRUITMENT SUBMISSIONS
  // ============================================================
  getRecruitmentSubmissions: async (formId) => {
    let query = supabaseAdmin.from('recruitment_submissions').select('*').order('created_at', { ascending: false });
    if (formId) query = query.eq('form_id', formId);
    const { data, error } = await query;
    if (error) throw error;
    return data.map((s) => ({
      id: s.id,
      formId: s.form_id,
      formTitle: s.form_title,
      data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data || {},
      status: s.status,
      ipAddress: s.ip_address,
      createdAt: s.created_at,
    }));
  },
  createRecruitmentSubmission: async (payload) => {
    const { data, error } = await supabaseAdmin.from('recruitment_submissions').insert([{
      form_id: payload.formId,
      form_title: payload.formTitle || '',
      data: payload.data || {},
      status: 'NEW',
      ip_address: payload.ipAddress || '',
    }]).select();
    if (error) throw error;
    const s = data[0];
    return {
      id: s.id,
      formId: s.form_id,
      formTitle: s.form_title,
      data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data || {},
      status: s.status,
      ipAddress: s.ip_address,
      createdAt: s.created_at,
    };
  },
  updateRecruitmentSubmission: async (id, updates) => {
    const sbUpdates = {};
    if (updates.status !== undefined) sbUpdates.status = updates.status;
    const { data, error } = await supabaseAdmin.from('recruitment_submissions').update(sbUpdates).eq('id', id).select();
    if (error) throw error;
    const s = data[0];
    return {
      id: s.id,
      formId: s.form_id,
      formTitle: s.form_title,
      data: typeof s.data === 'string' ? JSON.parse(s.data) : s.data || {},
      status: s.status,
      ipAddress: s.ip_address,
      createdAt: s.created_at,
    };
  },
  deleteRecruitmentSubmission: async (id) => {
    const { error } = await supabaseAdmin.from('recruitment_submissions').delete().eq('id', id);
    if (error) throw error;
    return true;
  }
};
