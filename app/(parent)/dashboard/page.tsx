"use client";

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState, useRef } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";
import { Volume2, VolumeX, Music } from "lucide-react";

interface ChildWithStats {
  id: string;
  name: string;
  avatar_url: string | null;
  daily_goal_minutes: number;
  total_stars: number;
  streak_days: number;
  levelsCompleted: number;
  totalScore: number;
  totalQuestions: number;
}

interface DayData {
  name: string;
  stars: number;
  levels: number;
}

export default function ParentDashboard() {
  const [children, setChildren] = useState<ChildWithStats[]>([]);
  const [weeklyData, setWeeklyData] = useState<DayData[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploadingAvatar, setUploadingAvatar] = useState<string | null>(null);
  const router = useRouter();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isError, setIsError] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      router.push("/login");
      return;
    }

    // Fetch child profiles
    const { data: profiles } = await supabase
      .from("child_profiles")
      .select("*")
      .eq("parent_uid", user.id);

    if (!profiles || profiles.length === 0) {
      setChildren([]);
      setLoading(false);
      return;
    }

    const childIds = profiles.map((p) => p.id);

    // Fetch level_progress for all children
    const { data: progress } = await supabase
      .from("level_progress")
      .select("*")
      .in("child_id", childIds);

    const allProgress = progress || [];

    // Build per-child stats
    const childStats: ChildWithStats[] = profiles.map((p) => {
      const childProgress = allProgress.filter((lp) => lp.child_id === p.id);
      const totalScore = childProgress.reduce((s, lp) => s + (lp.score || 0), 0);
      const totalQuestions = childProgress.reduce((s, lp) => s + (lp.total || 0), 0);
      return {
        id: p.id,
        name: p.name,
        avatar_url: p.avatar_url,
        daily_goal_minutes: p.daily_goal_minutes,
        total_stars: p.total_stars || 0,
        streak_days: p.streak_days || 0,
        levelsCompleted: childProgress.filter((lp) => lp.is_completed).length,
        totalScore,
        totalQuestions,
      };
    });

    setChildren(childStats);

    // Build weekly chart from level_progress played_at
    const dayNames = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];
    const now = new Date();
    const weekData: DayData[] = [];

    for (let i = 6; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split("T")[0];
      const dayProgress = allProgress.filter(
        (lp) => lp.played_at && lp.played_at.startsWith(dateStr)
      );
      weekData.push({
        name: dayNames[d.getDay()],
        stars: dayProgress.reduce((s, lp) => s + (lp.stars || 0), 0),
        levels: dayProgress.length,
      });
    }

    setWeeklyData(weekData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsError(true));
    }
  };

  const handleUploadAvatar = async (e: React.ChangeEvent<HTMLInputElement>, childId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingAvatar(childId);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (data.url) {
        await supabase.from("child_profiles").update({ avatar_url: data.url }).eq("id", childId);
        await fetchData();
      } else {
        alert("Lỗi tải ảnh: " + (data.error || "Unknown error"));
      }
    } catch {
      alert("Lỗi tải ảnh");
    } finally {
      setUploadingAvatar(null);
    }
  };

  // Aggregated stats across all children
  const totalLevels = children.reduce((s, c) => s + c.levelsCompleted, 0);
  const totalScore = children.reduce((s, c) => s + c.totalScore, 0);
  const totalQuestions = children.reduce((s, c) => s + c.totalQuestions, 0);
  const accuracy = totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;
  const totalStars = children.reduce((s, c) => s + c.total_stars, 0);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Đang tải dữ liệu...</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={toggleMusic}
          className={`p-4 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.12)] backdrop-blur-md border-2 transition-all duration-300 flex items-center justify-center
            ${isError ? 'bg-red-50 border-red-200 text-red-400' :
              isPlaying
              ? 'bg-white/80 border-pink-300 text-pink-500 hover:scale-110'
              : 'bg-gray-100/80 border-gray-300 text-gray-500 hover:bg-white'}`}
          title={isError ? "Chưa có file mp3" : (isPlaying ? "Tắt nhạc nền" : "Bật nhạc nền")}
        >
          {isPlaying && !isError ? (
            <div className="relative flex items-center justify-center">
              <Volume2 className="w-7 h-7" />
              <Music className="w-4 h-4 absolute -top-3 -right-3 text-pink-400 animate-bounce" />
            </div>
          ) : (
            <VolumeX className="w-7 h-7" />
          )}
        </button>
      </div>

      <div className="max-w-6xl mx-auto space-y-8">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Dashboard Phụ Huynh</h1>
            <p className="text-slate-500">Theo dõi và quản lý tiến độ học tập của bé</p>
          </div>
          <div className="flex gap-4">
            <Link href="/select-child">
              <Button className="rounded-full font-bold">🎒 Cho bé học</Button>
            </Link>
            <Link href="/setup-child">
              <Button variant="secondary" className="rounded-full">Cài đặt hồ sơ</Button>
            </Link>
            <Button variant="outline" className="rounded-full border-red-200 text-red-500 hover:bg-red-50" onClick={handleLogout}>Đăng xuất</Button>
          </div>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="rounded-3xl border-none shadow-sm bg-blue-50/50 flex items-center">
            <CardHeader className="flex-1">
              <CardTitle className="text-xl text-blue-900">Tổng sao đạt được</CardTitle>
              <CardDescription>Tất cả các bé</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-5xl font-black text-blue-600">{totalStars} <span className="text-2xl font-bold text-blue-400">⭐</span></p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm bg-green-50/50">
            <CardHeader>
              <CardTitle className="text-xl text-green-900">Level hoàn thành</CardTitle>
              <CardDescription>Tất cả các bé</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-5xl font-black text-green-600">{totalLevels} <span className="text-2xl font-bold text-green-400">bài</span></p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border-none shadow-sm bg-orange-50/50 flex items-center">
            <CardHeader className="flex-1">
              <CardTitle className="text-xl text-orange-900">Độ chính xác</CardTitle>
              <CardDescription>Trung bình các môn</CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-5xl font-black text-orange-600">{accuracy}<span className="text-2xl font-bold text-orange-400">%</span></p>
            </CardContent>
          </Card>
        </div>

        {/* Chart + Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-2 rounded-3xl shadow-sm border-slate-100">
            <CardHeader>
              <CardTitle>Biểu đồ học tập 7 ngày qua</CardTitle>
              <CardDescription>Số sao bé đạt được mỗi ngày</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              {weeklyData.some((d) => d.stars > 0) ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748B' }} />
                    <Tooltip
                      cursor={{ fill: '#F1F5F9' }}
                      contentStyle={{ borderRadius: '1rem', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="stars" fill="#FBBF24" radius={[8, 8, 0, 0]} name="Sao ⭐" />
                    <Bar dataKey="levels" fill="#3B82F6" radius={[8, 8, 0, 0]} name="Level" />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                  <span className="text-5xl mb-4">📊</span>
                  <p className="font-medium">Chưa có dữ liệu tuần này</p>
                  <p className="text-sm">Cho bé học để xem biểu đồ nhé!</p>
                </div>
              )}
            </CardContent>
          </Card>

          <div className="space-y-6">
            {/* Child profiles with real stats */}
            <Card className="rounded-3xl shadow-sm border-slate-100">
              <CardHeader>
                <CardTitle>Hồ sơ các bé</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-slate-600 leading-relaxed">
                {children.length > 0 ? (
                  children.map((child) => (
                    <div key={child.id} className="flex gap-4 border-b pb-4 last:border-0 items-start">
                      <div className="flex-shrink-0 flex flex-col items-center gap-2">
                        <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-primary/20 relative group cursor-pointer" onClick={() => document.getElementById(`avatar-upload-${child.id}`)?.click()}>
                          {child.avatar_url ? (
                            <img src={child.avatar_url} alt="Avatar" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-3xl">👧</span>
                          )}
                          <div className="absolute inset-0 bg-black/50 hidden group-hover:flex items-center justify-center text-white text-xs text-center p-1">
                            {uploadingAvatar === child.id ? "Đang tải..." : "Đổi ảnh"}
                          </div>
                          <input
                            id={`avatar-upload-${child.id}`}
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={(e) => handleUploadAvatar(e, child.id)}
                            disabled={uploadingAvatar === child.id}
                          />
                        </div>
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-slate-800">{child.name}</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                          <span className="text-xs bg-yellow-100 text-yellow-700 font-bold px-2 py-0.5 rounded-full">⭐ {child.total_stars}</span>
                          <span className="text-xs bg-orange-100 text-orange-700 font-bold px-2 py-0.5 rounded-full">🔥 {child.streak_days} ngày</span>
                          <span className="text-xs bg-green-100 text-green-700 font-bold px-2 py-0.5 rounded-full">✅ {child.levelsCompleted} bài</span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">Mục tiêu: {child.daily_goal_minutes} phút/ngày</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="mb-4">Bạn chưa tạo hồ sơ cho bé nào.</p>
                    <Link href="/setup-child">
                      <Button>Tạo hồ sơ ngay</Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="rounded-3xl shadow-sm border-slate-100">
              <CardHeader>
                <CardTitle>Giao bài tập</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start text-left font-normal h-auto py-3 px-4 rounded-xl">
                  📘 Tiếng Anh: Luyện tập 5 từ mới (15 XP)
                </Button>
                <Button variant="outline" className="w-full justify-start text-left font-normal h-auto py-3 px-4 rounded-xl border-orange-200 bg-orange-50 text-orange-800">
                  📖 Tiếng Việt: Luyện dấu Hỏi/Ngã (20 XP) ⭐
                </Button>
                <Button className="w-full rounded-xl mt-4">Tạo nhiệm vụ mới</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
