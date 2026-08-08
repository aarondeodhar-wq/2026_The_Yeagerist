import os
import json
import urllib.request
import urllib.parse
import base64

def sync_to_github(repo_name="2026_The_Yeagerist-"):
    """
    Automated GitHub Sync Helper:
    Prepares project files in E:\\YCCE for continuous sync to GitHub repository.
    """
    print(f"[GitHub Sync] Scanning project files in E:\\YCCE for repository '{repo_name}'...")

    ignore_dirs = {".git", "node_modules", "dist", "__pycache__", ".venv"}
    files_to_sync = []

    for root, dirs, files in os.walk("E:\\YCCE"):
        dirs[:] = [d for d in dirs if d not in ignore_dirs]
        for file in files:
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, "E:\\YCCE").replace("\\", "/")
            files_to_sync.append(rel_path)

    print(f"[GitHub Sync] Found {len(files_to_sync)} project source files ready to sync.")

if __name__ == "__main__":
    sync_to_github()
