const { DataSource } = require('apollo-datasource')

const MongoClient = require('mongodb').MongoClient
const url = 'mongodb://localhost:27017/'

class JudgeAPI extends DataSource {
  constructor(store) {
    super()
    this.store = store
  }

  initialize(config) {
    this.context = config.context
  }

  async pushQueue(id, problem, lang, code) {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err)
    })

    if (!client) {
      return
    }

    try {
      const db = client.db('judge')
      let collection = db.collection('judgeQueue')
      let query = { id, problem, lang, code }
      let res = await collection.insertOne(query)
      console.log(res)
    } catch (err) {
      console.log(err)
    } finally {
      client.close()
    }
  }

  async popResult(id) {
    const client = await MongoClient.connect(url, {
      useNewUrlParser: true,
    }).catch((err) => {
      console.log(err)
    })

    if (!client) {
      return
    }

    try {
      const db = client.db('judge')
      let collection = db.collection('judgeResults')
      let query = { id }
      let res = await collection.findOne(query)
      if (res !== null) {
        await collection.deleteOne(query)
      }
      console.log(res)
      return res
    } catch (err) {
      console.log(err)
    } finally {
      client.close()
    }
  }

  async getResult(id, problem, lang, code) {
    await this.pushQueue(id, problem, lang, code)

    let res = null
    while (res === null) {
      await new Promise((r) => setTimeout(r, 1000))
      res = await this.popResult(id)
    }

    return res
  }
}

module.exports = {
  JudgeAPI,
}
