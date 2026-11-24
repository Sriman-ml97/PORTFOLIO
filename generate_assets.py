import os
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

os.makedirs('public/images', exist_ok=True)
os.makedirs('public/videos', exist_ok=True)

def create_editorial_image(filename, width, height, title, subtitle, category, accent_color=(163, 58, 50), bg_color=(23, 23, 23)):
    img = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(img)
    
    # Draw subtle background grid/guides
    grid_color = (35, 35, 35)
    for x in range(0, width, 80):
        draw.line([(x, 0), (x, height)], fill=grid_color, width=1)
    for y in range(0, height, 80):
        draw.line([(0, y), (width, y)], fill=grid_color, width=1)
        
    # Draw cinematic frame border
    margin = 40
    frame_color = (60, 60, 60)
    draw.rectangle([margin, margin, width - margin, height - margin], outline=frame_color, width=1)
    
    # Corner registration marks
    corner_len = 16
    for cx, cy in [(margin, margin), (width - margin, margin), (margin, height - margin), (width - margin, height - margin)]:
        sx = 1 if cx == margin else -1
        sy = 1 if cy == margin else -1
        draw.line([(cx, cy), (cx + sx * corner_len, cy)], fill=accent_color, width=2)
        draw.line([(cx, cy), (cx, cy + sy * corner_len)], fill=accent_color, width=2)
        
    # Center graphic badge / abstract shapes
    center_x, center_y = width // 2, height // 2 - 20
    draw.ellipse([center_x - 120, center_y - 120, center_x + 120, center_y + 120], outline=(45, 45, 45), width=1)
    draw.ellipse([center_x - 60, center_y - 60, center_x + 60, center_y + 60], outline=accent_color, width=2)
    
    # Inner dynamic accents
    draw.line([(center_x - 140, center_y), (center_x + 140, center_y)], fill=(80, 80, 80), width=1)
    draw.line([(center_x, center_y - 140), (center_x, center_y + 140)], fill=(80, 80, 80), width=1)
    
    # Watermark / Editorial Labels
    draw.text((margin + 24, margin + 24), f"ARCHIVE // {category.upper()}", fill=accent_color)
    draw.text((width - margin - 220, margin + 24), "SRIMAN B. STUDIO", fill=(140, 136, 125))
    
    # Big title & subtitle
    draw.text((margin + 30, height - margin - 90), title.upper(), fill=(242, 240, 233))
    draw.text((margin + 30, height - margin - 50), subtitle, fill=(180, 178, 170))
    draw.text((width - margin - 180, height - margin - 50), "PLACEHOLDER ASSET", fill=(115, 112, 107))
    
    img.save(filename, quality=92)
    print(f"Generated {filename}")

# Generate Images
create_editorial_image('public/images/portrait.jpg', 900, 1125, 'Sriman B.', 'Creative Technologist & Visual Storyteller', 'Portrait 01', bg_color=(18, 18, 18))
create_editorial_image('public/images/hero-poster.jpg', 1920, 1080, 'Ideas Into Experiences', 'Cinematic Showreel Poster // Fallback', 'Film 00', bg_color=(12, 12, 12))
create_editorial_image('public/images/project-1.jpg', 1280, 800, 'Autonomous Vision Hub', 'Full-Stack Distributed System with AI Analysis', 'Full Stack 01', bg_color=(20, 22, 24))
create_editorial_image('public/images/project-2.jpg', 1280, 800, 'Neural Studio Interface', 'Creative Development & WebGL Pipeline', 'Full Stack 02', bg_color=(24, 20, 20))
create_editorial_image('public/images/project-3.jpg', 1280, 800, 'Kinetic Sensor Suite', 'Real-Time Telemetry & Hardware Interface', 'Full Stack 03', bg_color=(22, 22, 22))
create_editorial_image('public/images/robotics.jpg', 1400, 900, 'Autonomous Guide Robot', 'ROS 2 · Nav2 · Python · LIDAR SLAM · Human-Robot Interaction', 'Robotics & AI', accent_color=(163, 58, 50), bg_color=(15, 16, 18))
create_editorial_image('public/images/cinema-1.jpg', 1280, 720, 'Tokyo Monoliths', 'Anamorphic 35mm · Color Grading · Sound Design', 'Cinematography', bg_color=(16, 17, 20))
create_editorial_image('public/images/cinema-2.jpg', 1280, 720, 'Shadows & Silicon', 'Short Film · Documentary on Robotics & Labor', 'Documentary', bg_color=(20, 16, 16))
create_editorial_image('public/images/cinema-3.jpg', 1280, 720, 'Fragments of Motion', 'Commercial Edit · Sound Design · Speed Ramps', 'Video Editing', bg_color=(18, 18, 18))
create_editorial_image('public/images/cinema-4.jpg', 1280, 720, 'Raw Horizon', 'Editorial Photography · 35mm Grain Study', 'Photography', bg_color=(22, 20, 18))

# Generate genuine cinematic looping MP4 video with cv2
try:
    import cv2
    video_path = 'public/videos/showreel.mp4'
    vw, vh = 1280, 720
    fps = 24
    num_frames = 72 # 3 second loop
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    out = cv2.VideoWriter(video_path, fourcc, fps, (vw, vh))
    
    for f in range(num_frames):
        t = f / num_frames
        # Create subtle cinematic ambient moving gradient with light beam
        frame = np.zeros((vh, vw, 3), dtype=np.uint8)
        
        # Base subtle dark tone #121212
        frame[:, :] = [18, 18, 20]
        
        # Subtle moving warm radial light sweep
        cx = int(vw * 0.5 + math.sin(t * math.pi * 2) * 150)
        cy = int(vh * 0.5 + math.cos(t * math.pi * 2) * 60)
        
        y_coords, x_coords = np.ogrid[:vh, :vw]
        dist_sq = (x_coords - cx)**2 + (y_coords - cy)**2
        radius = 500
        mask = np.clip(1.0 - np.sqrt(dist_sq) / radius, 0, 1)
        
        # Add warm cinematic glow
        frame[:, :, 2] = np.clip(frame[:, :, 2] + mask * 45, 0, 255) # Red
        frame[:, :, 1] = np.clip(frame[:, :, 1] + mask * 25, 0, 255) # Green
        frame[:, :, 0] = np.clip(frame[:, :, 0] + mask * 15, 0, 255) # Blue
        
        # Add subtle film grain
        noise = np.random.randint(-8, 9, (vh, vw, 3), dtype=np.int16)
        frame_noisy = np.clip(frame.astype(np.int16) + noise, 0, 255).astype(np.uint8)
        
        # Add minimal letterbox bars
        bar_height = 40
        frame_noisy[:bar_height, :] = 0
        frame_noisy[-bar_height:, :] = 0
        
        # Put text overlay on frame
        cv2.putText(frame_noisy, "SRIMAN B. // CINEMATIC SHOWREEL (PLACEHOLDER)", (60, vh - 60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.65, (163, 160, 150), 1, cv2.LINE_AA)
        cv2.putText(frame_noisy, "REPLACE WITH YOUR SHOWREEL.MP4", (vw - 420, vh - 60), 
                    cv2.FONT_HERSHEY_SIMPLEX, 0.55, (120, 70, 70), 1, cv2.LINE_AA)
        
        out.write(frame_noisy)
        
    out.release()
    print(f"Generated {video_path} successfully ({num_frames} frames, {fps}fps)")
except Exception as e:
    print(f"Error generating video with cv2: {e}")
