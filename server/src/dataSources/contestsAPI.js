const {DataSource} = require('apollo-datasource');
const Sequelize = require('sequelize');
const {isUndefinedOrNull} = require('../utils');

const contestsAttributes = [
    'id',
    'name',
    'first',
    'second',
    'start',
    'end',
    'status',
];

class ContestsAPI extends DataSource {
    constructor(store) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAttributeOfContest(attributeName, id) {
        if (id === undefined || id === null) {
            throw new Error('idIsNotPassedMessage');
        }
        if (!contestsAttributes.includes(attributeName)) {
            throw new Error('attributeNameIsNotValidMessage');
        }
        const contest = await this.store.Contests.findOne({
            where: {id: id},
            attributes: [attributeName],
            raw: true,
        });
        return (contest && isUndefinedOrNull(contest[attributeName])) ?
        contest[attributeName] : null;
    }

    async getAllContests() {
        const contests = await this.store.Contests.findAll();
        const ret = [];
        for(let i = 0; i < contests.length; i++){
            ret.push(contests[i].dataValues);
        }
        return ret;
    }
}

module.exports={
    ContestsAPI,
};