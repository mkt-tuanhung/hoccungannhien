import os
import shutil
import glob

brain_dir = "/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7"
dest_dir = "/Users/mac/Documents/Hoc cung An Nhien/public/images/island_names"

os.makedirs(dest_dir, exist_ok=True)

for i in range(1, 31):
    pattern = os.path.join(brain_dir, f"title_full_{i}_*.png")
    files = glob.glob(pattern)
    if files:
        # get the latest
        latest_file = max(files, key=os.path.getmtime)
        dest_file = os.path.join(dest_dir, f"level_{i}.png")
        shutil.copy2(latest_file, dest_file)
        print(f"Copied {latest_file} to {dest_file}")
    else:
        print(f"File not found for level {i}")
