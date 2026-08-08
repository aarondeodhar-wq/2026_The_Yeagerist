import os
import subprocess
import sys

def push_project_to_github():
    """
    Script to initialize git repo in E:\\YCCE and push to https://github.com/aarondeodhar-wq/2026_The_Yeagerist-
    """
    repo_url = "https://github.com/aarondeodhar-wq/2026_The_Yeagerist-.git"
    print(f"=== Pushing E:\\YCCE to GitHub repository: {repo_url} ===")

    # Check for git in standard paths
    git_paths = [
        "git",
        r"C:\Program Files\Git\cmd\git.exe",
        r"C:\Program Files (x86)\Git\cmd\git.exe",
        os.path.expanduser(r"~\AppData\Local\Programs\Git\cmd\git.exe")
    ]

    git_exe = None
    for gp in git_paths:
        try:
            res = subprocess.run([gp, "--version"], capture_output=True, text=True)
            if res.returncode == 0:
                git_exe = gp
                print(f"[Git Check] Found Git at: {gp} ({res.stdout.strip()})")
                break
        except Exception:
            continue

    if not git_exe:
        print("[Git Check] Git executable not directly found on system PATH.")
        print("[GitHub Info] Repository target: https://github.com/aarondeodhar-wq/2026_The_Yeagerist-")
        return False

    try:
        # 1. Initialize git if not already
        subprocess.run([git_exe, "init"], cwd="E:\\YCCE", check=True)

        # 2. Add all project files
        subprocess.run([git_exe, "add", "."], cwd="E:\\YCCE", check=True)

        # 3. Commit
        subprocess.run([git_exe, "commit", "-m", "Initial commit: DeepSea-Guardian AI Patient Monitoring Web App"], cwd="E:\\YCCE")

        # 4. Set branch main
        subprocess.run([git_exe, "branch", "-M", "main"], cwd="E:\\YCCE")

        # 5. Remote origin
        subprocess.run([git_exe, "remote", "remove", "origin"], cwd="E:\\YCCE", capture_output=True)
        subprocess.run([git_exe, "remote", "add", "origin", repo_url], cwd="E:\\YCCE", check=True)

        # 6. Push
        print(f"[Git Push] Pushing commits to remote origin main...")
        push_res = subprocess.run([git_exe, "push", "-u", "origin", "main"], cwd="E:\\YCCE", capture_output=True, text=True)
        print(push_res.stdout)
        print(push_res.stderr)
        return True
    except Exception as e:
        print(f"[Git Error] {e}")
        return False

if __name__ == "__main__":
    push_project_to_github()
