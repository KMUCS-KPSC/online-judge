const Sequelize = require('sequelize')

const createStore = (force = false) => {
  let sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database.sqlite',
  })

  sequelize
    .authenticate()
    .then(() => {
      console.log(
        'Connection to the database has been established successfully'
      )
    })
    .catch((err) => {
      console.error(`Unable to connect to the database: ${err}`)
    })

  const Model = Sequelize.Model

  class Problems extends Model {}

  Problems.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      difficulty: Sequelize.TEXT,
      ac: Sequelize.INTEGER,
      wa: Sequelize.INTEGER,
      markdown: Sequelize.TEXT,
    },
    {
      sequelize,
      modelName: 'Problems',
    }
  )

  class Contests extends Model {}

  Contests.init(
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: Sequelize.TEXT,
      first: Sequelize.TEXT,
      second: Sequelize.TEXT,
      start: Sequelize.DATE,
      end: Sequelize.DATE,
      status: Sequelize.TEXT,
    },
    {
      sequelize,
      modelName: 'Contests',
    }
  )

  sequelize.sync({ force: force })

  return {
    Problems,
    Contests,
    sequelize,
  }
}

module.exports = {
  createStore,
}
