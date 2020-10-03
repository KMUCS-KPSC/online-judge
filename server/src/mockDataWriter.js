const createMockStore = async (store) => {
  const mockProblems = [
      {
          id: 1,
          name: '이거 보여주려고 어그로 끌었다',
          difficulty: '최강 난이도',
          ac: 10,
          wa: 100,
      },
      {
          id: 2,
          name: 'ICPC World Final',
          difficulty: '최강 난이도',
          ac: 10,
          wa: 1000,
      },
  ];

  await store.Problems.destroy({
      where: {},
      truncate: true
  });

  for(let i = 0; i < mockProblems.length; i++)
      await store.Problems.create(mockProblems[i]);
};

module.exports = {
  createMockStore,
};