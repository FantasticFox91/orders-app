let { orders } = require('../data.js')

// Функция для генерации уникального айди, можно заменить на библиотеку при необходимости
const generateUniqueID = (existingIDs) => {
  const lastOrderNumber = Math.max(...existingIDs);
  return isFinite(lastOrderNumber) ? lastOrderNumber + 1 : 1;
};

const getOrders = (req, res) => {
  res.status(200).json({ success: true, data: orders })
}

const updateOrder = (req, res) => {
  const { id } = req.body

  const order = orders.find((order) => String(order.id) === String(id))

  if (!order) {
    return res.status(404).json({ success: false, msg: `Нет заказа с id ${id}` })
  }

  const newOrders = orders.map((order) => {
    if (String(order.id) === String(id)) {
      order.status = 'Выполнен'
    }
    return order
  })

  res.status(200).json({ success: true, data: newOrders })
}

const deleteOrder = (req, res) => {
  const order = orders.find((order) => String(order.id) === String(req.params.id))

  if (!order) {
    return res.status(404).json({ success: false, msg: `Нет заказа с id ${req.params.id}` })
  }

  orders = orders.filter((order) => String(order.id) !== String(req.params.id))

  res.status(200).json({ success: true, data: orders })
}

const addOrder = (req, res) => {
  const { userName, address, comment } = req.body;

  const newOrder = {
    id: generateUniqueID(orders.map(order => order.id)),
    name: userName,
    address,
    comment,
    date: new Date(),
    status: 'Новый'
  };

  orders.push(newOrder);

  res.status(201).send({ success: true, data: orders });
};

module.exports = { getOrders, updateOrder, deleteOrder, addOrder }
