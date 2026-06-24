#!/bin/bash

# Chuyển đến thư mục gốc của dự án
cd "/Users/mac/Documents/Hoc cung An Nhien"

# Tạo thư mục nếu chưa có
mkdir -p "public/islands"

# Copy 5 đảo gốc
cp ~/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7/island_forest_3d_*.png "public/islands/island_1.png"
cp ~/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7/island_desert_3d_*.png "public/islands/island_2.png"
cp ~/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7/island_snow_3d_*.png "public/islands/island_3.png"
cp ~/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7/island_magic_3d_*.png "public/islands/island_4.png"
cp ~/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7/island_candy_3d_*.png "public/islands/island_5.png"

# Vòng lặp copy 25 đảo còn lại
for i in {6..30}; do
  cp ~/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7/island_${i}_*.png "public/islands/island_${i}.png"
done

echo "✅ Đã copy thành công 30 hòn đảo vào dự án!"
