const users = [
  {
    user: 'admin',
    password: '123456789',
    name: 'Иван Иванов',
    role: 'ADMIN'
  },
  {
    user: 'user',
    password: '123456789',
    name: 'Петр Петров',
    role: 'USER'
  }
]

const orders = [
  {
    id: 123,
    name: 'Иван Иванов',
    address: 'Самара, проспект Ленина, 26-25',
    date: '05 февраля 2022',
    status: 'Выполнен',
    comment: 'доставить до 18:00'
  },
  {
    id: 456,
    name: 'Петр Петров',
    address: 'Москва, проспект Московский, д.100 кв.1',
    date: '11 июля 2022',
    status: 'Выполнен',
    comment: 'нет домофона'
  },
  {
    id: 789,
    name: 'Степан Степанов',
    address: 'Екатеринбург, улица Челюскинцев, 222',
    date: '11 июля 2022',
    status: 'Выполнен',
    comment: 'нет домофона'
  },
  {
    id: 783,
    name: 'Степан Степанов',
    address: 'Екатеринбург, улица Челюскинцев, 222',
    date: '11 июля 2023',
    status: 'Новый',
    comment: 'нет домофона'
  }
]

module.exports = { users, orders }
