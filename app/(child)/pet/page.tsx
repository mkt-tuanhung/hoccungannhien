"use client";

import { useState, useEffect } from "react";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function PetRoom() {
  const [stars, setStars] = useState(0);
  const [isEating, setIsEating] = useState(false);
  const [childId, setChildId] = useState<string | null>(null);
  const [petAudioUrl, setPetAudioUrl] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    
    // Tải trước âm thanh vào Cache
    const text = "Mèo Bông thích quá! Cảm ơn bạn!";
    fetch(`/api/speech?text=${encodeURIComponent(text)}`)
      .then(res => res.blob())
      .then(blob => setPetAudioUrl(URL.createObjectURL(blob)))
      .catch(() => {});
  }, []);

  const fetchData = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profiles } = await supabase.from('child_profiles').select('id').eq('parent_uid', user.id).limit(1);
      if (profiles && profiles.length > 0) {
        const cId = profiles[0].id;
        setChildId(cId);
        
        // Calculate total stars
        const { data: sessions } = await supabase.from('study_sessions').select('stars_earned').eq('child_id', cId);
        if (sessions) {
          const totalStars = sessions.reduce((acc, curr) => acc + (curr.stars_earned || 0), 0);
          // Don't let stars go below 0 visually, though it shouldn't happen with our checks
          setStars(Math.max(0, totalStars));
        }
      }
    }
  };

  const feedPet = async () => {
    if (stars >= 10) {
      setStars(prev => prev - 10);
      setIsEating(true);
      try {
        if (petAudioUrl) {
          const audio = new Audio(petAudioUrl);
          await audio.play();
        } else {
          const text = "Mèo Bông thích quá! Cảm ơn bạn!";
          const url = `/api/speech?text=${encodeURIComponent(text)}`;
          const audio = new Audio(url);
          await audio.play();
        }
      } catch (error) {
        if ('speechSynthesis' in window) {
          const u = new SpeechSynthesisUtterance("Mèo Bông thích quá! Cảm ơn bạn!");
          u.lang = "vi-VN";
          u.pitch = 1.5;
          window.speechSynthesis.speak(u);
        }
      }
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.6 }
      });

      if (childId) {
        // Record the transaction (Negative stars)
        await supabase.from('study_sessions').insert({
          child_id: childId,
          subject: 'pet_room',
          score: 0,
          xp_earned: 0,
          stars_earned: -10
        });
      }

      setTimeout(() => {
        setIsEating(false);
        fetchData(); // Refresh stars
      }, 2000);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF5F8] p-4 md:p-8 font-sans">
      <header className="max-w-2xl mx-auto flex items-center justify-between mb-8">
        <Link href="/home">
          <Button variant="ghost" className="text-primary hover:bg-primary/10 rounded-full">
            ⬅️ Về trang chủ
          </Button>
        </Link>
        <div className="bg-yellow-100 text-yellow-700 px-6 py-2 rounded-full font-black text-lg border-2 border-yellow-200">
          ⭐ {stars} Sao
        </div>
      </header>

      <main className="max-w-2xl mx-auto text-center space-y-12">
        <div>
          <h1 className="text-4xl font-extrabold text-primary mb-2">Phòng của Mèo Bông</h1>
          <p className="text-lg text-muted-foreground">Hãy dùng sao để chăm sóc Mèo Bông nhé!</p>
        </div>

        <motion.div 
          className="relative w-64 h-64 mx-auto bg-white rounded-full border-8 border-primary/20 overflow-hidden shadow-2xl"
          animate={isEating ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0] } : { y: [0, -10, 0] }}
          transition={isEating ? { duration: 0.5, repeat: 3 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <img src="/kitten.png" alt="Mèo Bông" className="w-full h-full object-cover" />
          
          {isEating && (
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, y: -50 }}
              exit={{ opacity: 0 }}
            >
              🐟
            </motion.div>
          )}
        </motion.div>

        <div className="bg-white p-8 rounded-3xl border-4 border-primary/10 shadow-sm max-w-sm mx-auto space-y-6">
          <Button 
            size="lg" 
            className="w-full text-xl py-8 rounded-2xl bg-orange-500 hover:bg-orange-600 font-bold flex gap-2"
            onClick={feedPet}
            disabled={stars < 10 || isEating}
          >
            🐟 Cho ăn (10 ⭐)
          </Button>
          
          <Button 
            size="lg" 
            variant="outline"
            className="w-full text-xl py-8 rounded-2xl font-bold flex gap-2 border-primary text-primary hover:bg-primary/5"
            disabled={true}
          >
            👗 Mua đồ (Sắp ra mắt)
          </Button>
        </div>
      </main>
    </div>
  );
}
