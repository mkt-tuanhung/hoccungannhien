export type Role = 'parent' | 'admin';

export interface User {
  id: string;
  email: string;
  full_name: string | null;
  role: Role;
  created_at: string;
  updated_at: string;
}

export interface ChildProfile {
  id: string;
  parent_uid: string;
  name: string;
  nickname: string | null;
  birth_date: string | null;
  age: number | null;
  grade: string | null;
  avatar_url: string | null;
  interests: string[];
  personality: any;
  daily_goal_minutes: number;
  preferred_study_time: string | null;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  subject: string;
  grade: string | null;
  code: string | null;
  name: string;
  description: string | null;
  prerequisite_skill_ids: string[];
  difficulty: number;
}

export interface ChildSkillMastery {
  id: string;
  child_id: string;
  skill_id: string;
  mastery_score: number;
  attempts_count: number;
  correct_count: number;
  wrong_count: number;
  hint_count: number;
  last_practiced_at: string | null;
  next_review_at: string | null;
}

export interface Lesson {
  id: string;
  subject: string;
  skill_id: string | null;
  title: string;
  description: string | null;
  level: number;
  content: any;
  estimated_minutes: number;
  is_active: boolean;
}

export interface Question {
  id: string;
  lesson_id: string;
  skill_id: string | null;
  type: string;
  prompt: string;
  options: any[];
  correct_answer: any;
  explanation: string | null;
  hint_1: string | null;
  hint_2: string | null;
  hint_3: string | null;
  difficulty: number;
  media: any;
}

export interface StudySession {
  id: string;
  child_id: string;
  subject: string | null;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number;
  active_seconds: number;
  completed: boolean;
  xp_earned: number;
  stars_earned: number;
}

export interface Reward {
  id: string;
  name: string;
  type: string;
  image_url: string | null;
  animation_url: string | null;
  cost_coins: number;
  unlock_condition: any;
}

export interface ParentAssignment {
  id: string;
  parent_uid: string;
  child_id: string;
  title: string;
  subject: string;
  task_type: string | null;
  due_date: string | null;
  reward_xp: number;
  status: string;
  created_at: string;
}
