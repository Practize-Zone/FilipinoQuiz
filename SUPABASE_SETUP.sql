-- ============================================
-- Filipino Quiz - Supabase Database Setup
-- ============================================
-- Copy and paste this entire SQL into Supabase SQL Editor
-- Go to: https://supabase.com/dashboard → Your Project → SQL Editor → New Query

-- ============================================
-- 1. CREATE QUIZ_SCORES TABLE
-- ============================================

-- Drop the old table if it exists
DROP TABLE IF EXISTS quiz_scores CASCADE;

-- Create the new table with the correct schema
CREATE TABLE quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DECIMAL(5,2) NOT NULL,
  quiz_topic TEXT NOT NULL DEFAULT 'Ang Matanda at ang Dagat',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES (for faster queries)
-- ============================================

CREATE INDEX idx_quiz_scores_student_name ON quiz_scores(student_name);
CREATE INDEX idx_quiz_scores_created_at ON quiz_scores(created_at DESC);
CREATE INDEX idx_quiz_scores_percentage ON quiz_scores(percentage DESC);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY (RLS)
-- ============================================

ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (students can submit their scores)
CREATE POLICY "Allow public insert"
  ON quiz_scores FOR INSERT
  TO public WITH CHECK (true);

-- Policy: Anyone can view (students and teachers can see all scores)
CREATE POLICY "Allow public read"
  ON quiz_scores FOR SELECT
  TO public USING (true);

-- Policy: Only authenticated users (teachers) can update scores
CREATE POLICY "Allow authenticated update"
  ON quiz_scores FOR UPDATE
  TO authenticated USING (true);

-- Policy: Only authenticated users (teachers) can delete scores
CREATE POLICY "Allow authenticated delete"
  ON quiz_scores FOR DELETE
  TO authenticated USING (true);

-- ============================================
-- 4. CREATE HELPFUL VIEWS
-- ============================================

-- View: Overall Statistics (for dashboard)
CREATE OR REPLACE VIEW quiz_statistics AS
SELECT
  COUNT(*) as total_students,
  ROUND(AVG(score), 2) as average_score,
  ROUND(AVG(percentage), 2) as average_percentage,
  COUNT(CASE WHEN percentage = 100 THEN 1 END) as perfect_scores,
  MAX(created_at) as latest_submission
FROM quiz_scores;

-- View: Student Performance (individual student stats)
CREATE OR REPLACE VIEW student_performance AS
SELECT
  student_name,
  COUNT(*) as total_attempts,
  ROUND(AVG(score), 2) as avg_score,
  MAX(score) as best_score,
  ROUND(AVG(percentage), 2) as avg_percentage,
  MAX(percentage) as best_percentage,
  MAX(created_at) as last_attempt
FROM quiz_scores
GROUP BY student_name
ORDER BY best_percentage DESC, avg_percentage DESC;

-- ============================================
-- 5. ENABLE REALTIME (for live dashboard updates)
-- ============================================

-- Enable realtime for the quiz_scores table
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_scores;

-- ============================================
-- 6. INSERT SAMPLE DATA (optional - for testing)
-- ============================================

-- Uncomment the lines below to add sample data for testing
-- INSERT INTO quiz_scores (student_name, score, total_questions, percentage, quiz_topic) VALUES
-- ('Juan Dela Cruz', 5, 5, 100.00, 'Ang Matanda at ang Dagat'),
-- ('Maria Santos', 4, 5, 80.00, 'Ang Matanda at ang Dagat'),
-- ('Pedro Garcia', 3, 5, 60.00, 'Ang Matanda at ang Dagat');

-- ============================================
-- 7. VERIFY SETUP
-- ============================================

-- Check if table was created successfully
SELECT 'quiz_scores table created!' as status;

-- Check columns
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'quiz_scores'
ORDER BY ordinal_position;

-- ============================================
-- ✅ SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Create a .env file in your project root
-- 2. Add your Supabase credentials:
--    VITE_SUPABASE_URL=your-project-url
--    VITE_SUPABASE_ANON_KEY=your-anon-key
-- 3. Run: npm run dev
-- ============================================
