import pymongo

myclient = pymongo.MongoClient('mongodb://localhost:27017/')

judgeDB = myclient['judge']
judgeQueue = judgeDB['judgeQueue']
judgeResults = judgeDB['judgeResults']

def popQueue():
  ret = judgeQueue.find_one()
  if ret is None:
    return None
  judgeQueue.delete_one(ret)
  return ret

def pushQueue(id, problem, lang, code):
  x = {'id': id, 'problem': problem, 'lang': lang, 'code': code}
  return judgeQueue.insert_one(x).inserted_id

def popResult():
  ret = judgeResults.find_one()
  if ret is None:
    return None
  judgeResults.delete_one(ret)
  return ret

def pushResult(id, result):
  x = {'id': id, 'result': result}
  return judgeResults.insert_one(x).inserted_id
