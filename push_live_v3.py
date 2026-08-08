import subprocess
import os

git_path = r"E:\YCCE\git_cli\cmd\git.exe"

subprocess.run([git_path, "add", "."])
subprocess.run([git_path, "commit", "-m", "Restore signature cyan-teal-purple color scheme, glassmorphism, and spring physics"])
res = subprocess.run([git_path, "push", "origin", "main"])

if os.path.exists("push_live_v3.py"):
    os.remove("push_live_v3.py")
