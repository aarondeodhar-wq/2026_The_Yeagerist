import subprocess
import os

git_path = r"E:\YCCE\git_cli\cmd\git.exe"

subprocess.run([git_path, "add", "."])
subprocess.run([git_path, "commit", "-m", "Mobile responsive fixes, AI chatbot phone overlay, BottomMobileNav, and Vercel sync"])
res = subprocess.run([git_path, "push", "origin", "main"])

if os.path.exists("push_live_final.py"):
    os.remove("push_live_final.py")
