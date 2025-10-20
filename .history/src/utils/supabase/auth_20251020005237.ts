import { supabase } from './client';

/**
 * Authentication functions for Teacher Login
 */

// Sign up a new teacher (use this once to create your mother's account)
export async function signUpTeacher(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error signing up teacher:', error);
    return { success: false, error };
  }
}

// Sign in teacher
export async function signInTeacher(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error signing in teacher:', error);
    return { success: false, error };
  }
}

// Sign out teacher
export async function signOutTeacher() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error signing out teacher:', error);
    return { success: false, error };
  }
}

// Check if teacher is currently logged in
export async function getCurrentTeacher() {
  try {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) throw error;
    return { success: true, session };
  } catch (error) {
    console.error('Error getting current teacher:', error);
    return { success: false, session: null, error };
  }
}

// Listen to auth state changes
export function onAuthStateChange(callback: (event: string, session: any) => void) {
  const { data: { subscription } } = supabase.auth.onAuthStateChange(callback);
  return subscription;
}
