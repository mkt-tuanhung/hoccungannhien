#!/bin/bash

# Chuyển đến thư mục gốc của dự án
cd "/Users/mac/Documents/Hoc cung An Nhien"

# Tạo thư mục chứa TTS
mkdir -p "public/tts/islands"

echo "Đang tạo giọng đọc AI bản xứ tiếng Anh (Sử dụng giọng Samantha của macOS)..."

say -v Samantha "Level 1: Whispering Breeze Island" -o "public/tts/islands/island_1.m4a"
say -v Samantha "Level 2: Glowing Amber Island" -o "public/tts/islands/island_2.m4a"
say -v Samantha "Level 3: Crystal Cove Island" -o "public/tts/islands/island_3.m4a"
say -v Samantha "Level 4: Mystic Mirage Island" -o "public/tts/islands/island_4.m4a"
say -v Samantha "Level 5: Sapphire Shore Island" -o "public/tts/islands/island_5.m4a"
say -v Samantha "Level 6: Echoing Cave Island" -o "public/tts/islands/island_6.m4a"
say -v Samantha "Level 7: Lunar Tide Island" -o "public/tts/islands/island_7.m4a"
say -v Samantha "Level 8: Sunken Star Island" -o "public/tts/islands/island_8.m4a"
say -v Samantha "Level 9: Crimson Coral Island" -o "public/tts/islands/island_9.m4a"
say -v Samantha "Level 10: Obsidian Peak Island" -o "public/tts/islands/island_10.m4a"
say -v Samantha "Level 11: Floating Lantern Island" -o "public/tts/islands/island_11.m4a"
say -v Samantha "Level 12: Silver Mist Island" -o "public/tts/islands/island_12.m4a"
say -v Samantha "Level 13: Enchanted Grove Island" -o "public/tts/islands/island_13.m4a"
say -v Samantha "Level 14: Frozen Flame Island" -o "public/tts/islands/island_14.m4a"
say -v Samantha "Level 15: Golden Canopy Island" -o "public/tts/islands/island_15.m4a"
say -v Samantha "Level 16: Silent Shadow Island" -o "public/tts/islands/island_16.m4a"
say -v Samantha "Level 17: Azure Abyss Island" -o "public/tts/islands/island_17.m4a"
say -v Samantha "Level 18: Celestial Wind Island" -o "public/tts/islands/island_18.m4a"
say -v Samantha "Level 19: Thorny Rose Island" -o "public/tts/islands/island_19.m4a"
say -v Samantha "Level 20: Emerald Eye Island" -o "public/tts/islands/island_20.m4a"
say -v Samantha "Level 21: Phantom Pearl Island" -o "public/tts/islands/island_21.m4a"
say -v Samantha "Level 22: Thunder Strike Island" -o "public/tts/islands/island_22.m4a"
say -v Samantha "Level 23: Starlight Oasis Island" -o "public/tts/islands/island_23.m4a"
say -v Samantha "Level 24: Wandering Wisp Island" -o "public/tts/islands/island_24.m4a"
say -v Samantha "Level 25: Chrono Clockwork Island" -o "public/tts/islands/island_25.m4a"
say -v Samantha "Level 26: Rainbow Prism Island" -o "public/tts/islands/island_26.m4a"
say -v Samantha "Level 27: Dragon's Breath Island" -o "public/tts/islands/island_27.m4a"
say -v Samantha "Level 28: Aetherial Void Island" -o "public/tts/islands/island_28.m4a"
say -v Samantha "Level 29: Divine Halo Island" -o "public/tts/islands/island_29.m4a"
say -v Samantha "Level 30: Infinity Nexus Island" -o "public/tts/islands/island_30.m4a"

echo "✅ Đã tạo xong 30 file âm thanh tên hòn đảo thành công!"
