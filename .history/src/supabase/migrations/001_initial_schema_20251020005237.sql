-- Filipino Quiz Website - Initial Database Schema
-- Run this in Supabase SQL Editor

-- ============================================
-- 1. CREATE QUIZ SCORES TABLE
-- ============================================

CREATE TABLE IF NOT EXISTS quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL CHECK (score >= 0),
  total_questions INTEGER NOT NULL CHECK (total_questions > 0),
  percentage DECIMAL(5,2) NOT NULL CHECK (percentage >= 0 AND percentage <= 100),
  quiz_topic TEXT NOT NULL DEFAULT 'Ang Matanda at ang Dagat',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX IF NOT EXISTS idx_quiz_scores_student_name 
  ON quiz_scores(student_name);

CREATE INDEX IF NOT EXISTS idx_quiz_scores_created_at 
  ON quiz_scores(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_quiz_scores_percentage 
  ON quiz_scores(percentage DESC);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 4. CREATE RLS POLICIES
-- ============================================

-- Policy 1: Anyone can submit quiz scores (students)
DROP POLICY IF EXISTS "Allow public insert for students" ON quiz_scores;
CREATE POLICY "Allow public insert for students"
  ON quiz_scores
  FOR INSERT
  TO public
  WITH CHECK (true);

-- Policy 2: Only authenticated users can view scores (teachers)
DROP POLICY IF EXISTS "Allow authenticated read for teachers" ON quiz_scores;
CREATE POLICY "Allow authenticated read for teachers"
  ON quiz_scores
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Allow public read for students to see their own results
DROP POLICY IF EXISTS "Allow public read for own scores" ON quiz_scores;
CREATE POLICY "Allow public read for own scores"
  ON quiz_scores
  FOR SELECT
  TO public
  USING (true);

-- ============================================
-- 5. CREATE HELPFUL VIEWS (OPTIONAL)
-- ============================================

-- View: Student Statistics
CREATE OR REPLACE VIEW student_statistics AS
SELECT 
  student_name,
  COUNT(*) as total_attempts,
  AVG(score) as average_score,
  AVG(percentage) as average_percentage,
  MAX(percentage) as best_percentage,
  MIN(percentage) as lowest_percentage,
  MAX(created_at) as last_attempt
FROM quiz_scores
GROUP BY student_name;

-- View: Daily Statistics
CREATE OR REPLACE VIEW daily_statistics AS
SELECT 
  DATE(created_at) as quiz_date,
  COUNT(*) as total_submissions,
  AVG(percentage) as average_percentage,
  COUNT(CASE WHEN percentage = 100 THEN 1 END) as perfect_scores
FROM quiz_scores
GROUP BY DATE(created_at)
ORDER BY quiz_date DESC;

-- ============================================
-- 6. CREATE FUNCTIONS (OPTIONAL)
-- ============================================

-- Function: Get class average
CREATE OR REPLACE FUNCTION get_class_average()
RETURNS DECIMAL AS $$
  SELECT ROUND(AVG(percentage), 2)
  FROM quiz_scores;
$$ LANGUAGE SQL STABLE;

-- Function: Get top students
CREATE OR REPLACE FUNCTION get_top_students(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  student_name TEXT,
  best_score INTEGER,
  best_percentage DECIMAL,
  attempt_count BIGINT
) AS $$
  SELECT 
    qs.student_name,
    MAX(qs.score) as best_score,
    MAX(qs.percentage) as best_percentage,
    COUNT(*) as attempt_count
  FROM quiz_scores qs
  GROUP BY qs.student_name
  ORDER BY best_percentage DESC, attempt_count DESC
  LIMIT limit_count;
$$ LANGUAGE SQL STABLE;

-- ============================================
-- 7. ENABLE REALTIME (FOR LIVE UPDATES)
-- ============================================

-- Enable realtime for quiz_scores table
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_scores;

-- ============================================
-- 8. GRANT PERMISSIONS
-- ============================================

-- Allow public to use views
GRANT SELECT ON student_statistics TO anon, authenticated;
GRANT SELECT ON daily_statistics TO anon, authenticated;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Uncomment to test:

-- Test 1: Insert sample data
-- INSERT INTO quiz_scores (student_name, score, total_questions, percentage, quiz_topic)
-- VALUES 
--   ('Juan dela Cruz', 5, 5, 100.00, 'Ang Matanda at ang Dagat'),
--   ('Maria Santos', 4, 5, 80.00, 'Ang Matanda at ang Dagat'),
--   ('Pedro Reyes', 3, 5, 60.00, 'Ang Matanda at ang Dagat');

-- Test 2: View all scores
-- SELECT * FROM quiz_scores ORDER BY created_at DESC;

-- Test 3: View statistics
-- SELECT * FROM student_statistics;
-- SELECT * FROM daily_statistics;

-- Test 4: Get class average
-- SELECT get_class_average();

-- Test 5: Get top students
-- SELECT * FROM get_top_students(5);

-- ============================================
-- SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN 
  RAISE NOTICE '✅ Database schema created successfully!';
  RAISE NOTICE '📊 Tables: quiz_scores';
  RAISE NOTICE '🔒 RLS Policies: Enabled';
  RAISE NOTICE '⚡ Realtime: Enabled';
  RAISE NOTICE '📈 Views: student_statistics, daily_statistics';
  RAISE NOTICE '🎯 Ready to use!';
END $$;
