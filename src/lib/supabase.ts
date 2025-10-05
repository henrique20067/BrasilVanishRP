import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface VipPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  features: string[];
  color: string;
  is_active: boolean;
  display_order: number;
  created_at: string;
}

export interface Purchase {
  id: string;
  package_id: string;
  player_name: string;
  email: string;
  amount: number;
  status: string;
  payment_method?: string;
  created_at: string;
  expires_at?: string;
}
