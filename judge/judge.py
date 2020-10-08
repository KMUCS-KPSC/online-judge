import time
import subprocess
import mongo
import os.path

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

def runCode(inFilePath):
  inFile = open(inFilePath)

  process = subprocess.Popen(["./codes/main"], 
                          stdin = inFile,
                          stdout = subprocess.PIPE,
                          stderr = subprocess.PIPE,
                          bufsize=1,
                          encoding='utf8')

  team_stdout, team_stderr = '', 'Time out'

  # process.stdin.write(dat + '\n')
  # team_stdout = process.stdout.read().strip()
  # team_stderr = process.stderr.read().strip()

  start = time.time()

  try:
    team_stdout, team_stderr = process.communicate('\n', timeout=10)
  except:
    pass

  end = time.time()
  
  '''
  process = subprocess.Popen(["./main2.o"], 
                          stdin = subprocess.PIPE,
                          stdout = subprocess.PIPE,
                          bufsize=1,
                          encoding='utf8')

  process.stdin.write(dat + '\n')
  judge_stdout = process.stdout.read().strip()
  '''

  return (team_stdout, team_stderr, end - start)

def verdict(teamOut, ansPath):
  f = open(ansPath, 'r')
  ansOut = f.read()
  ansOutNorm = ' '.join(ansOut.split())
  teamOutNorm = ' '.join(teamOut.split())
  if ansOutNorm == teamOutNorm:
    return ('ac', ansOut)
  
  return ('wa', ansOut)

def getResult(sample=True):
  pathType = 'sample' if sample else 'secret'
  res = []
  i = 0
  while True:
    i += 1
    inFilePath = './testcase/{}/{}/{}.in'.format(q['problem'], pathType, i)
    outFilePath = './testcase/{}/{}/{}.out'.format(q['problem'], pathType, i)

    if not os.path.isfile(inFilePath):
      break

    inputData = open(inFilePath, 'r').read()

    run_out, run_err, runtime = runCode(inFilePath)
    print(run_out, run_err)
    if len(run_err):
      res.append({'type': 'runtime_err', 'res': run_err, 'runtime': runtime})
      continue
      #mongo.pushResult(q['id'], {'type': 'runtime_err', 'res': run_err, 'runtime': runtime})
    
    _, _, runtime2 = runCode(inFilePath)
    runtime = min(runtime, runtime2)

    ver, ans = verdict(run_out, outFilePath)

    if len(inputData) > 100:
      inputData = inputData[:100] + '\n...'

    if len(ans) > 100:
      ans = ans[:100] + '\n...'

    if len(run_out) > 100:
      run_out = run_out[:100] + '\n...'

    res.append({'type': ver, 'res': run_out, 'runtime': runtime, 'in': inputData, 'ans': ans})

  return res

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

  isSample = q['sample']

  res = []

  res += getResult()

  if not isSample:
    res += getResult(False)
  
  mongo.pushResult(q['id'], res)
