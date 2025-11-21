import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Missing Supabase environment variables. Using mock data.');
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Tipos TypeScript para los partners
export interface Partner {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  photo_url: string | null;
  email: string | null;
  rate: number;
  markets: string[]; // Array de mercados (max 5)
  hires: number;
  verified: boolean;
  bio: string | null;
  skills: string[] | null;
  languages: string[] | null;
  expertise: string[] | null; // Array de áreas de expertise
  active: boolean;
  available: boolean;
}

// Funciones de la API
export const fetchPartners = async (): Promise<Partner[]> => {
  if (!supabase) {
    console.warn('Supabase not configured, returning empty array');
    return [];
  }

  const { data, error } = await supabase
    .from('gtm_partners')
    .select('*')
    .eq('active', true)
    .order('hires', { ascending: false });

  if (error) {
    console.error('Error fetching partners:', error);
    throw error;
  }

  return data || [];
};

export const fetchPartnersByMarket = async (market: string): Promise<Partner[]> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('gtm_partners')
    .select('*')
    .eq('active', true)
    .contains('markets', [market]) // Buscar en el array de markets
    .order('hires', { ascending: false });

  if (error) {
    console.error('Error fetching partners by market:', error);
    throw error;
  }

  return data || [];
};

export const fetchPartnersByRate = async (minRate: number, maxRate: number): Promise<Partner[]> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return [];
  }

  const { data, error } = await supabase
    .from('gtm_partners')
    .select('*')
    .eq('active', true)
    .gte('rate', minRate)
    .lte('rate', maxRate)
    .order('rate', { ascending: true });

  if (error) {
    console.error('Error fetching partners by rate:', error);
    throw error;
  }

  return data || [];
};

export const incrementHires = async (partnerId: string): Promise<void> => {
  if (!supabase) {
    console.warn('Supabase not configured');
    return;
  }

  const { error } = await supabase.rpc('increment_hires', {
    partner_id: partnerId
  });

  if (error) {
    console.error('Error incrementing hires:', error);
    throw error;
  }
};

// ============================================
// Contact Requests Functions
// ============================================

export interface ContactRequest {
  id?: string;
  first_name: string;
  last_name: string;
  company_name: string;
  email: string;
  target_region: string;
  partner_id?: string;
  partner_name?: string;
  status?: string;
  created_at?: string;
  updated_at?: string;
  notes?: string;
}

export async function createContactRequest(request: ContactRequest): Promise<{ success: boolean; error?: string; data?: any }> {
  if (!supabase) {
    console.error("Supabase client not initialized. Check VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
    return { success: false, error: "Database not configured" };
  }

  try {
    const { data, error } = await supabase
      .from('contact_requests')
      .insert([{
        first_name: request.first_name,
        last_name: request.last_name,
        company_name: request.company_name,
        email: request.email,
        target_region: request.target_region,
        partner_id: request.partner_id,
        partner_name: request.partner_name,
        status: 'pending'
      }])
      .select()
      .single();

    if (error) {
      console.error("Error creating contact request:", error);
      return { success: false, error: error.message };
    }

    console.log("Contact request created successfully:", data);
    return { success: true, data };
  } catch (err) {
    console.error("Unexpected error creating contact request:", err);
    return { success: false, error: "Unexpected error occurred" };
  }
}

export async function fetchContactRequests(): Promise<ContactRequest[] | null> {
  if (!supabase) {
    console.warn("Supabase client not initialized.");
    return null;
  }
  
  const { data, error } = await supabase
    .from('contact_requests')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching contact requests:", error);
    return null;
  }
  return data as ContactRequest[];
}

export async function fetchContactRequestsByStatus(status: string): Promise<ContactRequest[] | null> {
  if (!supabase) {
    console.warn("Supabase client not initialized.");
    return null;
  }
  
  const { data, error } = await supabase
    .from('contact_requests')
    .select('*')
    .eq('status', status)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(`Error fetching contact requests with status ${status}:`, error);
    return null;
  }
  return data as ContactRequest[];
}

