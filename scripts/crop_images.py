import os
from PIL import Image, ImageChops

def trim(im):
    # Create a background image of the same color as the top-left pixel (which should be white)
    bg = Image.new(im.mode, im.size, im.getpixel((0,0)))
    diff = ImageChops.difference(im, bg)
    # Add a little fuzz/tolerance if needed by using getbbox on diff
    diff = ImageChops.add(diff, diff, 2.0, -100)
    bbox = diff.getbbox()
    if bbox:
        # Add a small padding
        padding = 10
        bbox = (
            max(0, bbox[0] - padding),
            max(0, bbox[1] - padding),
            min(im.size[0], bbox[2] + padding),
            min(im.size[1], bbox[3] + padding)
        )
        return im.crop(bbox)
    return im

def make_transparent(im):
    im = im.convert("RGBA")
    datas = im.getdata()
    newData = []
    # Tolerance for almost white
    for item in datas:
        if item[0] > 240 and item[1] > 240 and item[2] > 240:
            newData.append((255, 255, 255, 0))
        else:
            newData.append(item)
    im.putdata(newData)
    return im

directory = "/Users/mac/Documents/Hoc cung An Nhien/public/images/island_names"

for filename in os.listdir(directory):
    if filename.endswith(".png"):
        filepath = os.path.join(directory, filename)
        try:
            im = Image.open(filepath)
            
            # First trim the white space
            cropped_im = trim(im)
            
            # Save it back
            cropped_im.save(filepath)
            print(f"Cropped {filename}")
        except Exception as e:
            print(f"Failed to process {filename}: {e}")
