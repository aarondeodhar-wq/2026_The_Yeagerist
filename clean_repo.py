import os
import subprocess

git_exe = r"E:\YCCE\git_cli\cmd\git.exe"

files_to_remove = [
    "push_auto.py",
    "push_debug.py",
    "push_git.py",
    "push_live_final.py",
    "push_live_v2.py",
    "push_live_v3.py",
    "push_live_v4.py",
    "push_to_github.py",
    "github_direct_push.py",
    "github_sync.py",
    "deploy_git.py",
    "deploy_git_force.py"
]

for f in files_to_remove:
    if os.path.exists(f):
        os.remove(f)
        subprocess.run([git_exe, "rm", f], stderr=subprocess.DEVNULL)

subprocess.run([git_exe, "add", "."])
subprocess.run([git_exe, "commit", "-m", "Clean up temporary build & helper scripts"])
subprocess.run([git_exe, "push", "origin", "main"])

if os.path.exists("clean_repo.py"):
    os.remove("clean_repo.py")
