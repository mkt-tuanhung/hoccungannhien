"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX, Music, SkipForward } from "lucide-react";
import { usePathname } from "next/navigation";

const MAP_PLAYLIST = [
  "/bgm/bgm_1.mp3",
  "/bgm/bgm_2.mp3",
];

const LEVEL_PLAYLIST = [
  "/bgm/bgm_3.mp3",
  "/bgm/bgm_4.mp3"
];

export default function BackgroundMusic() {
  const pathname = usePathname();
  const isLevel = pathname?.includes("/level/");
  
  // Xác định danh sách nhạc và âm lượng dựa trên ngữ cảnh hiện tại
  const currentPlaylist = isLevel ? LEVEL_PLAYLIST : MAP_PLAYLIST;
  const targetVolume = isLevel ? 0.07 : 0.15; // Giảm 50% âm lượng khi vào màn chơi

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isError, setIsError] = useState(false);
  const [persistedMuted, setPersistedMuted] = useState<boolean>(false);
  // Load persisted mute state on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('bgMusicMuted');
      if (stored !== null) {
        const muted = stored === 'true';
        setPersistedMuted(muted);
        isManuallyMuted.current = muted;
        if (muted && audioRef.current) {
          audioRef.current.pause();
          setIsPlaying(false);
        }
      }
    } catch (e) {
      console.warn('Failed to read bgMusicMuted from localStorage', e);
    }
  }, []);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasUserInteracted = useRef(false);
  const isManuallyMuted = useRef(false);
  
  // Lưu trạng thái xem chúng ta đang phát playlist nào để biết khi nào cần đổi
  const playingPlaylistType = useRef<'map' | 'level'>(isLevel ? 'level' : 'map');

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.onended = null;
    }

    // Đảm bảo index không vượt quá độ dài playlist hiện tại
    const safeIndex = currentTrackIndex % currentPlaylist.length;

    audioRef.current = new Audio(currentPlaylist[safeIndex]);
    audioRef.current.volume = targetVolume;
    
    audioRef.current.onended = () => {
      setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.length);
    };

    audioRef.current.onerror = () => {
      console.log(`Không tìm thấy file: ${currentPlaylist[safeIndex]}`);
      setIsError(true);
    };

    if (isPlaying && !isManuallyMuted.current) {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Audio play blocked by browser, waiting for user interaction");
          setIsPlaying(false);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [currentTrackIndex, currentPlaylist, targetVolume]); // Re-run effect khi đổi bài hoặc đổi playlist/âm lượng

  // Effect để theo dõi sự thay đổi ngữ cảnh (Map -> Level)
  useEffect(() => {
    const currentType = isLevel ? 'level' : 'map';
    // Nếu ngữ cảnh thay đổi (chuyển từ Bản đồ vào Màn chơi hoặc ngược lại)
    if (playingPlaylistType.current !== currentType) {
      playingPlaylistType.current = currentType;
      // Trở về bài đầu tiên của playlist mới
      setCurrentTrackIndex(0); 
    }
  }, [isLevel]);

  // Tự động bật nhạc khi user click vào bất cứ đâu trên màn hình lần đầu tiên
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (hasUserInteracted.current || isManuallyMuted.current || isError || !audioRef.current) return;
      
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          hasUserInteracted.current = true;
          setIsPlaying(true);
        }).catch(e => console.log("Still blocked"));
      }

      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };

    window.addEventListener("click", handleFirstInteraction);
    window.addEventListener("touchstart", handleFirstInteraction);

    return () => {
      window.removeEventListener("click", handleFirstInteraction);
      window.removeEventListener("touchstart", handleFirstInteraction);
    };
  }, [isError]);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      isManuallyMuted.current = true;
      setPersistedMuted(true);
      try { localStorage.setItem('bgMusicMuted', 'true'); } catch (e) { console.warn(e); }
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setIsError(false);
        isManuallyMuted.current = false;
        setPersistedMuted(false);
        try { localStorage.setItem('bgMusicMuted', 'false'); } catch (e) { console.warn(e); }
      }).catch((e) => {
        console.error("Lỗi phát nhạc:", e);
        nextTrack();
      });
    }
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % currentPlaylist.length);
    setIsPlaying(true);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2">
      {isPlaying && !isError && (
        <button 
          onClick={nextTrack}
          className="p-3 rounded-full bg-white/70 backdrop-blur-sm border-2 border-pink-200 text-pink-400 hover:scale-110 hover:bg-pink-50 transition-all"
          title="Chuyển bài hát"
        >
          <SkipForward className="w-5 h-5" />
        </button>
      )}

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
  );
}
