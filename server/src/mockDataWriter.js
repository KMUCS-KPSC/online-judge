const fs = require('fs')

const createMockStore = async (store) => {
  const problem1 = await fs.readFileSync('./problems/problem1.md', 'utf8')

  const mockProblems = [
    {
      id: 1,
      name: '이거 보여주려고 어그로 끌었다',
      difficulty: '최강 난이도',
      ac: 10,
      wa: 100,
      markdown: problem1,
    },
    {
      id: 2,
      name: 'ICPC World Final',
      difficulty: '최강 난이도',
      ac: 10,
      wa: 1000,
      markdown: problem1,
    },
  ]

  const mockContests = [
    {
      id: 1,
      name: '2029 ICPC World Final',
      first: 'Taste Why Frame',
      second: '인공지능',
      start: new Date(Date.UTC(2029, 7, 1)),
      end: new Date(Date.UTC(2029, 7, 2)),
      status: '종료',
    },
    {
      id: 2,
      name: '2131 우리은하 대학생 프로그래밍 경진대회',
      first: 'Taste Why Frame',
      second: '인공지능',
      start: new Date(Date.UTC(2131, 7, 1)),
      end: new Date(Date.UTC(2131, 7, 2)),
      status: '종료',
    },
  ]

  await store.Problems.destroy({
    where: {},
    truncate: true,
  })
  await store.Contests.destroy({
    where: {},
    truncate: true,
  })

  for (let i = 0; i < mockProblems.length; i++)
    await store.Problems.create(mockProblems[i])

  for (let i = 0; i < mockContests.length; i++)
    await store.Contests.create(mockContests[i])
}

module.exports = {
  createMockStore,
}
