import { supabase, QuizScore } from './client';

/**
 * Database functions for Quiz Scores
 */

// Save a new quiz score to the database (legacy support - use savePart1Score/updatePart2Score for new flow)
export async function saveQuizScore(score: Omit<QuizScore, 'id' | 'created_at'>) {
  try {
    // Map old schema to new schema
    const payload: any = {
      student_name: score.student_name,
      quiz_topic: score.quiz_topic || 'Ang Matanda at ang Dagat',
      completed_at: new Date().toISOString()
    };

    // If it's a complete quiz (both parts), split the score
    if (score.part1_score !== undefined && score.part2_score !== undefined) {
      payload.part1_score = score.part1_score;
      payload.part1_total = score.part1_total || 5;
      payload.part1_percentage = score.part1_percentage;
      payload.part2_score = score.part2_score;
      payload.part2_total = score.part2_total || 5;
      payload.part2_percentage = score.part2_percentage;
    } else {
      // Fallback: treat as complete quiz with combined score
      // Assume 50/50 split for Part 1 and Part 2
      const totalScore = score.total_score || 0;
      const halfTotal = 5;
      payload.part1_score = Math.min(totalScore, halfTotal);
      payload.part2_score = Math.max(0, totalScore - halfTotal);
      payload.part1_total = halfTotal;
      payload.part2_total = halfTotal;
      payload.part1_percentage = (payload.part1_score / halfTotal) * 100;
      payload.part2_percentage = (payload.part2_score / halfTotal) * 100;
    }

    const { data, error } = await supabase
      .from('quiz_scores')
      .insert([payload])
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
      ? scores.reduce((sum, s) => sum + (s.total_score || 0), 0) / totalStudents
      : 0;
    const perfectScores = scores.filter(s => s.overall_percentage === 100).length;
    const averagePercentage = totalStudents > 0
      ? scores.reduce((sum, s) => sum + (s.overall_percentage || 0), 0) / totalStudents
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
export async function savePart1Score(student_name: string, score: number, total_questions: number = 5) {
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
export async function updatePart2Score(recordId: number, part2Score: number, totalQuestions: number = 5) {
  try {
    const part2_percentage = (part2Score / totalQuestions) * 100;
    
    const { error } = await supabase
      .from('quiz_scores')
      .update({ 
        part2_score: part2Score, 
        part2_total: totalQuestions, 
        part2_percentage,
        completed_at: new Date().toISOString() // Mark as completed
      })
      .eq('id', recordId);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error updating part2 score:', error);
    return { success: false, error };
  }
}