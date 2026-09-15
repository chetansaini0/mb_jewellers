import subprocess
from pathlib import Path

import imageio_ffmpeg

ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
src = Path(r"C:\Users\cheta\OneDrive\Desktop\mbpics")
out = Path(r"C:\Users\cheta\OneDrive\Desktop\MB jewellers\cursor\public\instareel")
out.mkdir(parents=True, exist_ok=True)

clips = [
    ("IMG_2264.MOV", "reel-showroom-01.mp4"),
    ("IMG_1764.MOV", "reel-showroom-02.mp4"),
    ("IMG_2055.MOV", "reel-showroom-03.mp4"),
    ("IMG_2081.MOV", "reel-showroom-04.mp4"),
    ("IMG_2087.MOV", "reel-showroom-05.mp4"),
]

for source_name, dest_name in clips:
    source = src / source_name
    dest = out / dest_name
    cmd = [
        ffmpeg,
        "-y",
        "-i",
        str(source),
        "-t",
        "18",
        "-vf",
        "scale=-2:720:flags=lanczos,format=yuv420p",
        "-c:v",
        "libx264",
        "-profile:v",
        "high",
        "-pix_fmt",
        "yuv420p",
        "-preset",
        "medium",
        "-crf",
        "23",
        "-c:a",
        "aac",
        "-b:a",
        "128k",
        "-ac",
        "2",
        "-movflags",
        "+faststart",
        str(dest),
    ]
    print("encoding", dest_name)
    subprocess.check_call(cmd)
    print(dest_name, dest.stat().st_size // 1024, "kb")
