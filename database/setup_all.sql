-- ============================================================
-- HOC CUNG AN NHIEN — Full Database Setup
-- Chạy toàn bộ file này 1 lần trong Supabase SQL Editor
-- ============================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- users
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- child_profiles
CREATE TABLE IF NOT EXISTS child_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_uid UUID REFERENCES users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  nickname TEXT,
  birth_date DATE,
  age INT,
  grade TEXT,
  avatar_url TEXT,
  interests JSONB DEFAULT '[]',
  personality JSONB DEFAULT '{}',
  daily_goal_minutes INT DEFAULT 20,
  preferred_study_time TEXT,
  total_stars INT DEFAULT 0,
  streak_days INT DEFAULT 0,
  last_played_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- level_progress (tiến trình từng level, sync từ localStorage)
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

-- child_subject_levels
CREATE TABLE IF NOT EXISTS child_subject_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  level INT DEFAULT 1,
  mastery_score INT DEFAULT 0,
  last_assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- study_sessions
CREATE TABLE IF NOT EXISTS study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  subject TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  stars_earned INT DEFAULT 0
);

-- parent_assignments
CREATE TABLE IF NOT EXISTS parent_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_uid UUID REFERENCES users(id) ON DELETE CASCADE,
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  task_type TEXT,
  due_date DATE,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE level_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_subject_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_assignments ENABLE ROW LEVEL SECURITY;

-- users policies
CREATE POLICY "Users can view own data"   ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can insert own data" ON users FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- child_profiles policies
CREATE POLICY "Parents manage own children" ON child_profiles
  FOR ALL USING (auth.uid() = parent_uid);

-- level_progress policies
CREATE POLICY "Parents view child progress" ON level_progress
  FOR SELECT USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));
CREATE POLICY "Parents insert child progress" ON level_progress
  FOR INSERT WITH CHECK (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));
CREATE POLICY "Parents update child progress" ON level_progress
  FOR UPDATE USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));

-- study_sessions policies
CREATE POLICY "Parents view study sessions" ON study_sessions
  FOR SELECT USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));

-- parent_assignments policies
CREATE POLICY "Parents manage assignments" ON parent_assignments
  FOR ALL USING (parent_uid = auth.uid());

-- ============================================================
-- TRIGGER: Tự tạo user record khi đăng ký
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name')
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
