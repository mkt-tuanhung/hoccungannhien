import os
brain_dir = "/Users/mac/.gemini/antigravity-ide/brain/1b589330-eafd-4315-b072-bd743ac0ebf7"
try:
    files = os.listdir(brain_dir)
    print(f"Found {len(files)} files in brain_dir")
    for f in files:
        if 'island_title' in f:
            print(f)
except Exception as e:
    print(f"Error: {e}")
