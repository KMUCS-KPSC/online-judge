import time
import subprocess
import mongo

def saveCode(code):
  f = open('./codes/main.cc', 'w')
  f.write(code)
  f.close()

def compileCode():
  cmd = '/usr/bin/g++ ./codes/main.cc -o ./codes/main -Wall -lm -std=gnu++14'

  process = subprocess.run([cmd], shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
  stdout = process.stdout.decode('utf-8')
  stderr = process.stderr.decode('utf-8')
  return (stdout, stderr)

def runCode():
  dat = '' # input data
  process = subprocess.Popen(["./codes/main"], 
                          stdin = subprocess.PIPE,
                          stdout = subprocess.PIPE,
                          stderr = subprocess.PIPE,
                          bufsize=1,
                          encoding='utf8')

  process.stdin.write(dat + '\n')
  team_stdout = process.stdout.read().strip()
  
  '''
  process = subprocess.Popen(["./main2.o"], 
                          stdin = subprocess.PIPE,
                          stdout = subprocess.PIPE,
                          bufsize=1,
                          encoding='utf8')

  process.stdin.write(dat + '\n')
  judge_stdout = process.stdout.read().strip()
  '''

  return team_stdout

mongo.clear()

tmp = '''\
#include <iostream>
using namespace std;

int main(){
  cout << "Hello, world!" << endl;
  return 0;
}
'''

#mongo.pushQueue('tmp_id', 1, 'cpp', tmp)

# Judge loop
while True:
  time.sleep(1)
  q = mongo.popQueue()
  if q is None:
    continue

  saveCode(q['code'])
  compile_out, compile_err = compileCode()
  print(len(compile_out), len(compile_err))
  if len(compile_err):
    mongo.pushResult(q['id'], {'type': 'compile_err', 'res': compile_err})
    continue
  
  run_out = runCode()
  print(run_out)
  mongo.pushResult(q['id'], {'type': 'std_out', 'res': run_out})
