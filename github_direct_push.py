import os
import sys
import subprocess
import json

REPO_URL = "https://github.com/aarondeodhar-wq/2026_The_Yeagerist-.git"
TARGET_DIR = r"E:\YCCE"

print("=========================================================")
print(f"  DeepSea-Guardian AI — GitHub Repository Uploader")
print(f"  Target Repository: {REPO_URL}")
print(f"  Local Directory:   {TARGET_DIR}")
print("=========================================================")

# Check if git exists anywhere on PATH or common installation folders
candidate_paths = [
    "git",
    r"C:\Program Files\Git\cmd\git.exe",
    r"C:\Program Files (x86)\Git\cmd\git.exe",
    os.path.expanduser(r"~\AppData\Local\Programs\Git\cmd\git.exe"),
    r"C:\Git\cmd\git.exe"
]

git_bin = None
for cp in candidate_paths:
    try:
        proc = subprocess.run([cp, "--version"], capture_output=True, text=True)
        if proc.returncode == 0:
            git_bin = cp
            print(f"[Git Check] Detected system Git: {cp} ({proc.stdout.strip()})")
            break
    except Exception:
        continue

if git_bin:
    print("\n[Executing Git Push Sequence]")
    try:
        subprocess.run([git_bin, "init"], cwd=TARGET_DIR, check=True)
        subprocess.run([git_bin, "add", "."], cwd=TARGET_DIR, check=True)
        subprocess.run([git_bin, "commit", "-m", "Deploy DeepSea-Guardian AI Patient Record Analysis & Monitoring Web App"], cwd=TARGET_DIR)
        subprocess.run([git_bin, "branch", "-M", "main"], cwd=TARGET_DIR)
        subprocess.run([git_bin, "remote", "remove", "origin"], cwd=TARGET_DIR, capture_output=True)
        subprocess.run([git_bin, "remote", "add", "origin", REPO_URL], cwd=TARGET_DIR, check=True)
        
        print("\nPushing to main branch...")
        p_res = subprocess.run([git_bin, "push", "-u", "origin", "main"], cwd=TARGET_DIR, capture_output=True, text=True)
        print(p_res.stdout)
        print(p_res.stderr)
        print("\n✅ Repository Sync Completed!")
    except Exception as e:
        print(f"Push error: {e}")
else:
    print("\n[Notice] Git for Windows CLI is not installed on this system.")
    print("To sync E:\\YCCE directly to your repository:")
    print(f"1. Open Command Prompt / PowerShell and install Git (or run `winget install Git.Git`).")
    print(f"2. Run the following commands in E:\\YCCE:")
    print(f"   git init")
    print(f"   git add .")
    print(f"   git commit -m \"Initial DeepSea-Guardian Commit\"")
    print(f"   git remote add origin {REPO_URL}")
    print(f"   git push -u origin main")
