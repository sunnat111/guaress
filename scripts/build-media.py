#!/usr/bin/env python3
"""Build web media for the Guaress site.

Inputs  (source/):
  photos/photo_<id>_0.jpg   Telegram channel photos, 960x1280 (3:4)
  video/*.mp4               original vertical films from the channel (not committed, too large)

Outputs (public/media/):
  p/<name>.webp, p/<name>-480.webp   3:4 product / look photos (960x1280 and 480x640)
  film-<name>.mp4                    720 px wide H.264, no audio, +faststart
  film-<name>.webp                   poster frame for each film

Run from the repository root:  python3 scripts/build-media.py
Requires Pillow and ffmpeg on PATH.
"""
from __future__ import annotations

import subprocess
import sys
import tempfile
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "source"
OUT = ROOT / "public" / "media"
P_OUT = OUT / "p"

FULL = (960, 1280)
SMALL = (480, 640)

# Telegram photo ids used on the site (post ids 2495-2547, eight studio looks).
PHOTO_IDS = [
    *range(2495, 2501),  # look 01  burgundy polo
    *range(2502, 2508),  # look 02  navy two-piece
    *range(2509, 2515),  # look 03  chocolate polo
    *range(2517, 2523),  # look 04  light-grey suit
    *range(2523, 2527),  # look 05  black cardigan
    *range(2530, 2536),  # look 06  taupe sport set
    *range(2538, 2542),  # look 07  navy sport set
    *range(2544, 2548),  # look 08  dark-brown two-piece
]

# Stills cut from the films: name -> (video file, time in s, crop)
# crop is either ("y", anchor 0..1) for a full-width 3:4 crop placed vertically,
# or ("box", x0, y0, x1, y1) in source pixels.
STILLS: dict[str, tuple[str, float, tuple]] = {
    # outerwear film (1072x1920) - the burned-in caption starts at ~y=1300, crop above it
    "v7101-navy-1": ("outerwear-IMG_7101.mp4", 0.5, ("box", 104, 0, 1072, 1290)),
    "v7101-navy-2": ("outerwear-IMG_7101.mp4", 1.6, ("box", 60, 0, 1028, 1290)),
    "v7101-graphite-1": ("outerwear-IMG_7101.mp4", 3.5, ("box", 104, 0, 1072, 1290)),
    "v7101-graphite-2": ("outerwear-IMG_7101.mp4", 4.2, ("box", 104, 0, 1072, 1290)),
    "v7101-quilted-1": ("outerwear-IMG_7101.mp4", 6.6, ("box", 60, 0, 1028, 1290)),
    "v7101-quilted-2": ("outerwear-IMG_7101.mp4", 7.6, ("box", 60, 0, 1028, 1290)),
    "v7101-beige-1": ("outerwear-IMG_7101.mp4", 9.0, ("box", 104, 0, 1072, 1290)),
    "v7101-beige-2": ("outerwear-IMG_7101.mp4", 9.6, ("box", 60, 0, 1028, 1290)),
    # park film (1072x1904)
    "v6893-bench": ("park-IMG_6893.mp4", 2.6, ("y", 0.62)),
    "v6893-close": ("park-IMG_6893.mp4", 5.4, ("y", 0.40)),
    "v6893-cuff": ("park-IMG_6893.mp4", 4.2, ("y", 0.45)),
    "v6893-shoe": ("park-IMG_6893.mp4", 12.5, ("y", 0.55)),
    "v6893-walk": ("park-IMG_6893.mp4", 22.0, ("y", 0.62)),
    "v6893-carry": ("park-IMG_6893.mp4", 24.5, ("y", 0.45)),
    "v6893-back": ("park-IMG_6893.mp4", 27.6, ("y", 0.55)),
    # store film (1072x1920) - sport-casual sets
    "v2550-plum-1": ("store-guaress.mp4", 2.0, ("y", 0.25)),
    "v2550-plum-2": ("store-guaress.mp4", 14.4, ("y", 0.62)),
    "v2550-black-1": ("store-guaress.mp4", 17.2, ("y", 0.25)),
    "v2550-black-2": ("store-guaress.mp4", 7.2, ("y", 0.62)),
    "v2550-navy-1": ("store-guaress.mp4", 12.0, ("y", 0.25)),
    "v2550-navy-2": ("store-guaress.mp4", 20.0, ("y", 0.62)),
    # stores page: interior shots
    "v2550-store": ("store-guaress.mp4", 8.0, ("y", 0.35)),
    "v7101-sign": ("outerwear-IMG_7101.mp4", 0.2, ("box", 0, 0, 968, 1290)),
}

