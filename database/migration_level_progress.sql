-- Level progress tracking (synced from client)
CREATE TABLE IF NOT EXISTS level_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  level_id TEXT NOT NULL,
  score INT NOT NULL DEFAULT 0,
  total INT NOT NULL DEFAULT 0,
  is_completed BOOLEAN DEFAULT FALSE,
  stars INT DEFAULT 0,
  played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(child_id, subject, level_id)
);

ALTER TABLE level_progress ENABLE ROW LEVEL SECURITY;

-- Parents can view their children's progress
CREATE POLICY "Parents can view child level progress" ON level_progress
  FOR SELECT USING (
    child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid())
  );

-- Parents can insert/update their children's progress
CREATE POLICY "Parents can upsert child level progress" ON level_progress
  FOR INSERT WITH CHECK (
    child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid())
  );

CREATE POLICY "Parents can update child level progress" ON level_progress
  FOR UPDATE USING (
    child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid())
  );

-- Add coins and streak to child_profiles if not exists
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS total_stars INT DEFAULT 0;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS streak_days INT DEFAULT 0;
ALTER TABLE child_profiles ADD COLUMN IF NOT EXISTS last_played_date DATE;
