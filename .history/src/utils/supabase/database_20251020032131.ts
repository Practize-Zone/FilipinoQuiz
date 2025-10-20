import { supabase, QuizScore } from './client';

/**
 * Database functions for Quiz Scores
 */

// Save a new quiz score to the database
export async function saveQuizScore(score: Omit<QuizScore, 'id' | 'created_at'>) {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .insert([score])
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error saving quiz score:', error);
    return { success: false, error };
  }
}

// Get all quiz scores (for teacher dashboard)
export async function getAllQuizScores() {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching quiz scores:', error);
    return { success: false, data: [], error };
  }
}

// Get scores for a specific student
export async function getScoresByStudent(studentName: string) {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('*')
      .eq('student_name', studentName)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return { success: true, data: data || [] };
  } catch (error) {
    console.error('Error fetching student scores:', error);
    return { success: false, data: [], error };
  }
}

// Get statistics (for dashboard cards)
export async function getQuizStatistics() {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .select('*');

    if (error) throw error;

    const scores = data || [];
    const totalStudents = scores.length;
    const averageScore = totalStudents > 0
      ? scores.reduce((sum, s) => sum + s.score, 0) / totalStudents
      : 0;
    const perfectScores = scores.filter(s => s.percentage === 100).length;
    const averagePercentage = totalStudents > 0
      ? scores.reduce((sum, s) => sum + s.percentage, 0) / totalStudents
      : 0;

    return {
      success: true,
      data: {
        totalStudents,
        averageScore,
        perfectScores,
        averagePercentage,
      },
    };
  } catch (error) {
    console.error('Error fetching statistics:', error);
    return {
      success: false,
      data: {
        totalStudents: 0,
        averageScore: 0,
        perfectScores: 0,
        averagePercentage: 0,
      },
      error,
    };
  }
}

// Delete a quiz score (optional - for admin)
export async function deleteQuizScore(id: number) {
  try {
    const { error } = await supabase
      .from('quiz_scores')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error deleting quiz score:', error);
    return { success: false, error };
  }
}

// Subscribe to real-time updates (for live dashboard)
export function subscribeToQuizScores(callback: (payload: any) => void) {
  const subscription = supabase
    .channel('quiz_scores_changes')
    .on(
      'postgres_changes',
      {
        event: '*', // Listen to all events (INSERT, UPDATE, DELETE)
        schema: 'public',
        table: 'quiz_scores',
      },
      callback
    )
    .subscribe();

  return subscription;
}

// --- Convenience functions for the two-part quiz flow ---
// Save Part 1 score and return the new record id
export async function savePart1Score(student_name: string, score: number, total_questions: number) {
  try {
    const percentage = (score / total_questions) * 100;
    const payload = {
      student_name,
      score,
      total_questions,
      percentage,
      quiz_topic: 'Ang Matanda at ang Dagat'
    };

    const { data, error } = await supabase
      .from('quiz_scores')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    // return the new record id for later updates
    return { success: true, recordId: data?.id };
  } catch (error) {
    console.error('Error saving part1 score:', error);
    return { success: false, error };
  }
}

// Update an existing record with part 2 score and recalculate totals/percentage
export async function updatePart2Score(recordId: number, part2Score: number, totalQuestions: number) {
  try {
    // Fetch existing record to combine scores if needed
    const { data: existing, error: fetchError } = await supabase
      .from('quiz_scores')
      .select('*')
      .eq('id', recordId)
      .single();

    if (fetchError) throw fetchError;

    const combinedScore = (existing?.score || 0) + part2Score;
    const percentage = (combinedScore / (totalQuestions * 1)) * 100; // keep totalQuestions consistent

    const { error } = await supabase
      .from('quiz_scores')
      .update({ score: combinedScore, total_questions: totalQuestions, percentage })
      .eq('id', recordId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating part2 score:', error);
    return { success: false, error };
  }
}