# Films. Each is written twice:
#   film-<name>.av1.mp4  AV1 (served first: better quality at a third of the size)
#   film-<name>.mp4      H.264 fallback for browsers without AV1 (e.g. older iPhones)
# filters: ffmpeg video filter chain before encoding ("cas" = light sharpening, which
# helps because the films are stretched to fill large screens).
# "park-wide" is a landscape band of the vertical park film for the desktop hero background.
Film = dict
FILMS: dict[str, Film] = {
    "park": dict(src="park-IMG_6893.mp4", start=0.0, end=28.4, poster=2.6,
                 filters="cas=0.2", h264_crf=23, av1_crf=31,
                 h264_max="1600k", av1_max=1100),
    "park-wide": dict(src="park-IMG_6893.mp4", start=0.0, end=28.4, poster=2.6,
                      filters="crop=1072:840:0:460,cas=0.3", h264_crf=21, av1_crf=26,
                      h264_max="1600k", av1_max=1000),
    "store": dict(src="store-guaress.mp4", start=0.0, end=22.7, poster=0.4,
                  filters="scale=720:-2:flags=lanczos,cas=0.15", h264_crf=25, av1_crf=33),
    "outerwear": dict(src="outerwear-IMG_7101.mp4", start=0.0, end=10.3, poster=0.3,
                      filters="scale=720:-2:flags=lanczos,cas=0.15", h264_crf=25, av1_crf=33),
}



def crop_34(im: Image.Image, crop: tuple) -> Image.Image:
    w, h = im.size
    if crop[0] == "box":
        _, x0, y0, x1, y1 = crop
        im = im.crop((x0, y0, x1, y1))
        w, h = im.size
        # make sure the box is 3:4 (trim width or height centrally)
        if w * 4 > h * 3:
            nw = h * 3 // 4
            im = im.crop(((w - nw) // 2, 0, (w - nw) // 2 + nw, h))
        else:
            nh = w * 4 // 3
            im = im.crop((0, (h - nh) // 2, w, (h - nh) // 2 + nh))
        return im
    _, anchor = crop
    if w * 4 > h * 3:  # too wide
        nw = h * 3 // 4
        x0 = (w - nw) // 2
        return im.crop((x0, 0, x0 + nw, h))
    nh = w * 4 // 3
    y0 = int(round((h - nh) * anchor))
    return im.crop((0, y0, w, y0 + nh))


def save_pair(im: Image.Image, name: str) -> None:
    im = im.convert("RGB")
    im.resize(FULL, Image.LANCZOS).save(P_OUT / f"{name}.webp", "WEBP", quality=84, method=6)
    im.resize(SMALL, Image.LANCZOS).save(P_OUT / f"{name}-480.webp", "WEBP", quality=80, method=6)


def grab_frame(video: Path, t: float) -> Image.Image:
    with tempfile.NamedTemporaryFile(suffix=".png") as tmp:
        subprocess.run(
            ["ffmpeg", "-v", "error", "-y", "-ss", str(t), "-i", str(video), "-frames:v", "1", tmp.name],
            check=True,
        )
        return Image.open(tmp.name).copy()


def main() -> None:
    P_OUT.mkdir(parents=True, exist_ok=True)

    for pid in PHOTO_IDS:
        src = SRC / "photos" / f"photo_{pid}_0.jpg"
        im = Image.open(src)
        save_pair(crop_34(im, ("y", 0.5)), f"p{pid}")
    print(f"photos: {len(PHOTO_IDS)}")

    video_dir = SRC / "video"
    have_video = video_dir.exists() and any(video_dir.iterdir())
    if not have_video:
        print("source/video is empty - skipping stills and films (existing outputs kept)")
        return

    for name, (vid, t, crop) in STILLS.items():
        save_pair(crop_34(grab_frame(video_dir / vid, t), crop), name)
    print(f"stills: {len(STILLS)}")

    only = set(sys.argv[1:])  # optional: build only the named films
    for name, f in FILMS.items():
        if only and name not in only:
            continue
        vf = f"{f['filters']},fps=30"
        base = ["ffmpeg", "-v", "error", "-y", "-ss", str(f["start"]), "-to", str(f["end"]),
                "-i", str(video_dir / f["src"]), "-an", "-vf", vf, "-pix_fmt", "yuv420p"]
        h264 = OUT / f"film-{name}.mp4"
        subprocess.run(
            base + ["-c:v", "libx264", "-profile:v", "high", "-preset", "slow", "-tune", "film",
                    "-crf", str(f["h264_crf"]),
                    # optional cap so grainy scenes cannot balloon the file (capped CRF)
                    *(["-maxrate", f["h264_max"], "-bufsize", f"{2 * int(f['h264_max'].rstrip('k'))}k"] if "h264_max" in f else []),
                    "-movflags", "+faststart", str(h264)],
            check=True,
        )
        av1 = OUT / f"film-{name}.av1.mp4"
        subprocess.run(
            base + ["-c:v", "libsvtav1", "-preset", "6", "-crf", str(f["av1_crf"]),
                    *(["-svtav1-params", f"mbr={f['av1_max']}"] if "av1_max" in f else []),
                    "-movflags", "+faststart", str(av1)],
            check=True,
            stderr=subprocess.DEVNULL,
        )
        poster = grab_frame(video_dir / f["src"], f["poster"]).convert("RGB")
        for flt in f["filters"].split(","):
            if flt.startswith("crop="):
                w, h, x, y = (int(v) for v in flt.split("=")[1].split(":"))
                poster = poster.crop((x, y, x + w, y + h))
            elif flt.startswith("scale=720"):
                poster = poster.resize((720, round(poster.height * 720 / poster.width)), Image.LANCZOS)
        poster.save(OUT / f"film-{name}.webp", "WEBP", quality=84, method=6)
        print(f"film {name}: h264 {h264.stat().st_size // 1024} KB, av1 {av1.stat().st_size // 1024} KB")


if __name__ == "__main__":
    sys.exit(main())
