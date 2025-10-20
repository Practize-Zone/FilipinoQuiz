import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types - Updated to match new schema
export interface QuizScore {
  id?: number;
  student_name: string;
  
  // Part 1 (Pagbabalik-aral)
  part1_score?: number | null;
  part1_total?: number;
  part1_percentage?: number | null;
  
  // Part 2 (Pangunahing Quiz)
  part2_score?: number | null;
  part2_total?: number;
  part2_percentage?: number | null;
  
  // Combined totals (auto-calculated)
  total_score?: number;
  total_questions?: number;
  overall_percentage?: number;
  
  quiz_topic: string;
  completed_at?: string | null;
  created_at?: string;
}

export interface Teacher {
  id?: number;
  email: string;
  password_hash?: string;
  created_at?: string;
}