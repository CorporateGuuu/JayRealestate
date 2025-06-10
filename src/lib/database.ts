import { createClient } from '@supabase/supabase-js';

// Supabase client configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Create a mock client for build time when environment variables are not available
const createSupabaseClient = () => {
  if (!supabaseUrl || !supabaseServiceKey) {
    // Return a mock client for build time
    console.warn('Supabase environment variables not found. Using mock client for build.');
    return null;
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
};

export const supabase = createSupabaseClient();

// Database Types
export interface Lead {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  property_type?: string;
  budget?: string;
  message: string;
  source: string;
  status: 'new' | 'contacted' | 'qualified' | 'closed';
  property_id?: string;
  property_name?: string;
  inquiry_type?: string;
  preferred_contact_time?: string;
  interests?: string[];
  preferred_time?: string;
  reason?: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: string;
  updated_at?: string;
}

// Lead Management Functions
export class LeadManager {
  
  // Create a new lead
  static async createLead(leadData: Omit<Lead, 'id' | 'created_at' | 'updated_at'>): Promise<Lead> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .insert([{
          ...leadData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }])
        .select()
        .single();

      if (error) {
        console.error('Database error creating lead:', error);
        throw new Error('Failed to save lead to database');
      }

      return data;
    } catch (error) {
      console.error('Error creating lead:', error);
      throw error;
    }
  }

  // Get all leads with pagination
  static async getLeads(page = 1, limit = 50): Promise<{ leads: Lead[], total: number }> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      const offset = (page - 1) * limit;

      const { data: leads, error: leadsError } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1);

      const { count, error: countError } = await supabase
        .from('leads')
        .select('*', { count: 'exact', head: true });

      if (leadsError || countError) {
        throw new Error('Failed to fetch leads');
      }

      return {
        leads: leads || [],
        total: count || 0
      };
    } catch (error) {
      console.error('Error fetching leads:', error);
      throw error;
    }
  }

  // Update lead status
  static async updateLeadStatus(id: string, status: Lead['status']): Promise<Lead> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        throw new Error('Failed to update lead status');
      }

      return data;
    } catch (error) {
      console.error('Error updating lead status:', error);
      throw error;
    }
  }

  // Get lead by ID
  static async getLeadById(id: string): Promise<Lead | null> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return null;
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('id', id)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          return null; // Lead not found
        }
        throw new Error('Failed to fetch lead');
      }

      return data;
    } catch (error) {
      console.error('Error fetching lead by ID:', error);
      throw error;
    }
  }

  // Delete lead
  static async deleteLead(id: string): Promise<boolean> {
    if (!supabase) {
      throw new Error('Database not available - missing environment variables');
    }

    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id);

      if (error) {
        throw new Error('Failed to delete lead');
      }

      return true;
    } catch (error) {
      console.error('Error deleting lead:', error);
      throw error;
    }
  }

  // Get leads by status
  static async getLeadsByStatus(status: Lead['status']): Promise<Lead[]> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('status', status)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to fetch leads by status');
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching leads by status:', error);
      throw error;
    }
  }

  // Search leads
  static async searchLeads(query: string): Promise<Lead[]> {
    if (!supabase) {
      console.warn('Database not available - missing environment variables');
      return [];
    }

    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .or(`name.ilike.%${query}%,email.ilike.%${query}%,message.ilike.%${query}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error('Failed to search leads');
      }

      return data || [];
    } catch (error) {
      console.error('Error searching leads:', error);
      throw error;
    }
  }
}
