import { supabase, QuizScore } from './client';

/**
 * Database functions for Quiz Scores
 */

// Save Part 1 score and return record ID
export async function savePart1Score(studentName: string, score: number, totalQuestions: number) {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .insert([{
        student_name: studentName,
        part1_score: score,
        part1_total: totalQuestions
      }])
      .select()
      .single();

    if (error) throw error;
    return { success: true, recordId: data.id };
  } catch (error) {
    console.error('Error saving part 1 score:', error);
    return { success: false, error };
  }
}

// Update Part 2 score for an existing record
export async function updatePart2Score(recordId: number, score: number, totalQuestions: number) {
  try {
    const { data, error } = await supabase
      .from('quiz_scores')
      .update({
        part2_score: score,
        part2_total: totalQuestions
      })
      .eq('id', recordId)
      .select()
      .single();

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    console.error('Error updating part 2 score:', error);
    return { success: false, error };
  }
}

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
    const part1_percentage = (score / total_questions) * 100;
    const payload = {
      student_name,
      part1_score: score,
      part1_total: total_questions,
      part1_percentage,
      quiz_topic: 'Ang Matanda at ang Dagat'
    };

    const { data, error } = await supabase
      .from('quiz_scores')
      .insert([payload])
      .select()
      .single();

    if (error) throw error;
    return { success: true, recordId: data?.id };
  } catch (error) {
    console.error('Error saving part1 score:', error);
    return { success: false, error };
  }
}

// Update an existing record with part 2 score
export async function updatePart2Score(recordId: number, score: number, total_questions: number) {
  try {
    const part2_percentage = (score / total_questions) * 100;
    
    const { error } = await supabase
      .from('quiz_scores')
      .update({ 
        part2_score: score,
        part2_total: total_questions,
        part2_percentage,
        completed_at: new Date().toISOString()
      })
      .eq('id', recordId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating part2 score:', error);
    return { success: false, error };
  }
}
