import { createClient } from '@supabase/supabase-js';

// These will be set in your .env file in VSCode
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface QuizScore {
  id?: number;
  student_name: string;
  part1_score: number;
  part1_total: number;
  part1_percentage: number;
  part2_score?: number;
  part2_total?: number;
  part2_percentage?: number;
  total_score?: number;
  total_questions?: number;
  overall_percentage?: number;
  quiz_topic: string;
  completed_at?: string;
  created_at?: string;
}

export interface Teacher {
  id?: number;
  email: string;
  password_hash?: string;
  created_at?: string;
}
