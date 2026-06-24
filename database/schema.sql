-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 19.1. users
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'parent',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19.2. child_profiles
CREATE TABLE child_profiles (
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19.3. child_subject_levels
CREATE TABLE child_subject_levels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  subject TEXT NOT NULL,
  level INT DEFAULT 1,
  mastery_score INT DEFAULT 0,
  last_assessed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19.4. skills
CREATE TABLE skills (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  grade TEXT,
  code TEXT UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  prerequisite_skill_ids JSONB DEFAULT '[]',
  difficulty INT DEFAULT 1
);

-- 19.5. child_skill_mastery
CREATE TABLE child_skill_mastery (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id) ON DELETE CASCADE,
  mastery_score INT DEFAULT 0,
  attempts_count INT DEFAULT 0,
  correct_count INT DEFAULT 0,
  wrong_count INT DEFAULT 0,
  hint_count INT DEFAULT 0,
  last_practiced_at TIMESTAMP WITH TIME ZONE,
  next_review_at TIMESTAMP WITH TIME ZONE
);

-- 19.6. lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject TEXT NOT NULL,
  skill_id UUID REFERENCES skills(id),
  title TEXT NOT NULL,
  description TEXT,
  level INT DEFAULT 1,
  content JSONB DEFAULT '{}',
  estimated_minutes INT DEFAULT 5,
  is_active BOOLEAN DEFAULT TRUE
);

-- 19.7. questions
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lesson_id UUID REFERENCES lessons(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES skills(id),
  type TEXT NOT NULL,
  prompt TEXT NOT NULL,
  options JSONB DEFAULT '[]',
  correct_answer JSONB NOT NULL,
  explanation TEXT,
  hint_1 TEXT,
  hint_2 TEXT,
  hint_3 TEXT,
  difficulty INT DEFAULT 1,
  media JSONB DEFAULT '{}'
);

-- 19.8. study_sessions
CREATE TABLE study_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  subject TEXT,
  started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  ended_at TIMESTAMP WITH TIME ZONE,
  duration_seconds INT DEFAULT 0,
  active_seconds INT DEFAULT 0,
  completed BOOLEAN DEFAULT FALSE,
  xp_earned INT DEFAULT 0,
  stars_earned INT DEFAULT 0
);

-- 19.9. question_attempts
CREATE TABLE question_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES study_sessions(id) ON DELETE CASCADE,
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  question_id UUID REFERENCES questions(id),
  selected_answer JSONB,
  is_correct BOOLEAN,
  response_time_ms INT,
  hints_used INT DEFAULT 0,
  mistake_type TEXT,
  ai_feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19.10. rewards
CREATE TABLE rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  image_url TEXT,
  animation_url TEXT,
  cost_coins INT DEFAULT 0,
  unlock_condition JSONB DEFAULT '{}'
);

-- 19.11. child_rewards
CREATE TABLE child_rewards (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  reward_id UUID REFERENCES rewards(id) ON DELETE CASCADE,
  unlocked_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  equipped BOOLEAN DEFAULT FALSE
);

-- 19.12. daily_plans
CREATE TABLE daily_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  plan_date DATE DEFAULT CURRENT_DATE,
  tasks JSONB DEFAULT '[]',
  completed_tasks JSONB DEFAULT '[]',
  ai_note TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19.13. parent_assignments
CREATE TABLE parent_assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_uid UUID REFERENCES users(id) ON DELETE CASCADE,
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  task_type TEXT,
  due_date DATE,
  reward_xp INT DEFAULT 0,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 19.14. ai_tutor_memory
CREATE TABLE ai_tutor_memory (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  child_id UUID REFERENCES child_profiles(id) ON DELETE CASCADE,
  memory_type TEXT,
  content JSONB DEFAULT '{}',
  importance INT DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_subject_levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_skill_mastery ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE child_rewards ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_tutor_memory ENABLE ROW LEVEL SECURITY;

-- Parent can only see their own user record
CREATE POLICY "Users can view own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Parent can only see and edit their own child's profiles
CREATE POLICY "Parents can manage own child profiles" ON child_profiles 
  FOR ALL USING (auth.uid() = parent_uid);

-- Child Subject Levels
CREATE POLICY "Parents can view child subject levels" ON child_subject_levels 
  FOR SELECT USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));

-- Child Skill Mastery
CREATE POLICY "Parents can view child skill mastery" ON child_skill_mastery 
  FOR SELECT USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));

-- Study Sessions
CREATE POLICY "Parents can view child study sessions" ON study_sessions 
  FOR SELECT USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));

-- Question Attempts
CREATE POLICY "Parents can view child question attempts" ON question_attempts 
  FOR SELECT USING (child_id IN (SELECT id FROM child_profiles WHERE parent_uid = auth.uid()));

-- Parent Assignments
CREATE POLICY "Parents can manage own assignments" ON parent_assignments 
  FOR ALL USING (parent_uid = auth.uid());
