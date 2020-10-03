const {DataSource} = require('apollo-datasource');
const Sequelize = require('sequelize');
const {isUndefinedOrNull} = require('../utils');

const problemsAttributes = [
    'id',
    'name',
    'difficulty',
    'ac',
    'wa',
];

class ProblemsAPI extends DataSource {
    constructor(store) {
        super();
        this.store = store;
    }

    initialize(config) {
        this.context = config.context;
    }

    async getAttributeOfProblem(attributeName, id) {
        if (id === undefined || id === null) {
            throw new Error('idIsNotPassedMessage');
        }
        if (!problemsAttributes.includes(attributeName)) {
            throw new Error('attributeNameIsNotValidMessage');
        }
        const problem = await this.store.Problems.findOne({
            where: {id: id},
            attributes: [attributeName],
            raw: true,
        });
        return (problem && isUndefinedOrNull(problem[attributeName])) ?
          problem[attributeName] : null;
    }

    async getAllProblems() {
        const problems = await this.store.Problems.findAll();
        const ret = [];
        for(let i = 0; i < problems.length; i++){
            ret.push(problems[i].dataValues);
        }
        return ret;
    }
}

module.exports={
    ProblemsAPI,
};