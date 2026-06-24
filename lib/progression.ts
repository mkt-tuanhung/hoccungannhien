import { supabase } from "@/lib/supabase";

export interface LevelProgress {
  score: number;
  total: number;
  isCompleted: boolean;
  stars?: number;
}

export interface SubjectProgress {
  [levelId: string]: LevelProgress;
}

export interface UserProgress {
  [subjectId: string]: SubjectProgress;
}

const STORAGE_KEY = "an_nhien_progress_v1";

// --- localStorage helpers (offline fallback) ---

const getLocalProgress = (): UserProgress => {
  if (typeof window === "undefined") return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
};

const saveLocalProgress = (progress: UserProgress) => {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};

// --- Public API ---

export const getUserProgress = (): UserProgress => getLocalProgress();

export const getSubjectProgress = (subjectId: string): SubjectProgress => {
  return getLocalProgress()[subjectId] || {};
};

export const isLevelUnlocked = (
  subjectId: string,
  levelIndex: number,
  allLevelIds: string[]
): boolean => {
  if (levelIndex === 0) return true;
  const subjectProgress = getSubjectProgress(subjectId);
  const previousLevelId = allLevelIds[levelIndex - 1];
  return !!subjectProgress[previousLevelId]?.isCompleted;
};

const computeStars = (score: number, total: number): number => {
  const ratio = total > 0 ? score / total : 0;
  if (ratio >= 0.9) return 3;
  if (ratio >= 0.7) return 2;
  if (ratio >= 0.5) return 1;
  return 0;
};

export const saveLevelProgress = (
  subjectId: string,
  levelId: string,
  score: number,
  total: number
) => {
  if (typeof window === "undefined") return;

  const stars = computeStars(score, total);

  // Always save to localStorage first (instant, works offline)
  const progress = getLocalProgress();
  if (!progress[subjectId]) progress[subjectId] = {};
  progress[subjectId][levelId] = { score, total, isCompleted: true, stars };
  saveLocalProgress(progress);

  // Then try to sync to Supabase in the background
  syncToSupabase(subjectId, levelId, score, total, stars);
};

// --- Supabase sync ---

const syncToSupabase = async (
  subject: string,
  levelId: string,
  score: number,
  total: number,
  stars: number
) => {
  try {
    const childId = localStorage.getItem("an_nhien_active_child_id");
    if (!childId) return;

    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;

    // Upsert level progress
    await supabase.from("level_progress").upsert(
      {
        child_id: childId,
        subject,
        level_id: levelId,
        score,
        total,
        is_completed: true,
        stars,
        played_at: new Date().toISOString(),
      },
      { onConflict: "child_id,subject,level_id" }
    );

    // Update streak
    const today = new Date().toISOString().split("T")[0];
    const { data: child } = await supabase
      .from("child_profiles")
      .select("last_played_date, streak_days, total_stars")
      .eq("id", childId)
      .single();

    if (child) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];
      let newStreak = child.streak_days || 0;

      if (child.last_played_date === yesterday) {
        newStreak += 1;
      } else if (child.last_played_date !== today) {
        newStreak = 1;
      }

      await supabase
        .from("child_profiles")
        .update({
          last_played_date: today,
          streak_days: newStreak,
          total_stars: (child.total_stars || 0) + stars,
        })
        .eq("id", childId);
    }
  } catch (err) {
    console.warn("Supabase sync failed (offline mode):", err);
  }
};

// Load progress from Supabase into localStorage (call on app init when logged in)
export const pullProgressFromSupabase = async (childId: string) => {
  try {
    const { data } = await supabase
      .from("level_progress")
      .select("*")
      .eq("child_id", childId);

    if (!data || data.length === 0) return;

    const progress = getLocalProgress();

    for (const row of data) {
      if (!progress[row.subject]) progress[row.subject] = {};
      const existing = progress[row.subject][row.level_id];

      // Keep the higher score
      if (!existing || row.score > existing.score) {
        progress[row.subject][row.level_id] = {
          score: row.score,
          total: row.total,
          isCompleted: row.is_completed,
          stars: row.stars,
        };
      }
    }

    saveLocalProgress(progress);
  } catch (err) {
    console.warn("Failed to pull progress from Supabase:", err);
  }
};
