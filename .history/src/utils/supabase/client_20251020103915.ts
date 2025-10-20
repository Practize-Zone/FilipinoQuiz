
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database Types
export interface QuizScore {
  id?: number;
  student_name: string;
  score: number;
  total_questions: number;
  percentage: number;
  quiz_topic: string;
  created_at?: string;
}

export interface Teacher {
  id?: number;
  email: string;
  password_hash?: string;
  created_at?: string;
}