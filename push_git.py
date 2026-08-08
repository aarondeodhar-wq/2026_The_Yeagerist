import subprocess
import sys

git_exe = r"E:\YCCE\git_cli\cmd\git.exe"

print("Adding files...")
subprocess.run([git_exe, "add", "."])

print("Committing...")
subprocess.run([git_exe, "commit", "-m", "Sign out options, persona switcher, full width UI layout, and Vercel sync"])

print("Pushing to GitHub...")
res = subprocess.run([git_exe, "push", "origin", "main"], capture_output=True, text=True)

print("Return Code:", res.returncode)
print("STDOUT:", res.stdout)
print("STDERR:", res.stderr)
