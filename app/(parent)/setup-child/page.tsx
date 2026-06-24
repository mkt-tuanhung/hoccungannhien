"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/lib/supabase";

export default function SetupChild() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [grade, setGrade] = useState("");
  const [interests, setInterests] = useState("");
  const [goal, setGoal] = useState("15");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Lấy user hiện tại
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert("Vui lòng đăng nhập trước!");
      router.push("/login");
      return;
    }

    // Ensure user record exists in public.users (satisfies foreign key)
    await supabase.from('users').upsert({
      id: user.id,
      email: user.email,
      full_name: user.user_metadata?.full_name || '',
    }, { onConflict: 'id' });

    const interestsArray = interests.split(',').map(i => i.trim()).filter(i => i);

    const { error } = await supabase.from('child_profiles').insert({
      parent_uid: user.id,
      name: name,
      nickname: name,
      age: parseInt(age),
      grade: grade,
      interests: interestsArray,
      daily_goal_minutes: parseInt(goal)
    });

    setLoading(false);

    if (error) {
      alert("Có lỗi xảy ra: " + error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg shadow-xl border-slate-200">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-3xl font-bold text-slate-800">Tạo hồ sơ cho bé</CardTitle>
          <CardDescription className="text-lg">
            Hệ thống AI sẽ cá nhân hoá bài học theo thông tin này.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-base">Tên ở nhà của bé</Label>
              <Input id="name" placeholder="Ví dụ: Mimi, Nhím, Cà Chua..." required className="h-12 text-lg" value={name} onChange={e => setName(e.target.value)} />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="age" className="text-base">Tuổi</Label>
                <Input id="age" type="number" min="3" max="10" placeholder="Ví dụ: 6" required className="h-12 text-lg" value={age} onChange={e => setAge(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-base">Lớp</Label>
                <Select required value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="h-12 text-lg">
                    <SelectValue placeholder="Chọn lớp" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pre">Mẫu giáo lớn</SelectItem>
                    <SelectItem value="1">Lớp 1</SelectItem>
                    <SelectItem value="2">Lớp 2</SelectItem>
                    <SelectItem value="3">Lớp 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-base">Sở thích của bé (cách nhau bằng dấu phẩy)</Label>
              <Input placeholder="Ví dụ: Công chúa, khủng long..." required className="h-12 text-lg" value={interests} onChange={e => setInterests(e.target.value)} />
            </div>
            
            <div className="space-y-2">
              <Label className="text-base">Mục tiêu học tập mỗi ngày</Label>
              <Select value={goal} onValueChange={setGoal}>
                <SelectTrigger className="h-12 text-lg">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 phút (Khởi động nhẹ)</SelectItem>
                  <SelectItem value="15">15 phút (Khuyên dùng)</SelectItem>
                  <SelectItem value="20">20 phút (Tập trung cao)</SelectItem>
                  <SelectItem value="30">30 phút (Học sâu)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full h-14 text-lg font-bold" disabled={loading}>
              {loading ? "Đang thiết lập AI..." : "Hoàn tất tạo hồ sơ"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
