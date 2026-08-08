import subprocess
import sys

git_path = r"E:\YCCE\git_cli\cmd\git.exe"

proc = subprocess.Popen([git_path, "push", "origin", "main"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
stdout, stderr = proc.communicate(timeout=30)

print("STDOUT:", stdout)
print("STDERR:", stderr)
print("EXIT CODE:", proc.returncode)
