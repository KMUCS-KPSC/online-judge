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
    },
    getContests: async (parent, args, context) => {
        const contests = await context.dataSources.contestsAPI.getAllContests();
        const ret = [];
        for(let i = 0; i < contests.length; i++){
            ret.push({
                id: contests[i].id,
                name: contests[i].name,
                first: contests[i].first,
                second: contests[i].second,
                start: contests[i].start.toISOString(),
                end: contests[i].end.toISOString(),
                status: contests[i].status,
            });
        }
        return ret;
    },
};
