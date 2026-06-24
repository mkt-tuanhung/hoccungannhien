import os
import glob
import shutil

brain_dir = "/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7"
dest_dir = "/Users/mac/Documents/Hoc cung An Nhien/public/images/island_names"

os.makedirs(dest_dir, exist_ok=True)

for i in range(1, 14):
    pattern = os.path.join(brain_dir, f"island_title_{i}_*.png")
    matches = glob.glob(pattern)
    if matches:
        latest = max(matches, key=os.path.getctime)
        dest_path = os.path.join(dest_dir, f"level_{i}.png")
        shutil.copy2(latest, dest_path)
        print(f"Copied level {i}")
    else:
        print(f"Missing level {i}")
