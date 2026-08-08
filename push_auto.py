import subprocess
import os

git_exe = r"E:\YCCE\git_cli\cmd\git.exe"

print("Adding modified files...")
subprocess.run([git_exe, "add", "."])

print("Committing fixes...")
subprocess.run([git_exe, "commit", "-m", "Fix header dropdown z-index overlap with floating sidebar"])

print("Branch status:")
subprocess.run([git_exe, "status"])
