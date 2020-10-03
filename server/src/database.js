const Sequelize = require('sequelize');

const createStore = (force=false) => {
    let sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: 'database.sqlite',
    });

    sequelize.authenticate().then(() => {
        console.log('Connection to the database has been established successfully');
    }).catch((err) => {
        console.error(`Unable to connect to the database: ${err}`);
    });

    const Model = Sequelize.Model;

    class Problems extends Model {}

    Problems.init({
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: Sequelize.TEXT,
        difficulty: Sequelize.TEXT,
        ac: Sequelize.INTEGER,
        wa: Sequelize.INTEGER,
    },
    {
        sequelize,
        modelName: 'Problems',
    });

    sequelize.sync({force: force});

    return {
        Problems,
        sequelize,
    };
};

module.exports = {
    createStore,
};