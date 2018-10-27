let users = {
  1: {
    id: '1',
    username: 'Sherman Chen',
    messageIds: [1]
  },
  2: {
    id: '2',
    username: 'Robin Wieruch',
    messageIds: [2]
  }
};

let messages = {
  1: {
    id: '1',
    text: 'Hello World',
    userId: '1'
  },
  2: {
    id: '2',
    text: 'Bye World',
    userId: '1'
  }
};

module.exports = {
  users,
  messages
};
