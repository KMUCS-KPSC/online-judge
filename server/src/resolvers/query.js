module.exports.Query = {
    helloWorld: async (parent, args, context) => {
        return true;
    },
    getProblems: async (parent, args, context) => {
        const problems = await context.dataSources.problemsAPI.getAllProblems();
        const ret = [];
        for(let i = 0; i < problems.length; i++){
            ret.push({
                id: problems[i].id,
                name: problems[i].name,
                difficulty: problems[i].difficulty,
                ac: problems[i].ac,
                wa: problems[i].wa,
            });
        }
        return ret;
    }
};
