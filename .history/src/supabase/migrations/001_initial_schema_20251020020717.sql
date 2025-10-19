-- Updated Filipino Quiz Database Schema
-- This replaces the old schema to support separate Part 1 and Part 2 scores

-- ============================================
-- 1. DROP OLD TABLE AND CREATE NEW ONE
-- ============================================

DROP TABLE IF EXISTS quiz_scores CASCADE;

CREATE TABLE quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  
  -- Part 1 (Pagbabalik-aral) - 5 questions
  part1_score INTEGER CHECK (part1_score >= 0 AND part1_score <= 5),
  part1_total INTEGER DEFAULT 5,
  part1_percentage DECIMAL(5,2),
  
  -- Part 2 (Pangunahing Quiz) - 5 questions
  part2_score INTEGER CHECK (part2_score >= 0 AND part2_score <= 5),
  part2_total INTEGER DEFAULT 5,
  part2_percentage DECIMAL(5,2),
  
  -- Combined totals
  total_score INTEGER GENERATED ALWAYS AS (COALESCE(part1_score, 0) + COALESCE(part2_score, 0)) STORED,
  total_questions INTEGER DEFAULT 10,
  overall_percentage DECIMAL(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN COALESCE(part1_score, 0) + COALESCE(part2_score, 0) > 0 
      THEN ROUND(((COALESCE(part1_score, 0) + COALESCE(part2_score, 0))::DECIMAL / 10) * 100, 2)
      ELSE 0
    END
  ) STORED,
  
  quiz_topic TEXT NOT NULL DEFAULT 'Ang Matanda at ang Dagat',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- 2. CREATE INDEXES
-- ============================================

CREATE INDEX idx_quiz_scores_student_name ON quiz_scores(student_name);
CREATE INDEX idx_quiz_scores_created_at ON quiz_scores(created_at DESC);
CREATE INDEX idx_quiz_scores_overall_percentage ON quiz_scores(overall_percentage DESC);

-- ============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- ============================================

ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- Policy: Anyone can insert (students)
CREATE POLICY "Allow public insert"
  ON quiz_scores FOR INSERT
  TO public WITH CHECK (true);

-- Policy: Anyone can view (for transparency)
CREATE POLICY "Allow public read"
  ON quiz_scores FOR SELECT
  TO public USING (true);

-- Policy: Authenticated users (teachers) can update
CREATE POLICY "Allow authenticated update"
  ON quiz_scores FOR UPDATE
  TO authenticated USING (true);

-- ============================================
-- 4. CREATE HELPFUL VIEWS
-- ============================================

-- View: Detailed Student Statistics
CREATE OR REPLACE VIEW student_detailed_stats AS
SELECT 
  student_name,
  COUNT(*) as total_attempts,
  
  -- Part 1 stats
  ROUND(AVG(part1_percentage), 2) as avg_part1_percentage,
  MAX(part1_percentage) as best_part1_percentage,
  
  -- Part 2 stats
  ROUND(AVG(part2_percentage), 2) as avg_part2_percentage,
  MAX(part2_percentage) as best_part2_percentage,
  
  -- Overall stats
  ROUND(AVG(overall_percentage), 2) as avg_overall_percentage,
  MAX(overall_percentage) as best_overall_percentage,
  
  MAX(completed_at) as last_completion_date
FROM quiz_scores
WHERE completed_at IS NOT NULL
GROUP BY student_name
ORDER BY best_overall_percentage DESC;

-- View: Daily Statistics
CREATE OR REPLACE VIEW daily_quiz_stats AS
SELECT 
  DATE(completed_at) as quiz_date,
  COUNT(*) as total_completions,
  ROUND(AVG(overall_percentage), 2) as avg_percentage,
  COUNT(CASE WHEN overall_percentage = 100 THEN 1 END) as perfect_scores,
  COUNT(CASE WHEN part1_percentage = 100 THEN 1 END) as perfect_part1,
  COUNT(CASE WHEN part2_percentage = 100 THEN 1 END) as perfect_part2
FROM quiz_scores
WHERE completed_at IS NOT NULL
GROUP BY DATE(completed_at)
ORDER BY quiz_date DESC;

-- ============================================
-- 5. ENABLE REALTIME
-- ============================================

ALTER PUBLICATION supabase_realtime ADD TABLE quiz_scores;

-- ============================================
-- 6. SUCCESS MESSAGE
-- ============================================

DO $$ 
BEGIN 
  RAISE NOTICE '✅ Updated database schema created!';
  RAISE NOTICE '📊 Table: quiz_scores (with Part 1 & Part 2 tracking)';
  RAISE NOTICE '🔒 RLS Policies: Enabled';
  RAISE NOTICE '⚡ Realtime: Enabled';
  RAISE NOTICE '📈 Views: student_detailed_stats, daily_quiz_stats';
END $$;