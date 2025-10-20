-- ============================================
-- COMPLETE MIGRATION SCRIPT
-- Filipino Quiz Database - Old Schema to New Schema
-- ============================================

-- Step 1: Backup existing data (if table exists)
DO $$ 
BEGIN
  IF EXISTS (SELECT FROM information_schema.tables WHERE table_name = 'quiz_scores') THEN
    -- Create backup table with timestamp
    EXECUTE format('CREATE TABLE quiz_scores_backup_%s AS SELECT * FROM quiz_scores', 
                   to_char(NOW(), 'YYYYMMDD_HH24MISS'));
    RAISE NOTICE '✅ Backup created: quiz_scores_backup_%', to_char(NOW(), 'YYYYMMDD_HH24MISS');
  ELSE
    RAISE NOTICE 'ℹ️ No existing quiz_scores table found. Creating fresh schema...';
  END IF;
END $$;

-- Step 2: Drop old table and all dependencies
DROP TABLE IF EXISTS quiz_scores CASCADE;
DROP VIEW IF EXISTS student_detailed_stats CASCADE;
DROP VIEW IF EXISTS daily_quiz_stats CASCADE;

-- Step 3: Create new table with updated schema
CREATE TABLE quiz_scores (
  id BIGSERIAL PRIMARY KEY,
  student_name TEXT NOT NULL,
  
  -- Part 1 (Pagbabalik-aral) - 5 questions
  part1_score INTEGER CHECK (part1_score >= 0 AND part1_score <= 5),
  part1_total INTEGER DEFAULT 5,
  part1_percentage NUMERIC(5,2),
  
  -- Part 2 (Pangunahing Quiz) - 5 questions
  part2_score INTEGER CHECK (part2_score >= 0 AND part2_score <= 5),
  part2_total INTEGER DEFAULT 5,
  part2_percentage NUMERIC(5,2),
  
  -- Combined totals (auto-calculated)
  total_score INTEGER GENERATED ALWAYS AS (COALESCE(part1_score, 0) + COALESCE(part2_score, 0)) STORED,
  total_questions INTEGER DEFAULT 10,
  overall_percentage NUMERIC(5,2) GENERATED ALWAYS AS (
    CASE 
      WHEN COALESCE(part1_score, 0) + COALESCE(part2_score, 0) > 0 
      THEN ROUND(((COALESCE(part1_score, 0) + COALESCE(part2_score, 0))::NUMERIC / 10) * 100, 2)
      ELSE 0
    END
  ) STORED,
  
  quiz_topic TEXT NOT NULL DEFAULT 'Ang Matanda at ang Dagat',
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Step 4: Migrate old data if backup exists
DO $$ 
DECLARE
  backup_table TEXT;
  rec RECORD;
  migrated_count INTEGER := 0;
BEGIN
  -- Find the most recent backup table
  SELECT table_name INTO backup_table
  FROM information_schema.tables 
  WHERE table_name LIKE 'quiz_scores_backup_%'
  ORDER BY table_name DESC
  LIMIT 1;

  IF backup_table IS NOT NULL THEN
    RAISE NOTICE 'ℹ️ Migrating data from: %', backup_table;
    
    -- Migrate data with smart splitting
    FOR rec IN EXECUTE format('SELECT * FROM %I', backup_table)
    LOOP
      -- Try to intelligently split scores between Part 1 and Part 2
      -- Assume equal distribution if not specified
      INSERT INTO quiz_scores (
        student_name,
        part1_score,
        part1_total,
        part1_percentage,
        part2_score,
        part2_total,
        part2_percentage,
        quiz_topic,
        completed_at,
        created_at
      ) VALUES (
        rec.student_name,
        LEAST(COALESCE(rec.score, 0), 5), -- Cap Part 1 at 5
        5,
        CASE 
          WHEN COALESCE(rec.score, 0) <= 5 
          THEN (COALESCE(rec.score, 0)::NUMERIC / 5) * 100
          ELSE 100
        END,
        GREATEST(COALESCE(rec.score, 0) - 5, 0), -- Remainder goes to Part 2
        5,
        CASE 
          WHEN COALESCE(rec.score, 0) > 5 
          THEN ((COALESCE(rec.score, 0) - 5)::NUMERIC / 5) * 100
          ELSE 0
        END,
        COALESCE(rec.quiz_topic, 'Ang Matanda at ang Dagat'),
        rec.created_at, -- Use created_at as completed_at for old records
        rec.created_at
      );
      
      migrated_count := migrated_count + 1;
    END LOOP;
    
    RAISE NOTICE '✅ Migrated % records from backup', migrated_count;
  ELSE
    RAISE NOTICE 'ℹ️ No backup data to migrate';
  END IF;
END $$;

-- Step 5: Create indexes
CREATE INDEX idx_quiz_scores_student_name ON quiz_scores(student_name);
CREATE INDEX idx_quiz_scores_created_at ON quiz_scores(created_at DESC);
CREATE INDEX idx_quiz_scores_overall_percentage ON quiz_scores(overall_percentage DESC);
CREATE INDEX idx_quiz_scores_completed_at ON quiz_scores(completed_at DESC NULLS LAST);

-- Step 6: Enable Row Level Security
ALTER TABLE quiz_scores ENABLE ROW LEVEL SECURITY;

-- Drop old policies if they exist
DROP POLICY IF EXISTS "Allow public insert" ON quiz_scores;
DROP POLICY IF EXISTS "Allow public read" ON quiz_scores;
DROP POLICY IF EXISTS "Allow authenticated update" ON quiz_scores;

-- Create new policies
CREATE POLICY "Allow public insert"
  ON quiz_scores FOR INSERT
  TO public WITH CHECK (true);

CREATE POLICY "Allow public read"
  ON quiz_scores FOR SELECT
  TO public USING (true);

CREATE POLICY "Allow authenticated update"
  ON quiz_scores FOR UPDATE
  TO authenticated USING (true);

-- Step 7: Create helpful views
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
  
  MAX(completed_at) as last_completion_date,
  MIN(created_at) as first_attempt_date
FROM quiz_scores
WHERE completed_at IS NOT NULL
GROUP BY student_name
ORDER BY best_overall_percentage DESC;

CREATE OR REPLACE VIEW daily_quiz_stats AS
SELECT 
  DATE(completed_at) as quiz_date,
  COUNT(*) as total_completions,
  ROUND(AVG(overall_percentage), 2) as avg_percentage,
  COUNT(CASE WHEN overall_percentage = 100 THEN 1 END) as perfect_scores,
  COUNT(CASE WHEN part1_percentage = 100 THEN 1 END) as perfect_part1,
  COUNT(CASE WHEN part2_percentage = 100 THEN 1 END) as perfect_part2,
  COUNT(DISTINCT student_name) as unique_students
FROM quiz_scores
WHERE completed_at IS NOT NULL
GROUP BY DATE(completed_at)
ORDER BY quiz_date DESC;

-- Step 8: Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE quiz_scores;

-- Step 9: Create a function to clean up old backup tables (optional)
CREATE OR REPLACE FUNCTION cleanup_old_backups(keep_days INTEGER DEFAULT 30)
RETURNS TABLE(dropped_table TEXT) AS $$
DECLARE
  backup_table TEXT;
BEGIN
  FOR backup_table IN 
    SELECT table_name 
    FROM information_schema.tables 
    WHERE table_name LIKE 'quiz_scores_backup_%'
    AND table_name < format('quiz_scores_backup_%s', 
                           to_char(NOW() - make_interval(days => keep_days), 'YYYYMMDD_HH24MISS'))
  LOOP
    EXECUTE format('DROP TABLE IF EXISTS %I', backup_table);
    dropped_table := backup_table;
    RETURN NEXT;
  END LOOP;
END;
$$ LANGUAGE plpgsql;

-- Step 10: Summary
DO $$ 
DECLARE
  total_records INTEGER;
BEGIN
  SELECT COUNT(*) INTO total_records FROM quiz_scores;
  
  RAISE NOTICE '';
  RAISE NOTICE '================================================';
  RAISE NOTICE '✅ MIGRATION COMPLETED SUCCESSFULLY!';
  RAISE NOTICE '================================================';
  RAISE NOTICE '📊 Total records in new table: %', total_records;
  RAISE NOTICE '🔒 RLS Policies: Enabled';
  RAISE NOTICE '⚡ Realtime: Enabled';
  RAISE NOTICE '📈 Views: student_detailed_stats, daily_quiz_stats';
  RAISE NOTICE '🗂️ Indexes: Created';
  RAISE NOTICE '';
  RAISE NOTICE '📝 Note: Backup tables are kept for safety.';
  RAISE NOTICE '   To clean up old backups: SELECT * FROM cleanup_old_backups(30);';
  RAISE NOTICE '================================================';
END $$;