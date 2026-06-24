#!/bin/bash
brain_dir="/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7"
dest_dir="/Users/mac/Documents/Hoc cung An Nhien/public/images/island_names"

mkdir -p "$dest_dir"

for i in {1..13}; do
  # Find the newest file matching the pattern
  latest_img=$(ls -t "$brain_dir"/island_title_${i}_*.png 2>/dev/null | head -n 1)
  if [ -n "$latest_img" ]; then
    cp "$latest_img" "$dest_dir/level_${i}.png"
    echo "Copied level $i"
  else
    echo "Missing level $i"
  fi
done
