#!/usr/bin/env python3
"""
Create test images for the Next.js archetype selector.
"""

try:
    from PIL import Image, ImageDraw, ImageFont
    PIL_AVAILABLE = True
except ImportError:
    PIL_AVAILABLE = False
    print("PIL not available. Install with: pip install Pillow")

import os

# Create public/archetypes directory
os.makedirs("public/archetypes", exist_ok=True)

# Archetype configurations
ARCHETYPES = [
    {
        "name": "lean.png",
        "title": "Lean / Athletic",
        "color": (16, 185, 129),  # Green
        "text_color": (255, 255, 255)
    },
    {
        "name": "bulky.png", 
        "title": "Bulky / Powerlifter",
        "color": (139, 69, 19),  # Brown
        "text_color": (255, 255, 255)
    },
    {
        "name": "bodybuilder.png",
        "title": "Classic Bodybuilder", 
        "color": (220, 38, 38),  # Red
        "text_color": (255, 255, 255)
    },
    {
        "name": "kpop.png",
        "title": "K-pop Aesthetic",
        "color": (236, 72, 153),  # Pink
        "text_color": (255, 255, 255)
    },
    {
        "name": "superhero.png",
        "title": "Hollywood Superhero",
        "color": (59, 130, 246),  # Blue
        "text_color": (255, 255, 255)
    }
]

def create_image(name, title, color, text_color):
    """Create a 400x600 test image."""
    if not PIL_AVAILABLE:
        print(f"Would create {name} with title '{title}'")
        return
    
    # Create 400x600 image
    img = Image.new('RGB', (400, 600), color)
    draw = ImageDraw.Draw(img)
    
    # Try to use a larger font
    try:
        font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 32)
        small_font = ImageFont.truetype("/System/Library/Fonts/Arial.ttf", 18)
    except:
        try:
            font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 32)
            small_font = ImageFont.truetype("/System/Library/Fonts/Helvetica.ttc", 18)
        except:
            font = ImageFont.load_default()
            small_font = ImageFont.load_default()
    
    # Draw title
    bbox = draw.textbbox((0, 0), title, font=font)
    text_width = bbox[2] - bbox[0]
    x = (400 - text_width) // 2
    y = 250
    draw.text((x, y), title, fill=text_color, font=font)
    
    # Draw subtitle
    subtitle = "Fitness Archetype"
    bbox = draw.textbbox((0, 0), subtitle, font=small_font)
    text_width = bbox[2] - bbox[0]
    x = (400 - text_width) // 2
    y = 300
    draw.text((x, y), subtitle, fill=text_color, font=small_font)
    
    # Save image
    img.save(f"public/archetypes/{name}", "PNG")
    print(f"✓ Created: public/archetypes/{name}")

def main():
    print("Creating test images for Next.js archetype selector...")
    print("=" * 60)
    
    for archetype in ARCHETYPES:
        create_image(
            archetype["name"],
            archetype["title"], 
            archetype["color"],
            archetype["text_color"]
        )
    
    print("=" * 60)
    print("Test images created!")
    print("You can now run: npm install && npm run dev")

if __name__ == "__main__":
    main()
