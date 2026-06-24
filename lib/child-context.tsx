"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import { useAuth } from "@/lib/auth";

export interface ChildProfile {
  id: string;
  parent_uid: string;
  name: string;
  nickname: string | null;
  avatar_url: string | null;
  daily_goal_minutes: number;
  total_stars: number;
  streak_days: number;
  last_played_date: string | null;
  created_at: string;
}

interface ChildContextType {
  activeChild: ChildProfile | null;
  children: ChildProfile[];
  loading: boolean;
  setActiveChildId: (id: string) => void;
  refreshChildren: () => Promise<void>;
}

const ACTIVE_CHILD_KEY = "an_nhien_active_child_id";

const ChildContext = createContext<ChildContextType>({
  activeChild: null,
  children: [],
  loading: true,
  setActiveChildId: () => {},
  refreshChildren: async () => {},
});

export function ChildProvider({ children: reactChildren }: { children: ReactNode }) {
  const { user } = useAuth();
  const [childProfiles, setChildProfiles] = useState<ChildProfile[]>([]);
  const [activeChild, setActiveChild] = useState<ChildProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchChildren = async () => {
    if (!user) {
      setChildProfiles([]);
      setActiveChild(null);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("child_profiles")
      .select("*")
      .eq("parent_uid", user.id);

    const profiles = (data || []) as ChildProfile[];
    setChildProfiles(profiles);

    const savedId = localStorage.getItem(ACTIVE_CHILD_KEY);
    const saved = profiles.find((c) => c.id === savedId);
    setActiveChild(saved || profiles[0] || null);
    setLoading(false);
  };

  useEffect(() => {
    fetchChildren();
  }, [user]);

  const setActiveChildId = (id: string) => {
    localStorage.setItem(ACTIVE_CHILD_KEY, id);
    const found = childProfiles.find((c) => c.id === id);
    if (found) setActiveChild(found);
  };

  return (
    <ChildContext.Provider
      value={{
        activeChild,
        children: childProfiles,
        loading,
        setActiveChildId,
        refreshChildren: fetchChildren,
      }}
    >
      {reactChildren}
    </ChildContext.Provider>
  );
}

export const useChild = () => useContext(ChildContext);
