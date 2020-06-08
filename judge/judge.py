import subprocess

dat = '' # input data
process = subprocess.Popen(["./main.o"], 
                        stdin = subprocess.PIPE,
                        stdout = subprocess.PIPE,
                        bufsize=1,
                        encoding='utf8')

process.stdin.write(dat + '\n')
team_stdout = process.stdout.read().strip()

process = subprocess.Popen(["./main2.o"], 
                        stdin = subprocess.PIPE,
                        stdout = subprocess.PIPE,
                        bufsize=1,
                        encoding='utf8')

process.stdin.write(dat + '\n')
judge_stdout = process.stdout.read().strip()
