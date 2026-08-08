import subprocess
import os

git_path = r"E:\YCCE\git_cli\cmd\git.exe"

subprocess.run([git_path, "add", "."])
subprocess.run([git_path, "commit", "-m", "Restore reference UI layout and floating right collapsible navigation sidebar"])
res = subprocess.run([git_path, "push", "origin", "main"])

if os.path.exists("push_live_v2.py"):
    os.remove("push_live_v2.py")
