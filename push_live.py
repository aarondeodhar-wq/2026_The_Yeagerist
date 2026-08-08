import subprocess
import os

git_path = r"E:\YCCE\git_cli\cmd\git.exe"

print("Staging files...")
subprocess.run([git_path, "add", "."])

print("Committing...")
subprocess.run([git_path, "commit", "-m", "Live Update: High contrast UI, Multilingual support, Vercel deployment"])

print("Pushing to GitHub...")
res = subprocess.run([git_path, "push", "origin", "main"])

if res.returncode == 0:
    print("SUCCESS: GitHub live updated!")
else:
    print("Push failed.")
