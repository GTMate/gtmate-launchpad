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

