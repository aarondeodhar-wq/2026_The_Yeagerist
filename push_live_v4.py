import subprocess
import os

git_path = r"E:\YCCE\git_cli\cmd\git.exe"

subprocess.run([git_path, "add", "."])
subprocess.run([git_path, "commit", "-m", "Full width layout fix, patient profile update modal, multi-format EHR exports, Vercel sync"])
res = subprocess.run([git_path, "push", "origin", "main"])

if os.path.exists("push_live_v4.py"):
    os.remove("push_live_v4.py")
